const { SlashCommandBuilder } = require ('@discordjs/builders');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play a song')
		.addStringOption(option =>
			option.setName('song')
				.setDescription('The song title')
				.setRequired(true),
		),
	async execute(interaction, client, player) {

		player.on('trackStart', (queue, track) => queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`));

		if (!interaction.member.voice.channelId) {
			return await interaction.reply({ content: 'You are not in a voice channel!', ephemeral: true });
		}
		if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
			return await interaction.reply({ content: 'You are not in my voice channel!', ephemeral: true });
		}
		const query = interaction.options.get('song').value;
		const queue = player.createQueue(interaction.guild, {
			metadata: {
				channel: interaction.channel,
			},
		});

		try {
			if (!queue.connection) {
				await queue.connect(interaction.member.voice.channel);
			}
		}
		catch {
			queue.destroy();
			return await interaction.reply({ content: 'Could not join your voice channel!', ephemeral: true });
		}

		await interaction.deferReply();

		const track = await player.search(query, {
			requestedBy: interaction.user,
		}).then(x => x.tracks[0]);
		if (!track) return await interaction.followUp({ content: `❌ | Track **${query}** not found!` });

		if (queue.playing) {
			queue.addTrack(track);
			queue.metadata.channel.send(`Track ${track.title} added in the queue!`);
		}
		else {
			await queue.play(track);
		}

		return await interaction.followUp({ content: `⏱️ | Loading track **${track.title}**!` });
	},

};