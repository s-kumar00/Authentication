import axiosInstance from "./axiosInstance";

export const registerRoute = (user) => {
  return axiosInstance.post("/api/auth/register", user);
};

export const loginRoute = (user) => {
  return axiosInstance.post("/api/auth/login", user);
};

export const OAuthRoute = (user) => {
  return axiosInstance.post("/api/auth/google", user);
}

export const emailRoute = (user) => {
  return axiosInstance.post("/api/auth/emailVerification", user);
}

export const otpVerifyRoute = (user) => {
  return axiosInstance.post("/api/auth/otpVerification", user);
}

export const changePasswordRoute = (user) => {
  return axiosInstance.post("/api/auth/changePassword", user);
}
