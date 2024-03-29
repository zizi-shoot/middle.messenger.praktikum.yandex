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

export type AvatarData = {
  avatar: File,
};

export type NewChatData = {
  title: ChatTitle,
};

export type ChatUserData = {
  login: Login,
};

export type MessageData = {
  message: MessageContent,
};
