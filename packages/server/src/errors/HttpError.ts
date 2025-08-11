export class HttpError extends Error {
    //TODO maybe create a set of different predefined http errors?
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        Object.setPrototypeOf(this, HttpError.prototype);
    }
}
