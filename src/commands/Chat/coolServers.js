const coolServersMessageEmbeds = require("../../../database/messages/coolServers")

module.exports = {
  testOnly: false,
  slash: false,
  ownerOnly: true,
  data: {
    name: 'coolServers'
  },

  async execute(message, args, client) {
    message.delete()
    message.channel.send({
      embeds: coolServersMessageEmbeds
    })
  }
}