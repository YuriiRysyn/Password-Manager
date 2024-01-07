import { RequestStatusEnum } from '../redux/constants';

export interface IUser {
  userName: string | null;
  id: string | null;
  isAuth: boolean;
}

export interface IExtendedUser extends IUser {
  error?: string;
  signUpRequestStatus?: RequestStatusEnum;
  signInRequestStatus?: RequestStatusEnum;
  status?: string;
}

export interface ISignInUserData {
  userName: string;
  password: string;
  remember: boolean;
}

export interface ISignUpUserData extends ISignInUserData {
  confirmedPassword: string;
}
