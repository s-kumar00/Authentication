import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { signOut } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateUserSuccess,
  updateUserFailure,
  deleteUserSuccess,
  deleteUserFailure,
} from "../redux/userSlice";
import {
  deleteUserAccountROute,
  updatePasswordRoute,
  updateUserAccountRoute,
} from "../Api/userApi";
import { toastOptions } from "../utils/utility";
import { toast } from "react-toastify";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const EditUserProfile = () => {
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      async (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      async () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUSerUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUserAccountRoute(
        currentUser.user._id,
        formData
      );
      if (response.data.alert) {
        dispatch(updateUserSuccess(response.data));
        navigate("/");
        toast.success(response.data.message, toastOptions);
      } else {
        dispatch(updateUserFailure(response.data));
        toast.error(response.data.message, toastOptions);
      }
    } catch (error) {
      toast.error(error.message, toastOptions);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    const oldPassword = e.target.current_password.value;
    const newPassword = e.target.new_Password.value;
    const confirmNewPassword = e.target.confirm_Password.value;

    if (newPassword !== confirmNewPassword) {
      return toast.error("Password does not match", toastOptions);
    }

    try {
      const response = await updatePasswordRoute(currentUser.user._id, {
        oldPassword,
        newPassword,
      });
      if (response.data.alert) {
        handleSignOut();
        toast.success(response.data.message, toastOptions);
      } else {
        toast.error(response.data.message, toastOptions);
      }
    } catch (error) {
      toast.error(error.message, toastOptions);
    }
  };

  const handleSignOut = () => {
    dispatch(signOut());
    navigate("/login");
  };

  const handleDelete = async () => {
    try {
      const response = await deleteUserAccountROute(currentUser.user._id);
      if (response.data.alert) {
        dispatch(deleteUserSuccess());
        navigate("/");
        toast.success("Account deleted...", toastOptions);
      } else {
        dispatch(deleteUserFailure());
        toast.success(response.data.message, toastOptions);
      }
    } catch (error) {
      dispatch(deleteUserFailure());
      toast.error(error.message, toastOptions);
    }
  };

  return (
    <section className="absolute min-h-screen w-full p-12  dark:bg-gray-90 dark:text-white">
      <div className="max_pad_container relative top-10 xs:top-30 w-full sm:w-3/4 border border-gray-10 dark:border-gray-50 p-2">
        <div className="flex-col">
          {/* form-1 */}
          <div className="flex flex-col items-center sm:flex-row">
            <div className="flex-col mb-3 sm:mb-0">
              <h1 className="font-bold text-2xl">Personal Information</h1>
              <h2 className="text-gray-30 text-sm">
                Update avatar & name associated with your account.
              </h2>
            </div>
            <form onSubmit={handleUSerUpdate} className="max-w-lg mx-auto">
              <div className="flex items-center gap-x-3">
                <div className="flex-col">
                  <img
                    src={
                      currentUser === null
                        ? ""
                        : formData.profilePicture ||
                          currentUser.user.profilePicture
                    }
                    className="h-20 w-20 rounded"
                  />
                  <p className="text-sm">
                    {imageError ? (
                      <span className="text-red-700">
                        Error uploading image (file size must be less than 2 MB)
                      </span>
                    ) : imagePercent > 0 && imagePercent < 100 ? (
                      <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
                    ) : imagePercent === 100 ? (
                      <span className="text-green-700">
                        uploaded successfully
                      </span>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
                <div>
                  <input
                    className="block w-3/4 sm:w-full text-md text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="user_avatar_help"
                    id="user_avatar"
                    accept="image/*"
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  <p className="pt-1">JPG, GIF or PNG. 1MB max.</p>
                </div>
              </div>

              <input
                type="text"
                id="name"
                placeholder="First Name"
                defaultValue={currentUser === null ? "" : currentUser.user.name}
                onChange={handleChange}
                className="w-full mt-5 p-2 border text-black border-gray-300 rounded"
              />

              <input
                type="text"
                id="email"
                placeholder={currentUser === null ? "" : currentUser.user.email}
                className="w-full mt-5 p-2 border border-gray-300 rounded"
                disabled
              />
              <button
                type="submit"
                className="w-1/4 h-10 bg-blue-600 mt-2 rounded-md"
              >
                Update
              </button>
            </form>
          </div>

          <div className="border border-gray-20 mt-5 dark:border-gray-50"></div>

          {/* form-2 */}
          <div className="flex flex-col items-center sm:flex-row">
            <div>
              <h1 className="font-bold text-2xl">Change password</h1>
              <h2 className="text-gray-30 text-sm">
                Update your password associated with your account.
              </h2>
            </div>
            <form onSubmit={handlePasswordUpdate} className="max-w-lg mx-auto">
              <input
                type="text"
                id="current_password"
                placeholder="Current Password"
                required
                className="w-full mt-5 p-2 border text-black border-gray-300 rounded"
              />
              <input
                type="text"
                id="new_Password"
                placeholder="New Password"
                required
                className="w-full mt-5 p-2 border text-black border-gray-300 rounded"
              />
              <input
                type="text"
                id="confirm_Password"
                placeholder="ConfirmPassword"
                required
                className="w-full mt-5 p-2 text-black border border-gray-300 rounded"
              />

              <button
                type="submit"
                className="w-1/4 h-10 bg-blue-600 mt-2 rounded-md"
              >
                Update
              </button>
            </form>
          </div>

          <div className="border border-gray-20 mt-5 mb-5 dark:border-gray-50"></div>

          <div className="flex justify-between items-center font-bold">
            <button
              onClick={handleSignOut}
              className="bg-blue-600 p-2 rounded-lg"
            >
              Logout
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 p-2 rounded-lg"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditUserProfile;
