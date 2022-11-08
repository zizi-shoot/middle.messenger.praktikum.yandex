type FirstName = string;
type SecondName = string;
type DisplayName = string;
type Login = string;
type EmailAddress = string;
type Password = string;
type PhoneNumber = string;

export type SignInForm = {
  login: Login,
  password: Password,
};

export type SignUpForm = {
  login: Login,
  first_name: FirstName,
  second_name: SecondName,
  email: EmailAddress,
  phone: PhoneNumber,
  password: Password,
  password_check: Password,
};

export type ProfileDataForm = Omit<SignUpForm, 'password_check'> & {
  display_name: DisplayName,
};

export type ProfilePasswordForm = {
  oldPassword: Password,
  newPassword: Password,
  checkNewPassword: Password,
};
