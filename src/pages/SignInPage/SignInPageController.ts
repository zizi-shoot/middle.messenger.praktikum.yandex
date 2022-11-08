import { validateSignInField, validateSignInForm } from '../../utils/validation/app/signInValidation';
import type { SignInForm } from '../../utils/validation';

export class SignInPageController {
  public static validateForm(data: SignInForm) {
    return validateSignInForm(data);
  }

  public static validateField(fieldName: keyof SignInForm, data: SignInForm) {
    return validateSignInField(fieldName)(data);
  }

  public static async handleSubmit(formData: SignInForm) {
    const { valid, errors } = this.validateForm(formData);

    if (!valid) {
      return Promise.resolve({ status: 'error', errors });
    }

    return Promise.resolve({ status: 'success', errors: {} });
  }
}
