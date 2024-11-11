import { Transform, TransformFnParams } from 'class-transformer';

type BooleanLike = boolean | number | string | null | undefined;

/**
 * Valid string values that can be converted to boolean true
 */
const TRUE_VALUES = new Set(['true', 'on', 'yes', '1']);

/**
 * Valid string values that can be converted to boolean false
 */
const FALSE_VALUES = new Set(['false', 'off', 'no', '0']);

/**
 * Converts various value types to a boolean or undefined
 * @param value - The value to convert
 * @returns boolean | undefined
 */
const toBooleanValue = (value: BooleanLike): boolean | undefined => {
    // Handle null/undefined
    if (value == null) {
        return undefined;
    }

    // Handle boolean
    if (typeof value === 'boolean') {
        return value;
    }

    // Handle number
    if (typeof value === 'number') {
        return Boolean(value);
    }

    // Handle string
    if (typeof value === 'string') {
        const normalized = value.toLowerCase().trim();
        if (TRUE_VALUES.has(normalized)) return true;
        if (FALSE_VALUES.has(normalized)) return false;
    }

    return undefined;
};

/**
 * Decorator that transforms values to boolean during class transformation
 * 
 * Usage:
 * ```typescript
 * class Config {
 *   @ToBoolean()
 *   isEnabled: boolean;
 * }
 * ```
 */
const ToBoolean = () => {
    return Transform(
        ({ value, obj, key }: TransformFnParams) => {
            if (obj === undefined) {
                return value;
            }
            return toBooleanValue(obj[key]);
        },
        {
            toClassOnly: true,
        }
    );
};

export { ToBoolean, toBooleanValue, type BooleanLike };