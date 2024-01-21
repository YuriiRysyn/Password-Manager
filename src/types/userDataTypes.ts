import { RequestStatusEnum } from './enums';

export interface IUser {
  userName: string | null;
  id: string | null;
}

export interface IExtendedUser {
  userData: IUser;
  isAuth: boolean;
  error?: string | null;
  signXStatus: RequestStatusEnum;
  status: string | null;
}

export interface IUserDataFromServer extends IUser {
  status?: string | null;
}

export interface ISignInUserData {
  userName: string;
  password: string;
  remember: boolean;
}

export interface ISignUpUserData extends ISignInUserData {
  confirmedPassword: string;
}
