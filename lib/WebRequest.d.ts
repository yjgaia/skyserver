/// <reference types="node" />
import * as HTTP from "http";
export default class WebRequest {
    req: HTTP.IncomingMessage;
    headers: HTTP.IncomingHttpHeaders;
    method: string;
    ip: string;
    parameterString: string;
    parameters: {
        [name: string]: any;
    };
    uri: string;
    constructor(req: HTTP.IncomingMessage);
    parseParams(): void;
    toString: () => string;
}
//# sourceMappingURL=WebRequest.d.ts.map