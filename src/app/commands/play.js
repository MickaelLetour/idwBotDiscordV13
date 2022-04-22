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
			if (track.playlist) {
				queue.metadata.channel.send(`Track ${track.playlist.title} added in the queue!`);
				track.playlist.tracks.forEach((track) => {
					queue.addTrack(track)
				});
			} else {
				queue.metadata.channel.send(`Track ${track.title} added in the queue!`);
				queue.addTrack(track);
			}
		}
		else {
			if (track.playlist) {
				try {
					await queue.play(track.playlist.tracks.shift()).then(
						queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`),
						queue.metadata.channel.send(`Track ${track.playlist.title} added in the queue!`),
					);
					track.playlist.tracks.forEach((track) => {
						queue.addTrack(track);
					});
				} catch (e) {
					console.error('Class play - Fonction play : ', e)
				}
			} else {
				try {
					await queue.play(track).then(
						queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`)
					);
				} catch (e) {
					console.error('Class play - Fonction play : ', e)
				}
			}
		}
		return await interaction.followUp({ content: `⏱️ | Loading track **${track.title}**!` });
	},

};