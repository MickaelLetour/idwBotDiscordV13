"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCommands = void 0;
require("dotenv/config");
const builders_1 = require("@discordjs/builders");
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const clientId = process.env.CLIENTID;
const guildId = process.env.GUILDID;
const token = process.env.TOKEN;
const rest = new rest_1.REST({ version: '9' }).setToken(token);
const commands = [
    new builders_1.SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
    new builders_1.SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
    new builders_1.SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
].map(command => command.toJSON());
const registerCommands = () => {
    rest.put(v9_1.Routes.applicationGuildCommands(clientId, guildId), { body: commands })
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error);
};
exports.registerCommands = registerCommands;
//# sourceMappingURL=deploy-commands.js.map