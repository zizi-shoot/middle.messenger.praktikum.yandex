export const notEmpty = <T>(value: T) => !!value;
export const contains = (value: string, pattern: RegExp) => value.search(pattern) >= 0;
export const inRange = (value: Comparable, min: Comparable, max: Comparable) => value >= min && value <= max;
