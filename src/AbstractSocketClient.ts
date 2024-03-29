import EventContainer from "eventcontainer";

export default abstract class AbstractSocketClient extends EventContainer {
    public abstract send(method: string, ...params: any[]): void;
}
