type FirstName = string;
type SecondName = string;
type DisplayName = string;
type Login = string;
type EmailAddress = string;
type Password = string;
type PhoneNumber = string;
type AvatarType = string;
type UserID = number;
type UserRole = string;

type ChatID = number;
type ChatTitle = string;
type ChatTime = string;
type ChatContent = string;
type ChatToken = string;

type MessageID = string;
type MessageContent = string;
type MessageTime = string;
type MessageType = 'message' | 'messages';

type ErrorText = string | null;
type Comparable = string | number;
type List<T> = T[];
type Indexed<T = any> = {
  [key in string]: T;
};
