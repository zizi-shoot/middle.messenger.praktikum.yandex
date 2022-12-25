// import { isObject } from './isObject';

export const isDeepEqual = (item1: object, item2: object): boolean => {
  const keys1 = Object.keys(item1);
  const keys2 = Object.keys(item2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  // // eslint-disable-next-line no-restricted-syntax
  // for (const key of keys1) {
  //   // @ts-ignore
  //   const val1 = item1[key];
  //   // @ts-ignore
  //   const val2 = item2[key];
  //   const areObjects = isObject(val1) && isObject(val2);
  //
  //   if (areObjects) {
  //     isDeepEqual(val1, val2);
  //   }
  //
  //   if (val1 !== val2) {
  //     return false;
  //   }
  // }

  return true;
};
