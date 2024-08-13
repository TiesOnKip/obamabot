const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('addemoji')
    .setDescription('Adds an emoji to the server')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuildExpressions)
    .addAttachmentOption(option => option.setName('emoji').setDescription('The emoji to add').setRequired(true))
    .addStringOption(option => option.setName('name').setDescription('The name of the emoji').setRequired(true)),
    async execute (interaction) {
        const upload = interaction.options.getAttachment('emoji');
        const name = interaction.options.getString('name');

        await interaction.reply({ content: `I will add the emoji ${name} to the server`, ephemeral: true });

        const emoji = await interaction.guild.emojis.create({ attachment: `${upload.attachment}`, name: `${name}` }).catch(err => {
            setTimeout(() => {
                console.log(err);
                return interaction.editReply({ content: `$P{err.rawError.message}`});
            }, 2000)
        })

        setTimeout(() => {
            if (!emoji) return;

            const embed = new EmbedBuilder()
            .setColor('Blue')
            .setDescription(`Your emoji has been added ${emoji}`)

            interaction.editReply({ content: ``, embeds: [embed] });
        }, 3000)
    }
}