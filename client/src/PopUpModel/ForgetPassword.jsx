import React, { useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { RiAccountCircleLine } from "react-icons/ri";
import { MdLockReset } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { IoKeyOutline } from "react-icons/io5";
import { FiExternalLink } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  emailRoute,
  otpVerifyRoute,
  changePasswordRoute,
} from "../Api/authApi";
import { toastOptions } from "../utils/utility";

const ForgetPassword = () => {
  const [step, setStep] = useState(1);
  const [otpValue, setOtpValue] = useState("");
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();

  const handleOtpChange = (index, value) => {
    let newOtpValue = otpValue;
    newOtpValue =
      newOtpValue.substring(0, index) +
      value +
      newOtpValue.substring(index + 1);
    setOtpValue(newOtpValue);
  };

  const handleEmail = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    try {
      toast.warning("OTP is in the way", toastOptions);
      const response = await emailRoute({ email });
      if (response.data.alert) {
        setStep(step + 1);
        setEmail(email);
        toast.success(response.data.message, toastOptions);
      } else {
        toast.error(response.data.message, toastOptions);
      }
    } catch (error) {
      toast.error(error.message, toastOptions);
    }
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await otpVerifyRoute({ email, otpValue });
      if (response.data.alert) {
        setStep(step + 1);
        toast.success(response.data.message, toastOptions);
      } else {
        toast.error(response.data.message, toastOptions);
      }
    } catch (err) {
      toast.error(err.message, toastOptions);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const form = e.target;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    if (password != confirmPassword) {
      toast.error("Password not match", toastOptions);
    }
    try {
      const response = await changePasswordRoute({ email, password });
      if (response.data.alert) {
        toast.success(response.data.message, toastOptions);
        navigate("/login");
      } else {
        toast.error(response.data.message, toastOptions);
      }
    } catch (error) {
      toast.error(error.message, toastOptions);
    }
  };

  const handleResendOtp = async (e) => {
    e.preventDefault();
    try {
      toast.warning("OTP is in the way", toastOptions);
      const response = await emailRoute({ email });
      if (response.data.alert) {
        toast.success("OTP resent successfully", toastOptions);
      } else {
        toast.error(response.data.message, toastOptions);
      }
    } catch (error) {
      toast.error(error.message, toastOptions);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      handleEmail(e);
    } else if (step === 2) {
      handleOtpVerify(e);
    } else {
      handleChangePassword(e);
    }
  };

  return (
    <section className="relative h-screen w-full dark:bg-gray-90">
      <div className="max_pad_container relative xs:top-48 ">
        <div className="border border-gray-100 shadow-sm p-8 dark:border-gray-90 dark:shadow-gray-800">
          <div className="flex flex-wrap gap-20">
            <div className="w-full sm:w-1/3">
              <div className="flex sm:flex-col sm:gap-y-10 -mt-10 sm:m-auto">
                <div
                  className={`w-full text-center px-6 ${
                    step > 1 ? "text-green-500" : "text-black"
                  }`}
                >
                  <div className="bg-gray-300 rounded-lg flex items-center justify-center border border-gray-200">
                    <div className="w-full bg-transparent h-10 flex items-center justify-center icon-step sm:w-1/3 sm:h-20">
                      {step > 1 ? (
                        <FaCheck className="text-3xl" />
                      ) : (
                        <MdOutlineMail className="text-3xl text-black" />
                      )}
                    </div>
                    <div className="w-2/3 bg-gray-200 h-24 flex-col items-center justify-center px-1 rounded-r-lg body-step hidden sm:flex">
                      <h2 className="font-bold text-sm">Email Verification</h2>
                      <p className="text-xs text-gray-600">
                        Fill the form to get OTP
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className={`w-full text-center px-6 ${
                    step > 2 && "text-green-500"
                  }`}
                >
                  <div className="bg-gray-300 rounded-lg flex items-center justify-center border border-gray-200">
                    <div className="w-full bg-transparent h-10 flex items-center justify-center icon-step sm:w-1/3 sm:h-20">
                      {step > 2 ? (
                        <FaCheck className="text-3xl" />
                      ) : (
                        <RiAccountCircleLine className="text-3xl text-black" />
                      )}
                    </div>
                    <div className="w-2/3 bg-gray-200 h-24 flex-col items-center justify-center px-1 rounded-r-lg body-step hidden sm:flex">
                      <h2 className="font-bold text-sm">Verify OTP</h2>
                      <p className="text-xs text-gray-600">
                        {`Input the OTP sent to your email `}
                        {email === null ? (
                          ""
                        ) : (
                          <>
                            <br />
                            {email}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className={`w-full text-center px-6 ${
                    step > 3 && "text-green-500"
                  }`}
                >
                  <div className="bg-gray-300 rounded-lg flex items-center justify-center border border-gray-200 ">
                    <div className="w-full bg-transparent h-10 flex items-center justify-center icon-step sm:w-1/3 sm:h-20">
                      {step > 3 ? (
                        <FaCheck className="text-3xl" />
                      ) : (
                        <MdLockReset className="text-3xl text-black" />
                      )}
                    </div>
                    <div className="w-2/3 bg-gray-200 h-24 flex-col items-center justify-center px-1 rounded-r-lg body-step hidden sm:flex">
                      <h2 className="font-bold text-sm">Reset The Password</h2>
                      <p className="text-xs text-gray-600">Finish it!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full items-center sm:p-5 sm:w-1/3 sm:mt-10 sm:ml-20">
              <form onSubmit={handleSubmit} className="my-5">
                <div className="flex flex-col space-y-5">
                  {step === 1 && (
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="font-normal rounded-md p-2 w-full border border-gray-300 focus:ring dark:text-gray-90"
                      placeholder="Enter email address"
                    />
                  )}
                  {step === 2 && (
                    <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                      {/* Customize the input fields */}
                      {[1, 2, 3, 4].map((index) => (
                        <div key={index} className="w-16 h-16">
                          <input
                            className="w-full h-full text-center px-5 outline-none rounded-xl border border-gray-200 text-lg font-bold text-gray-90 ring-blue-700
                       focus:bg-gray-50 focus:text-gray-10 focus:ring-1
                        dark:bg-gray-50 dark:focus:bg-gray-10 dark:text-gray-10 dark:focus:text-gray-50"
                            type="text"
                            name={`digit-${index}`}
                            id={`digit-${index}`}
                            maxLength={1}
                            value={otpValue[index - 1] || ""}
                            onChange={(e) =>
                              handleOtpChange(index - 1, e.target.value)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  {step >= 3 && (
                    <div>
                      <div className="mb-4">
                        <input
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Password"
                          className="font-normal rounded-md p-2 w-full border border-gray-300 focus:ring dark:text-gray-90"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="confirmPassword"
                          name="confirmPassword"
                          id="confirmPassword"
                          placeholder="Retype password"
                          className="font-normal rounded-md p-2 w-full border border-gray-300 focus:ring dark:text-gray-90"
                          required
                        />
                      </div>
                    </div>
                  )}
                  <button
                    type="submit"
                    className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
                  >
                    <IoKeyOutline className="font-bold text-2xl" />
                    {step === 1 && <span>Send OTP</span>}
                    {step === 2 && <span>Verify OTP</span>}
                    {step === 3 && <span>Change Password</span>}
                  </button>
                  {step === 1 && (
                    <p className="text-center text-gray-90 dark:text-gray-10">
                      Not registered yet?{" "}
                      <Link
                        to="/login"
                        className="text-indigo-400 font-medium inline-flex space-x-1 items-center dark:text-indigo-600"
                      >
                        <span>Register now </span>
                        <FiExternalLink />
                      </Link>
                    </p>
                  )}

                  {step === 2 && (
                    <p className="text-center text-gray-90 dark:text-gray-10">
                      OTP not found?{" "}
                      <Link
                        onClick={handleResendOtp}
                        className="text-indigo-400 font-medium inline-flex space-x-1 items-center dark:text-indigo-600"
                      >
                        <span>Resend otp </span>
                        <FiExternalLink />
                      </Link>
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;
