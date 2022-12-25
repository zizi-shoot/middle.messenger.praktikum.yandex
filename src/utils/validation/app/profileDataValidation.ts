import type { ErrorMessages, ValidationRules } from '../services/validation';
import { createValidator } from '../services/validation';
import type { ProfileData, ProfilePasswordData } from '../../../types/forms';
import {
  MAX_LOGIN_LENGTH,
  MAX_PASSWORD_LENGTH,
  MAX_PHONE_LENGTH,
  MIN_LOGIN_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_PHONE_LENGTH,
} from '../helpers/const';
import {
  validateCheckNewPassword,
  validateDisplayName,
  validateEmail,
  validateFirstName,
  validateLogin,
  validateNewPassword,
  validateOldPassword,
  validatePhone,
  validateSecondName,
} from '../helpers/rules';

export type ProfileRules<FormType> = ValidationRules<FormType>;
export type ProfileErrors<FormType> = ErrorMessages<FormType>;

const dataRules: ProfileRules<ProfileData> = {
  login: validateLogin,
  first_name: validateFirstName,
  second_name: validateSecondName,
  display_name: validateDisplayName,
  email: validateEmail,
  phone: validatePhone,
};

const dataErrors: ProfileErrors<ProfileData> = {
  login: `Логин может содержать ${MIN_LOGIN_LENGTH}-${MAX_LOGIN_LENGTH} символов (латинские буквы, цифры, дефис, подчёркивание)`,
  first_name: 'Имя может состоять из минимум 2 латинских или кириллических букв без пробелов и цифр, первая бука — заглавная',
  second_name: 'Фамилия может состоять из минимум 2 латинских или кириллических букв без пробелов и цифр, первая бука — заглавная',
  display_name: 'Имя в чате может состоять из минимум 2 латинских или кириллических букв без пробелов и цифр, первая бука — заглавная',
  email: 'Email может состоять из латинских букв, цифр, дефисов, точек. Обязательно должен быть знак "@"',
  phone: `Телефон может состоять из ${MIN_PHONE_LENGTH}-${MAX_PHONE_LENGTH} цифр и может начинаться с "+"`,
};

export const validateProfileDataForm = createValidator(dataRules, dataErrors);

const passRules: ProfileRules<ProfilePasswordData> = {
  oldPassword: validateOldPassword,
  newPassword: validateNewPassword,
  checkNewPassword: validateCheckNewPassword,
};

const passErrors: ProfileErrors<ProfilePasswordData> = {
  oldPassword: 'Введите старый пароль',
  newPassword: `Пароль должен содержать ${MIN_PASSWORD_LENGTH}-${MAX_PASSWORD_LENGTH} символов. Обязательно должны быть хотя бы одна заглавная буква и цифра`,
  checkNewPassword: 'Пароли должны совпадать',
};

export const validateProfilePasswordForm = createValidator(passRules, passErrors);
