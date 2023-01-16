import type { SignInData } from '@typings/forms';
import { MAX_LOGIN_LENGTH, MAX_PASSWORD_LENGTH, MIN_LOGIN_LENGTH, MIN_PASSWORD_LENGTH } from '../helpers/const';
import { createValidator } from '../services/validation';
import { validateLogin, validatePassword } from '../helpers/rules';
import type { ErrorMessages, ValidationRules } from '../services/validation';

export type SignInRules = ValidationRules<SignInData>;
export type SignInErrors = ErrorMessages<SignInData>;

const rules: SignInRules = {
  login: validateLogin,
  password: validatePassword,
};

const errors: SignInErrors = {
  login: `Логин должен содержать ${MIN_LOGIN_LENGTH}-${MAX_LOGIN_LENGTH} символов (латинские буквы, цифры, дефис, подчёркивание)`,
  password: `Пароль должен содержать ${MIN_PASSWORD_LENGTH}-${MAX_PASSWORD_LENGTH} символов. Обязательно должны быть хотя бы одна заглавная буква и цифра`,
};

export const validateSignInForm = createValidator(rules, errors);
