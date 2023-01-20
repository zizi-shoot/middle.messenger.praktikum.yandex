import type { ErrorMessages, ValidationRules } from '../services/validation';
import { createValidator } from '../services/validation';
import { validateAvatar } from '../helpers/rules';
import type { AvatarData } from '../../../types/forms';

export type AvatarRules = ValidationRules<AvatarData>;
export type AvatarErrors = ErrorMessages<AvatarData>;

const rules: AvatarRules = {
  avatar: validateAvatar,
};

const errors: AvatarErrors = {
  avatar: 'Файл не выбран',
};

export const validateAvatarForm = createValidator(rules, errors);
