import apiClient from "./apiClient";

export interface AuthDto {
  id: string;
  password: string;
}

export enum Authority {
  USER = "USER",
  MASTER = "MASTER",
}

interface AuthApi {
  signIn(reqDto: AuthDto): Promise<string>;
  getToken(): Promise<string>;
  signOut(userId?: string): Promise<void>;
}

class AuthServerApi implements AuthApi {
  async signIn(reqDto: AuthDto): Promise<string> {
    const resp = await apiClient.post(`/auth/sign-in`, reqDto);
    return resp.data;
  }

  async getToken(): Promise<string> {
    const resp = await apiClient.post(`/auth/token`);
    return resp.data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async signOut(userId?: string | undefined): Promise<void> {
    return Promise.resolve();
  }
}

const authApi = new AuthServerApi();
export default authApi;
