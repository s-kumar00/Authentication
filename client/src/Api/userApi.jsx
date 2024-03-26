import axiosInstance from "./axiosInstance";

export const deleteUserAccountROute = (user) => {
  return axiosInstance.delete(`/api/user/delete/${user}`);
};


export const updateUserAccountRoute = (user, data) => {
  // console.log(data)
  return axiosInstance.post(`/api/user/update/${user}`, data);
}

export const updatePasswordRoute = (user, data) => {
  return axiosInstance.post(`/api/user/updatePassword/${user}`, data);
}
