import {SlashCommandBuilder} from "@discordjs/builders";
import {Client, CommandInteraction} from "discord.js";
import {Player, Queue, Track} from "discord-player";

export const data = new SlashCommandBuilder()
    .setName("play")
    .setDescription("play a song")
    .addStringOption((option) =>
        option
            .setName("songTitle")
            .setDescription("title of the song")
            .setRequired(true)
    );

export async function execute(interaction: CommandInteraction, client: Client) {

    const player: Player = new Player(client);

    player.on("trackStart", (listeAttente: Queue, song: Track) => {
        listeAttente.metadata.channel.send(`🎶 | Now playing **${song.title}**!`)
    })

    if (!interaction.channelId) {
        return await interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
    }

    if (interaction.guild.me.voice.channelId && interaction.channelId !== interaction.guild.me.voice.channelId) {
        return await interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });
    }

    const query: string | null = interaction.options.getString("songTitle");

    const queue = player.createQueue(interaction.guild, {
        metadata: {
            channel: interaction.channel
        }
    })

    try {
        if (!queue.connection) {
            await queue.connect(interaction.member.voice.channel);
        }
    } catch {
        queue.destroy();
        return await interaction.reply({ content: "Could not join your voice channel!", ephemeral: true });
    }

    await interaction.deferReply();
    if (typeof query === "string"){
        const track = await player.search(query, {
            requestedBy: interaction.user
        }).then(x => x.tracks[0]);
        if (!track) return await interaction.followUp({ content: `❌ | Track **${query}** not found!` });
        queue.play(track);

        return await interaction.followUp({ content: `⏱️ | Loading track **${track.title}**!` });
    }


}