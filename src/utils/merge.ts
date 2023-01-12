export const merge = (lhs: Indexed, rhs: Indexed): Indexed => {
  Object.entries<Indexed>(rhs).forEach(([key, value]) => {
    try {
      if (value.constructor === Object) {
        rhs[key] = merge(lhs[key], value);
      } else {
        lhs[key] = value;
      }
    } catch (e) {
      lhs[key] = value;
    }
  });

  return lhs;
};
