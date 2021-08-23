import Discord from "discord.js";

interface EventOptions {
    name: string;
    once?: boolean;
}

export default class Event {
    name: string;
    once: boolean;

    constructor(options: EventOptions) {
        this.name = options.name;
        this.once = options.once ? options.once : false;
    }

    call(args: any) {
        console.log(`${this.name} event called! To add functionality to this event override this call method.`);
    }
}
