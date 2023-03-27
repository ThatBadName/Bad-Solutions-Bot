const { EmbedBuilder } = require("discord.js");
const { colours } = require("../../src/constants");

const aboutMessageEmbeds = [
  new EmbedBuilder()
  .setTitle('What is this server?')
  .setDescription(`Last time I checked it was a support server for all my programming projects\n\n**The link list**`)
  .setFields({
    name: `Links`,
    inline: true,
    value:
      `Twitter: [@ThreadedBot](https://twitter.com/threadedbot)\n` +
      `GitHub: [Bad-Solutions-Bot](https://github.com/ThatBadName/Bad-Solutions-Bot)\n` +
      `Server invite: https://discord.gg/9jFqS5H43Q`
  })
  .setColor(colours.main),

  new EmbedBuilder()
  .setTitle(`The Big List of Rules`)
  .setColor(colours.main)
  .setDescription(
    `*If you have any problems with our moderation you can go to <#994690529558282300>*\n\n` +
    `\` 1. \` We expect you to follow [Discord's Terms of Service](https://discord.com/terms) and [Guidelines](https://discord.com/guidelines), any violation of these will be reported to Discord.\n` +
    `\` 2. \` Sorry if you do speek another language but this server is English only as we moderate in English\n` +
    `\` 3. \` Lets not try to advertise :)\n` +
    `\` 4. \` Don't harass or bully people\n\n` +
    `*Staff will take appropriate action even if it is not included in the server rules*`
  ),

  new EmbedBuilder()
  .setTitle('Frequently Asked Questions')
  .setColor(colours.main)
  .addFields({
    name: 'How can I get staff attention?',
    value: `If there is an emergency (like a raid) use the \`>>staff\` command. Misuse of this will get you blacklisted from the command`
  }, {
    name: `I feel like there are channels missing`,
    value: `Go checkout the access roles in <#995098125456920597>`
  })
]

module.exports = aboutMessageEmbeds