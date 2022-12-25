export type SignInData = {
  login: Login,
  password: Password,
};

export type SignUpData = {
  login: Login,
  first_name: FirstName,
  second_name: SecondName,
  email: EmailAddress,
  phone: PhoneNumber,
  password: Password,
  password_check: Password,
};

export type ProfileData = Omit<SignUpData, 'password_check'> & {
  display_name: DisplayName,
};

export type ProfilePasswordData = {
  oldPassword: Password,
  newPassword: Password,
  checkNewPassword: Password,
};
