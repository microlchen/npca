export enum UserType {
  Patient = 'Patient',
  Provider = 'Provider'
}

export type LoginState = {
  user_type: UserType;
  email: string;
  password: string;
};
