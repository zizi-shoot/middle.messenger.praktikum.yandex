import type { ErrorMessages, ValidationRules } from '../services/validation';
import { createValidator } from '../services/validation';
import type { SignInForm } from './types';
import { MAX_LOGIN_LENGTH, MAX_PASSWORD_LENGTH, MIN_LOGIN_LENGTH, MIN_PASSWORD_LENGTH } from './const';
import { validateLogin, validatePassword } from './rules';

export type SignInRules = ValidationRules<SignInForm>;
export type SignInErrors = ErrorMessages<SignInForm>;

const rules: SignInRules = {
  login: validateLogin,
  password: validatePassword,
};

const errors: SignInErrors = {
  login: `Логин должен содержать ${MIN_LOGIN_LENGTH}-${MAX_LOGIN_LENGTH} символов (латинские буквы, цифры, дефис, подчёркивание)`,
  password: `Пароль должен содержать ${MIN_PASSWORD_LENGTH}-${MAX_PASSWORD_LENGTH} символов и обязательно должны быть хотя бы одна заглавная буква и цифра`,
};

export const validateSignInForm = createValidator(rules, errors);
export const validateSignInField = (field: keyof SignInForm) => {
  const fieldRules = { [field]: rules[field] } as ValidationRules<SignInForm>;
  const fieldErrors = { [field]: errors[field] };

  return createValidator(fieldRules, fieldErrors);
};
