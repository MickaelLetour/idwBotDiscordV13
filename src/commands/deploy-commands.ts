import 'dotenv/config'
import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

const clientId = process.env.CLIENTID;
const guildId = process.env.GUILDID;
const token = process.env.TOKEN
const rest: REST = new REST({ version: '9' }).setToken(token);

const commands = [
    new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
    new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
    new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
].map(command => command.toJSON());

export const registerCommands = (): void => {
    rest.put(Routes.applicationGuildCommands(clientId, guildId), {body: commands})
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error);
}


