const aboutMessageEmbeds = require("../../../database/messages/about")

module.exports = {
  testOnly: false,
  slash: false,
  ownerOnly: true,
  data: {
    name: 'about'
  },

  async execute(message, args, client) {
    message.delete()
    message.channel.send({
      embeds: aboutMessageEmbeds
    })
  }
}