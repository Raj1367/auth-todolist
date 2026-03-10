// import { create } from "zustand";
// import { createJSONStorage, persist } from "zustand/middleware";
// import axios from "axios";
// import backendApi from "../Common/BackendApi";

// axios.defaults.withCredentials = true;

// type UserState = {
//     user: any;
//     isAuthenticated: boolean;
//     isCheckingAuth: boolean;
//     loading: boolean;
//     signup: (input:any) => Promise<void>;
//     login: (input:any) => Promise<void>;
//     checkAuthentication: () => Promise<void>;
//     logout: () => Promise<void>;
// }


// export const useUserStore = create<UserState>()(persist((set) => ({
//     user: null,
//     isAuthenticated: false,
//     isCheckingAuth: true,
//     loading: false,
//     // signup api implementation

//     signup: async (input:any) => {

//         try {
//             set({ loading: true });
//             const response = await axios.post(
//                 backendApi.signUp.url,
//                 input, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });
//             if (response.data.success) {
//                 alert(response.data.message);
//                 set({ loading: false, user: response.data.user, isAuthenticated: false });
//             }
//         } catch (error: any) {
//             alert(error.response.data.message);
//             set({ loading: false });
//         }
//     },

//     login: async (input:any) => {
//         try {
//             set({ loading: true });
//             const response = await axios.post(backendApi.login.url,
//                 input,
//                 {
//                     headers: {
//                         'Content-Type': 'application/json'
//                     }
//                 });
//             if (response.data.success) {
//                alert(response.data.message);
//                 set({ loading: false, user: response.data.user, isAuthenticated: true });
//             }
//         } catch (error: any) {
//             alert(error.response.data.message);
//             set({ loading: false });
//         }
//     },
    
//     checkAuthentication: async () => {
//         try {
//             set({ isCheckingAuth: true });
//             const response = await axios.get(backendApi.checkAuth.url);
//             if (response.data.success) {
//                 set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
//             }
//         } catch (error) {
//             set({ isAuthenticated: false, isCheckingAuth: false });
//         }
//     },

//     logout: async () => {
//         try {
//             set({ loading: true });
//             const response = await axios.get(backendApi.logout.url);
//             if (response.data.success) {
//                 set({ loading: false, user: null, isAuthenticated: false })
//             }
//         } catch (error: any) {
//             set({ loading: false });
//         }
//     },
     
// }),
//     {
//         name: 'user-name',
//         storage: createJSONStorage(() => localStorage),
//     }
// ))


import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios, { AxiosError } from "axios";
import backendApi from "../Common/BackendApi";

axios.defaults.withCredentials = true;

type User = {
  _id: string;
  name: string;
  username: string;
  password: string;
  role: string;
};

type AuthInput = {
  email: string;
  password: string;
  name?: string;
};

type ApiResponse = {
  success: boolean;
  message: string;
  user: User;
};

type UserState = {
  user: User | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  loading: boolean;
  signup: (input: AuthInput) => Promise<void>;
  login: (input: AuthInput) => Promise<void>;
  checkAuthentication: () => Promise<void>;
  logout: () => Promise<void>;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isCheckingAuth: true,
      loading: false,

      signup: async (input) => {
        try {
          set({ loading: true });

          const response = await axios.post<ApiResponse>(
            backendApi.signUp.url,
            input,
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          if (response.data.success) {
            alert(response.data.message);
            set({
              loading: false,
              user: response.data.user,
              isAuthenticated: false,
            });
          }
        } catch (err) {
          const error = err as AxiosError<{ message: string }>;
          alert(error.response?.data?.message || "Signup failed");
          set({ loading: false });
        }
      },

      login: async (input) => {
        try {
          set({ loading: true });

          const response = await axios.post<ApiResponse>(
            backendApi.login.url,
            input,
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          if (response.data.success) {
            alert(response.data.message);
            set({
              loading: false,
              user: response.data.user,
              isAuthenticated: true,
            });
          }
        } catch (err) {
          const error = err as AxiosError<{ message: string }>;
          alert(error.response?.data?.message || "Login failed");
          set({ loading: false });
        }
      },

      checkAuthentication: async () => {
        try {
          set({ isCheckingAuth: true });

          const response = await axios.get<ApiResponse>(
            backendApi.checkAuth.url
          );

          if (response.data.success) {
            set({
              user: response.data.user,
              isAuthenticated: true,
              isCheckingAuth: false,
            });
          }
        } catch {
          set({
            isAuthenticated: false,
            isCheckingAuth: false,
          });
        }
      },

      logout: async () => {
        try {
          set({ loading: true });

          const response = await axios.get<{ success: boolean }>(
            backendApi.logout.url
          );

          if (response.data.success) {
            set({
              loading: false,
              user: null,
              isAuthenticated: false,
            });
          }
        } catch {
          set({ loading: false });
        }
      },
    }),
    {
      name: "user-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);