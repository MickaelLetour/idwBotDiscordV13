import {Client, Intents} from "discord.js";
import 'dotenv/config';
import { registerCommands } from './commands/deploy-commands';

const { token } = process.env;

// Create a new client instance
const client = new Client({
    intents: [Intents.FLAGS.GUILDS]
})

//instancie les commandes slash
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