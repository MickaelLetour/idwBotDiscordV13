const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();

const { GUILD_ID, CLIENT_ID, DISCORD_TOKEN } = (process.env);

const commands = [];
const commandFiles = fs.readdirSync('./src/app/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(DISCORD_TOKEN);

(async () => {
	try {
		console.log("Started refreshing application [/] commands.");

		// Global commands
		await rest.put(
			Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
				body: commands
			}
		)

		// Commands with guild.id
		// Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
		// 	body: commands
		// }
		.then(() => console.log('Successfully registered application commands.'))
	} catch (error) {
		console.error(error);
	}
})();