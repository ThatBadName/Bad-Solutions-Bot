const { selfRolesData1, selfRolesData2 } = require("../../../database/messages/selfRoles")

module.exports = {
  testOnly: false,
  slash: false,
  ownerOnly: true,
  data: {
    name: 'selfRoles'
  },

  async execute(message, args, client) {
    message.delete()
    message.channel.send(selfRolesData1)
    message.channel.send(selfRolesData2)
  }
}