import { validateSignUpField, validateSignUpForm } from '../../utils/validation/app/signUpValidation';
import { SignUpForm } from '../../utils/validation';

export class SignUpPageController {
  public static validateForm(data: SignUpForm) {
    return validateSignUpForm(data);
  }

  public static validateField(fieldName: keyof SignUpForm, data: SignUpForm) {
    return validateSignUpField(fieldName)(data);
  }

  public static async handleSubmit(formData: SignUpForm) {
    const { valid, errors } = this.validateForm(formData);

    if (!valid) {
      return Promise.resolve({ status: 'error', errors });
    }

    return Promise.resolve({ status: 'success', errors: {} });
  }
}
