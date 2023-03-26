const {
  EmbedBuilder
} = require("discord.js");

const coolServersMessageEmbeds = [
  new EmbedBuilder()
  .setTitle(`\`🌐\` Cool Servers`)
  .setDescription(
    `The following are servers that we reccomend you joining\n\n` +
    `If you want a place on this list please go to <#994690529558282300>. We do have a couple of rules about this though\n` +
    `\` - \` Your server must be fairly active\n` +
    `\` - \` You and your server must not break any of Discord's ToS\n` +
    `\` - \` You must have one of our bots in your server (it must also be used actively)\n` +
    `\` - \` You must stay in our server\n\n` +
    `If we think that your server looks cool we will also just add it\n`
  )
  .setFooter({
    text: `Please note that even if your server meets these requirements it may not be accepted. Tickets are also handled on a case-to-case basis`
  }),

  new EmbedBuilder()
  .setTitle('Hurb\'s Advertising Center')
  .setURL('https://discord.gg/XRxQnSatAG')
  .setThumbnail('https://i.imgur.com/YYMe4yC.png')
  .setDescription(`A server owned by <@529556600072175627>, made for small creators to show off their platforms and what they do. Creators are able to organise collaborations with each other and ask for advice from everyone else`),

  new EmbedBuilder()
  .setTitle('Splinter.Host')
  .setURL('https://discord.gg/R34gU655P3')
  .setThumbnail('https://i.imgur.com/cKqo2Ur.png')
  .setDescription(`[Splinter.Host](https://splinterhosting.com) is an epic hosting site, owned by <@581610266400391218>, that provides Minecraft servers will little to no lag at all`)
]

module.exports = coolServersMessageEmbeds