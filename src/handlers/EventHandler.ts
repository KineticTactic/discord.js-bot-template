import Discord from "discord.js";
import fs from "fs";

export default class EventHandler {
    static async init(client: Discord.Client) {
        const files = fs.readdirSync(`./src/events`).filter((file) => file.endsWith(".ts"));

        for (const file of files) {
            const Event = (await import(`../events/${file}`)).default;
            const eventInstance = new Event();
            if (eventInstance.once) client.once(eventInstance.name, eventInstance.call);
            else client.on(eventInstance.name, eventInstance.call);
        }
    }
}
