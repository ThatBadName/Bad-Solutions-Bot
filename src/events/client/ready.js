const { ActivityType } = require("discord.js")

module.exports = {
  name: 'ready',
  once: true,

  async execute(client) {
    console.log(`[Startup] ${client.user.username} is online`)
    client.user.setPresence({
      activities: [{
          name: `Bad Solutions`,
          type: ActivityType.Watching
      }],
      status: 'dnd',
  })
  }
}