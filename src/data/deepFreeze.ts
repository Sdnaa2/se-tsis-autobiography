/**
 * Recursively freezes an object or array in place so authoritative biography
 * data cannot be mutated at runtime by UI components or advisory widgets (AC-01).
 */
export function deepFreeze<T>(value: T): T {
  if (value === null || typeof value !== 'object') {
    return value;
  }

  if (Object.isFrozen(value)) {
    return value;
  }

  Object.freeze(value);

  for (const key of Object.keys(value) as Array<keyof T>) {
    deepFreeze(value[key]);
  }

  return value;
}
