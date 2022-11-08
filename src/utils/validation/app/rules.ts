import { all, ValidationRule } from '../services/validation';
import { ProfileDataForm, ProfilePasswordForm, SignInForm, SignUpForm } from './types';
import { contains, inRange, notEmpty } from './utils';
import {
  EMAIL_PATTERN,
  LOGIN_PATTERN,
  MAX_LOGIN_LENGTH,
  MAX_NAME_LENGTH,
  MAX_PASSWORD_LENGTH,
  MAX_PHONE_LENGTH,
  MIN_LOGIN_LENGTH,
  MIN_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_PHONE_LENGTH,
  PASSWORD_PATTERN,
  PHONE_PATTERN,
} from './const';

type Rule<FormType> = ValidationRule<FormType>;
type CommonData = ProfileDataForm | SignUpForm;

// Правила для проверки логина
const isValidLoginLength: Rule<CommonData | SignInForm> = ({ login }) => inRange(
  login.length,
  MIN_LOGIN_LENGTH,
  MAX_LOGIN_LENGTH,
);
const hasAtLeastOneLetter: Rule<CommonData | SignInForm> = ({ login }) => contains(login, /[a-z]/i);
const isValidLogin: Rule<CommonData | SignInForm> = ({ login }) => contains(login, LOGIN_PATTERN);

// Правила для проверки пароля
const isValidPasswordLength: Rule<CommonData | SignInForm> = ({ password }) => inRange(
  password.length,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
);
const hasAtLeastOneCapitalLetter: Rule<CommonData | SignInForm> = ({ password }) => contains(password, /[A-Z]/);
const hasAtLeastOneDigit: Rule<CommonData | SignInForm> = ({ password }) => contains(password, /\d/);
const isValidPassword: Rule<CommonData | SignInForm> = ({ password }) => contains(password, PASSWORD_PATTERN);

// Правила для проверки повторного пароля
const isValidCheckPassword: Rule<SignUpForm> = ({ password, password_check }) => password === password_check;

// Правила для проверки имени, фамилии и отображаемого имени
const isValidFirstNameLength: Rule<CommonData> = ({ first_name }) => inRange(
  first_name.length,
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
);
const isValidFirstName: Rule<CommonData> = ({ first_name }) => contains(first_name, /[a-zа-я]/i);
const isValidSecondNameLength: Rule<CommonData> = ({ second_name }) => inRange(
  second_name.length,
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
);
const isValidSecondName: Rule<CommonData> = ({ second_name }) => contains(second_name, /[a-zа-я]/i);
const isValidDisplayNameLength: Rule<ProfileDataForm> = ({ display_name }) => inRange(
  display_name.length,
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
);
const isValidDisplayName: Rule<ProfileDataForm> = ({ display_name }) => contains(display_name, /[a-zа-я]/i);

// Правила для проверки email
const isValidEmail: Rule<CommonData> = ({ email }) => contains(email, EMAIL_PATTERN);

// Правила для проверки телефона
const isValidPhoneLength: Rule<CommonData> = ({ phone }) => inRange(phone.length, MIN_PHONE_LENGTH, MAX_PHONE_LENGTH);
const isValidPhone: Rule<CommonData> = ({ phone }) => contains(phone, PHONE_PATTERN);

// Правила для проверки нового пароля
const isValidNewPasswordLength: Rule<ProfilePasswordForm> = ({ newPassword }) => inRange(
  newPassword.length,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
);
const newPasswordHasAtLeastOneCapitalLetter: Rule<ProfilePasswordForm> = ({ newPassword }) => contains(newPassword, /[A-Z]/);
const newPasswordHasAtLeastOneDigit: Rule<ProfilePasswordForm> = ({ newPassword }) => contains(newPassword, /\d/);
const isValidNewPassword: Rule<ProfilePasswordForm> = ({ newPassword }) => contains(newPassword, PASSWORD_PATTERN);

// Правила для проверки повторного нового пароля
const isValidCheckNewPassword: Rule<ProfilePasswordForm> = ({
  newPassword,
  checkNewPassword,
}) => newPassword === checkNewPassword;

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
