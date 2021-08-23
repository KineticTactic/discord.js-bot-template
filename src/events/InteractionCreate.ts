import Discord from "discord.js";

import Event from "../base/Event";
import CommandHandler from "../handlers/CommandHandler";

export default class InteractionCreateEvent extends Event {
    constructor() {
        super({
            name: "interactionCreate",
        });
    }

    override async call(interaction: Discord.CommandInteraction) {
        await CommandHandler.callAsSlash(interaction);
    }
}
