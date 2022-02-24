import {Client, Intents} from "discord.js";
import config from "./config";
import * as commandModules from "./commands";

const commands = Object(commandModules);

// Create a new client instance
const client = new Client({
    intents: [Intents.FLAGS.GUILDS]
})

client.once('ready', () => {
console.log('Discord Bot Ready!')
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const {commandName} = interaction;
    commands[commandName].execute(interaction, client);
})

// Login to Discord with your client's token
client.login(config.DISCORD_TOKEN);