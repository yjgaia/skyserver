import * as HTTP from "http";
import SkyLog from "skylog";
import * as ZLib from "zlib";
import ENCODINGS from "./ENCODINGS.json";
import WebRequest from "./WebRequest";

export default class WebResponse {

    private acceptEncoding: string;
    public responsed = false;

    constructor(private webRequest: WebRequest, private res: HTTP.ServerResponse) {
        const headers = webRequest.headers["accept-encoding"];
        if (typeof headers === "string") {
            this.acceptEncoding = headers;
        } else if (headers === undefined) {
            this.acceptEncoding = "";
        } else {
            this.acceptEncoding = headers[0];
        }
    }

    public response({
        headers = {}, statusCode, contentType, encoding, content,
    }: {
        headers?: { [headerName: string]: any },
        statusCode?: number,
        contentType?: string,
        encoding?: BufferEncoding,
        content?: string | Buffer,
    }) {
        if (this.responsed !== true) {

            if (contentType !== undefined) {
                if (encoding === undefined) {
                    encoding = (ENCODINGS as any)[contentType];
                }
                headers["Content-Type"] = `${contentType}; charset=${encoding}`;
            }

            if (content === undefined) { content = ""; }
            if (statusCode === undefined) { statusCode = 200; }
            if (encoding === undefined) { encoding = "utf-8"; }

            if (encoding === "utf-8" && typeof this.acceptEncoding === "string" && this.acceptEncoding.match(/\bgzip\b/) !== null) {

                // when gzip encoding
                headers["Content-Encoding"] = "gzip";

                ZLib.gzip(content, (error, buffer) => {
                    if (error !== null) {
                        SkyLog.error(error, this.webRequest);
                    } else {
                        this.res.writeHead(statusCode!, headers);
                        this.res.end(buffer, encoding!);
                    }
                });

            } else {
                this.res.writeHead(statusCode, headers);
                this.res.end(content, encoding);
            }

            this.responsed = true;
            this.webRequest.responsed = true;
        }
    }
}