"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
require("dotenv/config");
const deploy_commands_1 = require("./commands/deploy-commands");
const { token } = process.env;
// Create a new client instance
const client = new discord_js_1.Client({
    intents: [discord_js_1.Intents.FLAGS.GUILDS]
});
//instancie les commandes slash
(0, deploy_commands_1.registerCommands)();
// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
});
client.on('interactionCreate', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isCommand())
        return;
    const { commandName } = interaction;
    if (commandName === 'ping') {
        yield interaction.reply('Pong!');
    }
    else if (commandName === 'server') {
        yield interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
    }
    else if (commandName === 'user') {
        yield interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
    }
}));
// Login to Discord with your client's token
client.login(token);
//# sourceMappingURL=app.js.map