/// <reference types="node" />
import HTTP from "http";
import * as WebSocket from "ws";
import { WebSocketServer } from ".";
import AbstractSocketClient from "./AbstractSocketClient";
export default class WebSocketClient extends AbstractSocketClient {
    private server;
    private webSocket;
    ip: string;
    constructor(server: WebSocketServer, webSocket: WebSocket, nativeRequest: HTTP.IncomingMessage);
    send(method: string, ...params: any[]): void;
    broadcast(method: string, ...params: any[]): void;
}
//# sourceMappingURL=WebSocketClient.d.ts.map