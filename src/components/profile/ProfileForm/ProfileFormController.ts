import {
  validateProfileDataField,
  validateProfileDataForm,
  validateProfilePasswordField,
  validateProfilePasswordForm,
} from '../../../utils/validation/app/profileDataValidation';
import type { ProfileDataForm, ProfilePasswordForm } from '../../../utils/validation';

export const isPasswordForm = (data: ProfileDataForm | ProfilePasswordForm): data is ProfilePasswordForm => 'newPassword' in data;

export class ProfileFormController {
  public static validateForm<FormType extends ProfileDataForm | ProfilePasswordForm>(data: FormType) {
    if (isPasswordForm(data)) {
      return validateProfilePasswordForm(data);
    }

    return validateProfileDataForm(data);
  }

  public static validateField<FormType extends ProfileDataForm | ProfilePasswordForm>(fieldName: keyof FormType, data: FormType) {
    if (isPasswordForm(data)) {
      return validateProfilePasswordField(fieldName as keyof ProfilePasswordForm)(data);
    }

    return validateProfileDataField(fieldName as keyof ProfileDataForm)(data);
  }

  public static async handleSubmit<FormType extends ProfileDataForm | ProfilePasswordForm>(formData: FormType) {
    const { valid, errors } = this.validateForm(formData);

    if (!valid) {
      return Promise.resolve({ status: 'error', errors });
    }

    return Promise.resolve({ status: 'success', errors: {} });
  }
}
