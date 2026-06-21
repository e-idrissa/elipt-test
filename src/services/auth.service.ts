import { api } from "@/lib/axios";

export const authService = {
  // 1. Register User
  signUp: async (data: { fname: string; lname: string; email: string }) => {
    const response = await api.post("/AppUsers/Signup", data);
    return response.data;
  },

  // 2. OTP Verification (payload needs token key)
  verifyOtp: async (data: { email: string; token: string }) => {
    const response = await api.post("/AppUsers/ActiveAccount/verifyCode", data);
    return response.data;
  },

  // 3. Avatar image upload (Returns Cloudinary URL)
  uploadAvatar: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post("/AppUsers/UploadImage", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.secure_url || response.data.url;
  },

  // 4. Account Config
  configAccount: async (data: { email: string; password: string; imageCover: string }) => {
    const response = await api.put("/AppUsers/ActiveAccount/ConfigAccount", data);
    return response.data;
  },

  // 5. Signin
  signIn: async (data: { email: string; password: string }) => {
    const response = await api.post("/AppUsers/Login", data);
    return response.data;
  },
};