import type { NewChatData } from '@typings/forms';
import { MAX_CHAT_TITLE_LENGTH, MIN_CHAT_TITLE_LENGTH } from '../helpers/const';
import type { ErrorMessages, ValidationRules } from '../services/validation';
import { createValidator } from '../services/validation';
import { validateNewChat } from '../helpers/rules';

export type NewChatRules = ValidationRules<NewChatData>;
export type NewChatErrors = ErrorMessages<NewChatData>;

const rules: NewChatRules = {
  title: validateNewChat,
};

const errors: NewChatErrors = {
  title: `Название чата должно содержать ${MIN_CHAT_TITLE_LENGTH}-${MAX_CHAT_TITLE_LENGTH} символов`,
};

export const validateNewChatForm = createValidator(rules, errors);
