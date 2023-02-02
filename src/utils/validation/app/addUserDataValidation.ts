import { validateChatUser } from '../helpers/rules';
import type { ErrorMessages, ValidationRules } from '../services/validation';
import { createValidator } from '../services/validation';
import { MAX_LOGIN_LENGTH, MIN_LOGIN_LENGTH } from '../helpers/const';
import type { ChatUserData } from '../../../types/forms';

export type ChatUserRules = ValidationRules<ChatUserData>;
export type ChatUserErrors = ErrorMessages<ChatUserData>;

const rules: ChatUserRules = {
  login: validateChatUser,
};

const errors: ChatUserErrors = {
  login: `Логин может содержать ${MIN_LOGIN_LENGTH}-${MAX_LOGIN_LENGTH} символов (латинские буквы, цифры, дефис, подчёркивание)`,
};

export const validateChatUserForm = createValidator(rules, errors);
