import Discord from "discord.js";

import Event from "../base/Event";

export default class ReadyEvent extends Event {
    constructor() {
        super({
            name: "ready",
            once: true,
        });
    }

    async call(client: Discord.Client) {
        console.log(`Logged in as ${client.user!.username}#${client.user!.discriminator}`);
    }
}
