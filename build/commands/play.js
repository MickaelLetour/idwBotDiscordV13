"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.data = void 0;
const builders_1 = require("@discordjs/builders");
const discord_player_1 = require("discord-player");
exports.data = new builders_1.SlashCommandBuilder()
    .setName("play")
    .setDescription("play a song")
    .addStringOption((option) => option
    .setName("songTitle")
    .setDescription("title of the song")
    .setRequired(true));
function execute(interaction, client) {
    return __awaiter(this, void 0, void 0, function* () {
        const player = new discord_player_1.Player(client);
        player.on("trackStart", (listeAttente, song) => {
            listeAttente.metadata.channel.send(`🎶 | Now playing **${song.title}**!`);
        });
        if (!interaction.channelId) {
            return yield interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
        }
        if (interaction.guild.me.voice.channelId && interaction.channelId !== interaction.guild.me.voice.channelId) {
            return yield interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });
        }
        const query = interaction.options.getString("songTitle");
        const queue = player.createQueue(interaction.guild, {
            metadata: {
                channel: interaction.channel
            }
        });
        try {
            if (!queue.connection) {
                yield queue.connect(interaction.member.voice.channel);
            }
        }
        catch (_a) {
            queue.destroy();
            return yield interaction.reply({ content: "Could not join your voice channel!", ephemeral: true });
        }
        yield interaction.deferReply();
        if (typeof query === "string") {
            const track = yield player.search(query, {
                requestedBy: interaction.user
            }).then(x => x.tracks[0]);
            if (!track)
                return yield interaction.followUp({ content: `❌ | Track **${query}** not found!` });
            queue.play(track);
            return yield interaction.followUp({ content: `⏱️ | Loading track **${track.title}**!` });
        }
    });
}
exports.execute = execute;
//# sourceMappingURL=play.js.map