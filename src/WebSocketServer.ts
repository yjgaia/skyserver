import * as HTTP from "http";
import SkyLog from "skylog";
import SkyUtil from "skyutil";
import * as WebSocket from "ws";
import WebServer from "./WebServer";
import WebSocketClient from "./WebSocketClient";

export default class WebSocketServer {

    public clients: WebSocketClient[] = [];

    constructor(
        private webServer: WebServer,
        private handler: (client: WebSocketClient) => void,
    ) {
        if (webServer.httpsServer === undefined) {
            webServer.on("load", async () => this.launch());
        } else {
            this.launch();
        }
    }

    private launch() {

        new WebSocket.Server({
            server: this.webServer.httpsServer,
        }).on("connection", (webSocket: WebSocket, req: HTTP.IncomingMessage) => {
            const client = new WebSocketClient(this, webSocket, req);
            this.clients.push(client);
            webSocket.on("close", () => SkyUtil.pull(this.clients, client));
            this.handler(client);
        });

        SkyLog.success("websocket server running...");
    }

    public broadcast(method: string, ...params: any[]) {
        for (const client of this.clients) {
            client.send(method, ...params);
        }
    }
}
