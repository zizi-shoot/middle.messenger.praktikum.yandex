import {
  MAX_LOGIN_LENGTH,
  MAX_PASSWORD_LENGTH,
  MAX_PHONE_LENGTH,
  MIN_LOGIN_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_PHONE_LENGTH,
} from '../helpers/const';
import type { ErrorMessages, ValidationRules } from '../services/validation';
import { createValidator } from '../services/validation';
import {
  validateCheckPassword,
  validateEmail,
  validateFirstName,
  validateLogin,
  validatePassword,
  validatePhone,
  validateSecondName,
} from '../helpers/rules';
import type { SignUpData } from '../../../types/forms';

export type SignUpRules = ValidationRules<SignUpData>;
export type SignUpErrors = ErrorMessages<SignUpData>;

const rules: SignUpRules = {
  login: validateLogin,
  first_name: validateFirstName,
  second_name: validateSecondName,
  email: validateEmail,
  phone: validatePhone,
  password: validatePassword,
  password_check: validateCheckPassword,
};

const errors: SignUpErrors = {
  login: `Логин может содержать ${MIN_LOGIN_LENGTH}-${MAX_LOGIN_LENGTH} символов (латинские буквы, цифры, дефис, подчёркивание)`,
  first_name: 'Имя может состоять из минимум 2 латинских или кириллических букв без пробелов и цифр, первая бука — заглавная',
  second_name: 'Фамилия может состоять из минимум 2 латинских или кириллических букв без пробелов и цифр, первая бука — заглавная',
  email: 'Email может состоять из латинских букв, цифр, дефисов, точек. Обязательно должен быть знак "@"',
  phone: `Телефон может состоять из ${MIN_PHONE_LENGTH}-${MAX_PHONE_LENGTH} цифр и может начинаться с "+"`,
  password: `Пароль должен содержать ${MIN_PASSWORD_LENGTH}-${MAX_PASSWORD_LENGTH} символов. Обязательно должны быть хотя бы одна заглавная буква и цифра`,
  password_check: 'Пароли должны совпадать',
};

export const validateSignUpForm = createValidator(rules, errors);
