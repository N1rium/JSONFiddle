export const isString = (value) => typeof value === 'string' || value instanceof String;
export const isNumber = (value) => typeof value === 'number' && isFinite(value);
export const isBoolean = (value) => typeof value === 'boolean';
export const isObject = (value) => value && typeof value === 'object' && value.constructor === Object;
export const isArray = (value) => value && typeof value === 'object' && value.constructor === Array;
export const isNull = (value) => value === null;
export const getObjectLength = (obj) => Object.keys(obj).length;