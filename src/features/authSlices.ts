// import authApi, { AuthDto, Authority } from "api/authApi";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import {
//   getToken,
//   removeToken,
//   setToken,
// } from "utils/session/sessionStorageManager";

// import { RootState } from "app/_redux/store";
// import { StateStatus } from "./types";
// import { UserCoreDto } from "api/userApi";
// import consoleLog from "utils/console/console";
// import { jwtDecode } from "jwt-decode";

// interface AuthState {
//   coreAuth?: UserCoreDto | undefined;
//   loginStatus: StateStatus;
//   tokenStatus: StateStatus;
//   error?: string;
// }

// const initialState: AuthState = {
//   coreAuth: undefined,
//   loginStatus: StateStatus.IDLE,
//   tokenStatus: StateStatus.IDLE,
//   error: undefined,
// };

// const createAuthEntity = (token: string) => {
//   try {
//     const coreAuth = jwtDecode<UserCoreDto>(token);
//     // consoleLog({
//     //   type: 'success',
//     //   title: 'auth login',
//     //   text: 'api success',
//     //   object: [coreAuth],
//     // });
//     // console.log('[this AUTH]:', coreAuth);
//     return Promise.resolve({ jwt: token, ...coreAuth });
//   } catch (err) {
//     consoleLog({
//       type: "error",
//       title: "auth login",
//       text: "api failed",
//       object: [err],
//     });

//     return Promise.reject("error");
//   }
// };

// export const signIn = createAsyncThunk(
//   "auth/signIn",
//   async (signInRequest: AuthDto, thunkAPI) => {
//     try {
//       const jwt = await authApi.signIn(signInRequest);
//       if (jwt) return createAuthEntity(jwt);
//       else return thunkAPI.rejectWithValue("데이터를 불러오지 못했습니다.");
//     } catch (error) {
//       return thunkAPI.rejectWithValue("데이터를 불러오지 못했습니다.");
//     }
//   }
// );

// export const signInWithToken = createAsyncThunk<
//   UserCoreDto,
//   string,
//   { state: RootState }
// >("auth/signInWithToken", async (token, thunkAPI) => {
//   try {
//     const storageToken = getToken();
//     if (!storageToken) throw Error("[ERROR] token expired!");
//     const auth = thunkAPI.getState().auth?.coreAuth;
//     if (auth) {
//       const jwt = await authApi.getToken();
//       return createAuthEntity(jwt);
//     }
//     return createAuthEntity(token);
//   } catch (error) {
//     return thunkAPI.rejectWithValue("데이터를 불러오지 못했습니다.");
//   }
// });

// export const signOut = createAsyncThunk<void, void, { state: RootState }>(
//   "auth/signOut",
//   async (_, thunkApi) => {
//     try {
//       const { coreAuth } = thunkApi.getState().auth;
//       await authApi.signOut(coreAuth?.userId);
//     } catch (error) {
//       // console.error(error);
//       return thunkApi.rejectWithValue("로그아웃에 실패하였습니다.");
//     }
//   }
// );

// export const authSlices = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(signIn.pending, (state, action) => {
//         state.loginStatus = StateStatus.LOADING;
//       })
//       .addCase(signIn.fulfilled, (state, action) => {
//         state.loginStatus = StateStatus.SUCCESS;
//         const newJWT = action.payload?.jwt;
//         if (newJWT && action.payload) {
//           setToken(newJWT);
//           state.coreAuth = action.payload;
//         } else {
//           state.loginStatus = StateStatus.IDLE;
//           state.coreAuth = undefined;
//         }
//       })
//       .addCase(signIn.rejected, (state, { error }) => {
//         state.loginStatus = StateStatus.FAILED;
//         state.error = error.message;
//       });
//     builder
//       // 토큰 불러오는 중인지 여부를 저장하면, API가 두번 호출됨.
//       .addCase(signInWithToken.fulfilled, (state, action) => {
//         state.coreAuth = action.payload;
//         const newJWT = action.payload?.jwt;
//         if (newJWT && action.payload) {
//           setToken(newJWT);
//           state.coreAuth = action.payload;
//         } else {
//           state.tokenStatus = StateStatus.IDLE;
//           state.coreAuth = undefined;
//         }
//         state.tokenStatus = StateStatus.SUCCESS;
//       })
//       .addCase(signInWithToken.rejected, (state, action) => {
//         state.tokenStatus = StateStatus.IDLE;
//         removeToken();
//         state.coreAuth = undefined;
//       });
//     builder
//       .addCase(signOut.fulfilled, (state, action) => {
//         removeToken();
//         state.coreAuth = undefined;
//       })
//       .addCase(signOut.rejected, (state, action) => {
//         removeToken();
//         state.coreAuth = undefined;
//       });
//   },
// });

// export const selectCoreAuth = (state: RootState): UserCoreDto | undefined =>
//   state.auth?.coreAuth;

// export const selectAuthority = (state: RootState): Authority | undefined =>
//   state.auth?.coreAuth?.authority;

// export const selectCoreAuthLoginStatus = (state: RootState) =>
//   state.auth.loginStatus;
// export const selectCoreAuthTokenStatus = (state: RootState) =>
//   state.auth.tokenStatus;

// export const selectIsAuthenticated = (state: RootState): boolean =>
//   state.auth?.coreAuth !== undefined;

// export default authSlices.reducer;
