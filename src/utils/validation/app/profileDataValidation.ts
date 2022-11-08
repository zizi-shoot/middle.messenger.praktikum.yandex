import { createValidator } from '../services/validation';
import type { ErrorMessages, ValidationRules } from '../services/validation';
import type { ProfileDataForm, ProfilePasswordForm } from './types';
import {
  MAX_LOGIN_LENGTH,
  MAX_PASSWORD_LENGTH,
  MAX_PHONE_LENGTH,
  MIN_LOGIN_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_PHONE_LENGTH,
} from './const';
import {
  validateCheckNewPassword,
  validateDisplayName,
  validateEmail,
  validateFirstName,
  validateLogin, validateNewPassword, validateOldPassword,
  validatePassword,
  validatePhone,
  validateSecondName,
} from './rules';

export type ProfileRules<FormType> = ValidationRules<FormType>;
export type ProfileErrors<FormType> = ErrorMessages<FormType>;

const dataRules: ProfileRules<ProfileDataForm> = {
  login: validateLogin,
  first_name: validateFirstName,
  second_name: validateSecondName,
  display_name: validateDisplayName,
  email: validateEmail,
  phone: validatePhone,
  password: validatePassword,
};

const dataErrors: ProfileErrors<ProfileDataForm> = {
  login: `Логин может содержать ${MIN_LOGIN_LENGTH}-${MAX_LOGIN_LENGTH} символов (латинские буквы, цифры, дефис, подчёркивание)`,
  first_name: 'Имя может состоять из минимум 2 латинских или кириллических букв без пробелов и цифр, первая бука — заглавная',
  second_name: 'Фамилия может состоять из минимум 2 латинских или кириллических букв без пробелов и цифр, первая бука — заглавная',
  display_name: 'Имя в чате может состоять из минимум 2 латинских или кириллических букв без пробелов и цифр, первая бука — заглавная',
  email: 'Email может состоять из латинских букв, цифр, дефисов, точек. Обязательно должен быть знак "@"',
  phone: `Телефон может состоять из ${MIN_PHONE_LENGTH}-${MAX_PHONE_LENGTH} цифр и может начинаться с "+"`,
  password: `Пароль должен содержать ${MIN_PASSWORD_LENGTH}-${MAX_PASSWORD_LENGTH} символов и обязательно должны быть хотя бы одна заглавная буква и цифра`,
};

export const validateProfileDataForm = createValidator(dataRules, dataErrors);
export const validateProfileDataField = (field: keyof ProfileDataForm) => {
  const fieldRules = { [field]: dataRules[field] } as ValidationRules<ProfileDataForm>;
  const fieldErrors = { [field]: dataErrors[field] };

  return createValidator(fieldRules, fieldErrors);
};

const passRules: ProfileRules<ProfilePasswordForm> = {
  oldPassword: validateOldPassword,
  newPassword: validateNewPassword,
  checkNewPassword: validateCheckNewPassword,
};

const passErrors: ProfileErrors<ProfilePasswordForm> = {
  oldPassword: 'Введите старый пароль',
  newPassword: `Пароль должен содержать ${MIN_PASSWORD_LENGTH}-${MAX_PASSWORD_LENGTH} символов и обязательно должны быть хотя бы одна заглавная буква и цифра`,
  checkNewPassword: 'Пароли должны совпадать',
};

export const validateProfilePasswordForm = createValidator(passRules, passErrors);
export const validateProfilePasswordField = (field: keyof ProfilePasswordForm) => {
  const fieldRules = { [field]: passRules[field] } as ValidationRules<ProfilePasswordForm>;
  const fieldErrors = { [field]: passErrors[field] };

  return createValidator(fieldRules, fieldErrors);
};
