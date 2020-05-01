import BotClient from "../handlers/Client";
import { EventProp, ITextChannel } from "../typings";

export default class ReadyEvent implements EventProp {
    readonly name = "ready";
    constructor(private client: BotClient) {}

    public execute(): void {
        this.client.log.info(`${this.client.user!.username} is ready to serve ${this.client.users.cache.size - 1} users on ${this.client.guilds.cache.size} guilds in `
            + `${this.client.channels.cache.filter(ch => ch.type === "text").size} text channels `
            + `and ${this.client.channels.cache.filter(ch => ch.type === "voice").size} voice channels!`);
        return undefined;
    }
}