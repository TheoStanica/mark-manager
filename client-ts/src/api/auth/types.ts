export interface ILoginMutation {
  email: string;
  password: string;
}

export interface ILoginMutationResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IRegisterMutation {
  email: string;
  password: string;
}

export interface IResetPassword {
  email: string;
}

export interface IResendActivation {
  email: string;
}
