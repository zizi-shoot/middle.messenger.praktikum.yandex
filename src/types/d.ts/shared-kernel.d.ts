type FirstName = string;
type SecondName = string;
type DisplayName = string;
type Login = string;
type EmailAddress = string;
type Password = string;
type PhoneNumber = string;
type Avatar = string;
type UserID = string;
type ErrorText = string | null;
type Comparable = string | number;
type List<T> = T[];
type Indexed<T = any> = {
  [key in string]: T;
};
