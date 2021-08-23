import Discord from "discord.js";
import Command from "../../base/Command";

export default class PingCmd extends Command {
    constructor() {
        super({
            name: "ping",
            description: "Displays the API/Message Latency",
            category: "general",
        });
    }

    override async call(interaction: Discord.CommandInteraction) {
        await interaction.reply("Pong!");
    }
}
