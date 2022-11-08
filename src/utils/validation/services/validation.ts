export type ValidationRule<T> = (data: T) => boolean;

type RequiresAll<T> = ValidationRule<T>;

export function all<T>(rules: List<ValidationRule<T>>): RequiresAll<T> {
  return (data) => rules.every((isValid) => isValid(data));
}

export type ErrorMessage = string;
export type ErrorMessages<T> = Partial<Record<keyof T, ErrorMessage>>;
export type ValidationRules<T> = Partial<Record<keyof T, ValidationRule<T>>>;

type ValidationResult<Data> = {
  valid: boolean;
  errors: ErrorMessages<Data>;
};

export function createValidator<Data>(
  rules: ValidationRules<Data>,
  errors: ErrorMessages<Data>,
) {
  return function validate(data: Data): ValidationResult<Data> {
    const result: ValidationResult<Data> = {
      valid: true,
      errors: {},
    };

    Object.keys(rules).forEach((key) => {
      const field = key as keyof Data;
      const validateRule = rules[field];

      if (!validateRule) {
        return;
      }

      if (!validateRule(data)) {
        result.valid = false;
        result.errors[field] = errors[field];
      }
    });

    return result;
  };
}
