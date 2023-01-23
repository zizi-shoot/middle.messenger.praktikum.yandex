import { all, ValidationRule } from '../services/validation';
import { contains, inRange, notEmpty, notEmptyFile } from './utils';
import {
  EMAIL_PATTERN,
  LOGIN_PATTERN,
  MAX_CHAT_TITLE_LENGTH,
  MAX_LOGIN_LENGTH,
  MAX_NAME_LENGTH,
  MAX_PASSWORD_LENGTH,
  MAX_PHONE_LENGTH,
  MIN_CHAT_TITLE_LENGTH,
  MIN_LOGIN_LENGTH,
  MIN_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_PHONE_LENGTH,
  NAME_PATTERN,
  PASSWORD_PATTERN,
  PHONE_PATTERN,
} from './const';
import type {
  AvatarData,
  ChatUserData, NewChatData,
  ProfileData,
  ProfilePasswordData,
  SignInData,
  SignUpData,
} from '../../../types/forms';

type Rule<FormType> = ValidationRule<FormType>;
type CommonData = ProfileData | SignUpData;

// Правила для проверки логина
const isValidLoginLength: Rule<CommonData | SignInData | ChatUserData> = ({ login }) => inRange(
  login.length,
  MIN_LOGIN_LENGTH,
  MAX_LOGIN_LENGTH,
);
const hasAtLeastOneLetter: Rule<CommonData | SignInData | ChatUserData> = ({ login }) => contains(login, /[a-z]/i);
const isValidLogin: Rule<CommonData | SignInData | ChatUserData> = ({ login }) => contains(login, LOGIN_PATTERN);

// Правила для проверки пароля
const isValidPasswordLength: Rule<CommonData | SignInData> = ({ password }) => inRange(
  password.length,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
);
const hasAtLeastOneCapitalLetter: Rule<CommonData | SignInData> = ({ password }) => contains(password, /[A-Z]/);
const hasAtLeastOneDigit: Rule<CommonData | SignInData> = ({ password }) => contains(password, /\d/);
const isValidPassword: Rule<CommonData | SignInData> = ({ password }) => contains(password, PASSWORD_PATTERN);

// Правила для проверки повторного пароля
const isValidCheckPassword: Rule<SignUpData> = ({ password, password_check }) => password === password_check;

// Правила для проверки имени, фамилии и отображаемого имени
const isValidFirstNameLength: Rule<CommonData> = ({ first_name }) => inRange(
  first_name.length,
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
);
const isValidFirstName: Rule<CommonData> = ({ first_name }) => contains(first_name, NAME_PATTERN);
const isValidSecondNameLength: Rule<CommonData> = ({ second_name }) => inRange(
  second_name.length,
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
);
const isValidSecondName: Rule<CommonData> = ({ second_name }) => contains(second_name, NAME_PATTERN);
const isValidDisplayNameLength: Rule<ProfileData> = ({ display_name }) => inRange(
  display_name.length,
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
);
const isValidDisplayName: Rule<ProfileData> = ({ display_name }) => contains(display_name, /[a-zа-я_]/i);

// Правила для проверки email
const isValidEmail: Rule<CommonData> = ({ email }) => contains(email, EMAIL_PATTERN);

// Правила для проверки телефона
const isValidPhoneLength: Rule<CommonData> = ({ phone }) => inRange(phone.length, MIN_PHONE_LENGTH, MAX_PHONE_LENGTH);
const isValidPhone: Rule<CommonData> = ({ phone }) => contains(phone, PHONE_PATTERN);

// Правила для проверки нового пароля
const isValidNewPasswordLength: Rule<ProfilePasswordData> = ({ newPassword }) => inRange(
  newPassword.length,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
);
const newPasswordHasAtLeastOneCapitalLetter: Rule<ProfilePasswordData> = ({ newPassword }) => contains(newPassword, /[A-Z]/);
const newPasswordHasAtLeastOneDigit: Rule<ProfilePasswordData> = ({ newPassword }) => contains(newPassword, /\d/);
const isValidNewPassword: Rule<ProfilePasswordData> = ({ newPassword }) => contains(newPassword, PASSWORD_PATTERN);

// Правила для проверки повторного нового пароля
const isValidCheckNewPassword: Rule<ProfilePasswordData> = ({
  newPassword,
  checkNewPassword,
}) => newPassword === checkNewPassword;

// Правила для проверки аватара
const notEmptyAvatar: Rule<AvatarData> = ({ avatar }) => notEmptyFile(avatar);

// Правила для проверки названия нового чата
const isValidNewChatTitleLength: Rule<NewChatData> = ({ title }) => inRange(
  title.length,
  MIN_CHAT_TITLE_LENGTH,
  MAX_CHAT_TITLE_LENGTH,
);

// сбор правил в комбинации
const loginRules = [
  notEmpty,
  isValidLoginLength,
  hasAtLeastOneLetter,
  isValidLogin,
];
const passwordRules = [
  notEmpty,
  isValidPasswordLength,
  hasAtLeastOneCapitalLetter,
  hasAtLeastOneDigit,
  isValidPassword,
];

const checkPasswordRules = [
  isValidCheckPassword,
];

const firstNameRules = [
  notEmpty,
  isValidFirstNameLength,
  isValidFirstName,
];

const secondNameRules = [
  notEmpty,
  isValidSecondNameLength,
  isValidSecondName,
];

const displayNameRules = [
  notEmpty,
  isValidDisplayNameLength,
  isValidDisplayName,
];

const emailRules = [
  notEmpty,
  isValidEmail,
];

const phoneRules = [
  notEmpty,
  isValidPhoneLength,
  isValidPhone,
];

const oldPasswordRules = [
  notEmpty,
];

const newPasswordRules = [
  notEmpty,
  isValidNewPasswordLength,
  newPasswordHasAtLeastOneCapitalLetter,
  newPasswordHasAtLeastOneDigit,
  isValidNewPassword,
];

const checkNewPasswordRules = [
  isValidCheckNewPassword,
];

const avatarUploadRules = [
  notEmptyAvatar,
];

const newChatRules = [
  isValidNewChatTitleLength,
];

const chatUserRules = [
  notEmpty,
  isValidLoginLength,
  hasAtLeastOneLetter,
  isValidLogin,
];

export const validateLogin = all(loginRules);
export const validatePassword = all(passwordRules);
export const validateCheckPassword = all(checkPasswordRules);
export const validateFirstName = all(firstNameRules);
export const validateSecondName = all(secondNameRules);
export const validateDisplayName = all(displayNameRules);
export const validateEmail = all(emailRules);
export const validatePhone = all(phoneRules);
export const validateOldPassword = all(oldPasswordRules);
export const validateNewPassword = all(newPasswordRules);
export const validateCheckNewPassword = all(checkNewPasswordRules);
export const validateAvatar = all(avatarUploadRules);
export const validateNewChat = all(newChatRules);
export const validateChatUser = all(chatUserRules);
