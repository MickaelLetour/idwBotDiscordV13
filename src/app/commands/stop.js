const { SlashCommandBuilder } = require ('@discordjs/builders');

module.exports = {
	data : new SlashCommandBuilder()
		.setName('stop')
		.setDescription('stop the bot music'),
	async execute(interaction, client, player) {

		const queue = player.getQueue(interaction.guild);

		if (queue !== undefined) {
			try {
				await queue.stop();
				return await interaction.reply({ content: 'Bot stopped', ephemeral: true });
			} catch (e) {
				console.error('Class stop - Fonction stop : ' , e)
			}
		}
		else {
			return await interaction.reply({ content: 'Le bot ne joue pas de musique', ephemeral: true });
		}
	},

};