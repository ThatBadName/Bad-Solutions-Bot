const Handler = require('@thatbadname/discord-command-handler')

module.exports = {
  testOnly: false,
  slash: false,
  ownerOnly: true,
  data: {
    name: 'staff'
  },

  async execute(message, args, client) {
    if (message.member.roles.cache.has('1089974294810988635')) {
      return message.reply({
        content: `No can do :(\nYou have been blocked from the \`>>staff\` command`
      })
    }
    const cooldown = Handler.main.cooldowns(client, 'staff', {id: 994642021425877112, personal: 600})
    if (cooldown && cooldown.cancelCommand === true) return message.reply({content: `Staff have been pinged recently`})
    message.channel.send({content: `<@&1051191671494291547>\nPinged by: ${message.author}\nReason: ${args.length > 0 ? args[0].slice(0, 500) : 'Aww no reason'}`})
  }
}