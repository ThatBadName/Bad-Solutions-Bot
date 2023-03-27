const Handler = require('@thatbadname/discord-command-handler')
const { EmbedBuilder } = require('discord.js')
const { colours } = require('../../constants')

module.exports = {
  testOnly: false,
  slash: false,
  ownerOnly: false,
  data: {
    name: 'nostaff'
  },

  async execute(message, args, client) {
    if (!message.member.roles.cache.has('1051191671494291547')) return message.reply({
      content: `Ur not staff so no`
    })
    if (!args[0]) return message.reply({
      content: `Maybe actually pick a user`
    })
    if (!args[1]) args.push('staff gave no reason')
    message.delete()
    const member = await message.guild.members.fetch(message.mentions.users.map(u => u.id)[0])
    let action = 'unblocked'
    if (member.roles.cache.has('1089974294810988635')) {member.roles.remove('1089974294810988635')}
    else {action = 'blocked'; member.roles.add('1089974294810988635')}
    message.channel.send({content: `${args[0]} has been ${action} from pinging staff`}).then(msg => {
      setTimeout(() => msg.delete(), 5000)
    })

    const channel = message.guild.channels.cache.get('997860565064093787')
    await channel.send({
      embeds: [
        new EmbedBuilder()
        .setTitle(`User ${action} from pinging staff`)
        .setColor(colours.main)
        .setDescription(
          `User: ${member} (\`${member.id}\`)\n` +
          `Staff: ${message.author} (\`${message.author.id}\`)\n` +
          `Reason: ${args.slice(1).join(' ')}`
        )
      ]
    })
  }
}