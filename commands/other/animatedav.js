const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    admin: true,
    data: new SlashCommandBuilder()
    .setName('animated-avatar')
    .setDescription('Animate an avatar for your bot')
    .addAttachmentOption(option => option.setName('avatar').setDescription('The avatar to animate').setRequired(true)),
    async execute(interaction, client) {
        
        const { options } = interaction;
        const avatar  = options.getAttachment('avatar');

        async function sendMessage (message) {
            const embed = new EmbedBuilder()
            .setColor("Blurple")
            .setDescription(message);

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (avatar.contentType !== "image/gif") return await sendMessage(`⚠️ Please use a gif for animated emojis`);

        var error;
        await client.user.setAvatar(avatar.url).catch(async err => {
            error = true;
            console.log(err);
            return await sendMessage(`⚠️ Error: \`${err.toString()}\``);
        });

        if (error) return;
        await sendMessage(`Your avatar has been uploaded`);
    }
}