export default class ResponseModel {
    public readonly status: string;
    public readonly code: number;
    public readonly data: any;
    public readonly message: string;

    constructor(message: string, code: number = 200, data: any = {}) {
        if (code >= 500) {
            this.status = "INTERNAL_SERVER_ERROR";
        } else if (code >= 400) {
            this.status = "BAD_REQUEST";
        } else if (code >= 300) {
            this.status = "REDIRECT";
        } else if (code >= 200) {
            this.status = "OK";
        } else {
            this.status = "UNKNOWN";
        }

        this.code = code;
        this.message = message;
        this.data = data || {};
    }
}