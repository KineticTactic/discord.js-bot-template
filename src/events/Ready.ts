import Discord from "discord.js";

import Event from "../base/Event";
import CommandHandler from "../handlers/CommandHandler";

export default class ReadyEvent extends Event {
    constructor() {
        super({
            name: "ready",
            once: true,
        });
    }

    override async call(client: Discord.Client) {
        console.log(`Logged in as ${client.user!.username}#${client.user!.discriminator}`);

        await CommandHandler.init(client);
    }
}
