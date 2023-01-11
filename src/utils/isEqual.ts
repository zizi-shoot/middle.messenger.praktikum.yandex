const isPlainObject = (value: unknown): value is Indexed => typeof value === 'object'
  && value !== null
  && value.constructor === Object
  && Object.prototype.toString.call(value) === '[object Object]';

const isArray = (value: unknown): value is [] => Array.isArray(value);

const isArrayOrObject = (value: unknown): value is [] | Indexed => isPlainObject(value) || isArray(value);

export const isEqual = (lhs: Indexed, rhs: Indexed) => {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isEqual(value, rightValue)) {
        // eslint-disable-next-line no-continue
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
};
