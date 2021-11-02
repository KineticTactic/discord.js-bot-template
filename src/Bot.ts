import Discord from "discord.js";

import EventHandler from "./handlers/EventHandler";

export default class Bot {
    readonly token: string;
    client: Discord.Client;

    constructor(token: string) {
        this.token = token;

        this.client = new Discord.Client({
            restTimeOffset: 2000,
            makeCache: Discord.Options.cacheWithLimits({
                MessageManager: {
                    sweepInterval: 300,
                    sweepFilter: Discord.LimitedCollection.filterByLifetime({
                        lifetime: 3600,
                        getComparisonTimestamp: (e) => e.editedTimestamp ?? e.createdTimestamp,
                    }),
                },
            }),
            intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MEMBERS],
        });
    }

    async init() {
        EventHandler.init(this.client);
    }

    async run(): Promise<void> {
        return this.client.login(this.token);
    }
}
