import dotenv from "dotenv";
dotenv.config();

import Bot from "./Bot";

const bot = new Bot(process.env.BOT_TOKEN!);

(async () => {
    await bot.init();
    bot.run();
})();
