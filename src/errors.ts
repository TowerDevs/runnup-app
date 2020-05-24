/**
 * Contains global app errors.
 * @module
 */

export class CustomError extends Error {
    constructor(message?: string) {
        super(message); // 'Error' breaks prototype chain here
        this.name = 'CustomError';
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    }
}