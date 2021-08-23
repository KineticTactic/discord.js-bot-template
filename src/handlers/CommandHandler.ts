import Discord from "discord.js";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

import Command from "../base/Command";
import { walk } from "../common/helper";

export default class CommandHandler {
    static commands: Discord.Collection<string, Command>;

    static async init(client: Discord.Client) {
        CommandHandler.commands = new Discord.Collection<string, Command>();

        const files = walk("./src/commands").filter((file) => file.endsWith(".ts"));
        for (const file of files) {
            const Command = (await import(`../.${file}`)).default; // src/dir/file.js -> dir/file.js
            const cmd = new Command();
            console.log(cmd.name);
            CommandHandler.commands.set(cmd.name, cmd);
        }

        const data = CommandHandler.commands.map((c) => c.data.toJSON());

        const rest = new REST({ version: "9" }).setToken(client.token!);
        try {
            await rest.put(Routes.applicationGuildCommands(client.user!.id, "741149098282975293"), { body: data });
        } catch (error) {
            console.error(error);
        }
    }

    static async callAsSlash(interaction: Discord.CommandInteraction) {
        const command = CommandHandler.commands.get(interaction.commandName)!;
        try {
            await command.checkPermissions(interaction);
            await command.call(interaction);
        } catch (err) {
            // CommandHandler.handleError(cmd, err);
        }
    }
}
