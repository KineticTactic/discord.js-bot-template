import Discord from "discord.js";

import Event from "../base/Event";

export default class MessageCreateEvent extends Event {
    constructor() {
        super({
            name: "messageCreate",
        });
    }

    override async call(message: Discord.Message) {
        console.log(message.content);
    }
}
