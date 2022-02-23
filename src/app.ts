import * as fs from "fs";
import {Client, Collection, Intents} from "discord.js";
import 'dotenv/config';
import { registerCommands } from './commands/deploy-commands';

const { token } = process.env;

// Create a new client instance
const client = new Client({
    intents: [Intents.FLAGS.GUILDS]
})

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.ts'));
const commands = [];

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

// instancie les commandes slash
registerCommands();

// When the client is ready, run this code (only once)
client.once('ready', () => {
console.log('Ready!')
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'ping') {
        await interaction.reply('Pong!');
    } else if (commandName === 'server') {
        await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
    } else if (commandName === 'user') {
        await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
    }
});

// Login to Discord with your client's token
client.login(token);