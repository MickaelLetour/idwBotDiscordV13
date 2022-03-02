const { SlashCommandBuilder } = require ('@discordjs/builders');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with latency from server!'),
    async execute(interaction, client) {
        await interaction.reply(`🏓 | ${client.ws.ping} ms`);
    },
};