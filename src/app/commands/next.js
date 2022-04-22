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
				try {
					queue.metadata.channel.send(`🎶 | Now playing **${queue.tracks[0]}**!`);
					return await queue.skip();
				} catch (e) {
					console.error('Class next - Fonction skip : ' , e)
				}
			} else {
				return await interaction.reply({ content: 'Queue does\'nt exist' });
			}
		}
	},
};
