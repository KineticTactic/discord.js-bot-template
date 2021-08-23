import Discord from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

import { MissingPermissionsError } from "../base/Error";

interface ArgumentOptions {
    name: string;
    description: string;
    required?: boolean;
    type: Discord.ApplicationCommandOptionType;
}

interface CommandOptions {
    name: string;
    description: string;
    category: string;
    args?: ArgumentOptions[];
    userPerms?: string[];
    botPerms?: string[];
}

export default class Command {
    name: string;
    description: string;
    category: string;
    args: ArgumentOptions[];
    userPerms: string[];
    botPerms: string[];
    data: SlashCommandBuilder;

    constructor(options: CommandOptions) {
        this.name = options.name;
        this.description = options.description;
        this.category = options.category;
        this.args = options.args || [];
        this.userPerms = options.userPerms || [];
        this.botPerms = options.botPerms || [];

        this.data = new SlashCommandBuilder().setName(this.name).setDescription(this.description);
        for (let arg of this.args) {
            const setOptionData = (option: any) => option.setName(arg.name).setDescription(arg.description).setRequired(arg.required);
            switch (arg.type) {
                case "STRING":
                    this.data.addStringOption(setOptionData);
                    break;
                case "USER":
                    this.data.addUserOption(setOptionData);
                    break;
                case "CHANNEL":
                    this.data.addChannelOption(setOptionData);
                    break;
                case "INTEGER":
                    this.data.addIntegerOption(setOptionData);
                    break;
            }
        }
    }

    checkPermissions(interaction: Discord.CommandInteraction) {
        for (let p of this.userPerms)
            if (!(interaction.member!.permissions as Discord.Permissions).has(p as Discord.PermissionResolvable)) throw new MissingPermissionsError(p, true);
        for (let p of this.botPerms)
            if (!interaction.guild!.me!.permissions.has(p as Discord.PermissionResolvable)) throw new MissingPermissionsError(p, false);
    }

    call(interaction: Discord.CommandInteraction) {
        console.log(`Command ${this.name} called!`);
    }
}

module.exports = Command;
