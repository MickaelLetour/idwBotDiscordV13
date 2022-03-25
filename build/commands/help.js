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
exports.data = new builders_1.SlashCommandBuilder()
    .setName("help")
    .setDescription("Creates a new help ticket.")
    .addStringOption((option) => option
    .setName("description")
    .setDescription("Describe your problem")
    .setRequired(true));
function execute(interaction, client) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(interaction === null || interaction === void 0 ? void 0 : interaction.channelId)) {
            return;
        }
        const channel = yield client.channels.fetch(interaction.channelId);
        if (!channel || channel.type !== "GUILD_TEXT") {
            return;
        }
        const thread = yield channel.threads.create({
            name: `support-${Date.now()}`,
            reason: `Support ticket ${Date.now()}`
        });
        const problemDescription = interaction.options.getString("description");
        const { user } = interaction;
        thread.send(`**User:** ${user} **Problem:** ${problemDescription}`);
        // TODO: create the ticket and store it in the firestore
        return interaction.reply({
            content: 'Help is on the way',
            ephemeral: true,
        });
    });
}
exports.execute = execute;
//# sourceMappingURL=help.js.map