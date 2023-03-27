const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const { colours } = require("../../src/constants");

const selfRolesData1 = {
  embeds: [
    new EmbedBuilder()
    .setColor(colours.main)
    .setTitle('Ping Roles')
    .setDescription(`Choose what you want notifications for`)
  ],
  components: [
    new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
      .setCustomId('selfRole-998321610031370390')
      .setLabel('Announcements')
      .setStyle('Secondary'),

      new ButtonBuilder()
      .setCustomId('selfRole-995098535924076656')
      .setLabel('Bot Updates')
      .setStyle('Secondary'),

      new ButtonBuilder()
      .setCustomId('selfRole-1089624134331420836')
      .setLabel('NPM Updates')
      .setStyle('Secondary'),

      new ButtonBuilder()
      .setCustomId('selfRole-995333041746628612')
      .setLabel('Bot Status')
      .setStyle('Secondary'),

      new ButtonBuilder()
      .setCustomId('selfRole-995122546456404049')
      .setLabel('Giveaways')
      .setStyle('Secondary'),
    ),
    new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
      .setCustomId('selfRole-1084180739182055484')
      .setLabel('Uhhhhh chat is dead again')
      .setStyle('Secondary')
    )
  ]
}

const selfRolesData2 = {
  embeds: [
    new EmbedBuilder()
    .setColor(colours.main)
    .setTitle('Access Roles')
    .setDescription(`Choose what you want access to`)
  ],
  components: [
    new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
      .setCustomId('selfRole-1089455494848053298')
      .setLabel('Support Channels')
      .setStyle('Secondary'),

      new ButtonBuilder()
      .setCustomId('selfRole-1089667411457871935')
      .setLabel('Community Channels')
      .setStyle('Secondary'),

      new ButtonBuilder()
      .setCustomId('selfRole-1089625250288906310')
      .setLabel('Lemme see logs')
      .setStyle('Secondary'),
    )
  ]
}

module.exports = {
  selfRolesData1,
  selfRolesData2
}