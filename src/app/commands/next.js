const { SlashCommandBuilder } = require ('@discordjs/builders');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('next')
		.setDescription('play the next song of the queue'),
	async execute(interaction, client, player) {

		if (!interaction.member.voice.channelId) {
			return await interaction.reply({ content: 'You are not in a voice channel!', ephemeral: true });
		}
		if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
			return await interaction.reply({ content: 'You are not in my voice channel!', ephemeral: true });
		}
		const queue = player.getQueue(interaction.guild);

		if (queue) {
			if (queue.tracks.length > 0) {
				return queue.skip();
			} else {
				return await interaction.reply({ content: 'Queue does\'nt exist' });
			}
		}

	},
};
