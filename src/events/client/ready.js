const {
  ActivityType
} = require("discord.js")
const fs = require('fs')

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

    const deleteClientTempFilesLoop = async () => {
      const removeById = (arr, id) => {
        const requiredIndex = arr.findIndex(el => {
          return el.roleId === id;
        });
        if (requiredIndex === -1) {
          return false;
        };
        return !!arr.splice(requiredIndex, 1);
      };
      for (const user of fs.readdirSync(`./database/users`, 'ascii')) {
        let usr = JSON.parse(fs.readFileSync(`./database/users/${user}`, 'ascii'))
        let temproles = usr.temproles
        for (const temprole of temproles) {
          if (temprole.expires <= Math.round(new Date().getTime()/1000)) {
            removeById(temproles, temprole.roleId)
            const guild=await client.guilds.cache.get(temprole.guildId)
            const member = await guild.members.fetch(usr.id)
            if (temprole.type === 1) await member.roles.add(temprole.roleId, "Temproles").catch(() => {})
            else await member.roles.remove(temprole.roleId, "Temproles").catch(() => {})
          }
        }
        fs.writeFileSync(`./database/users/${user}`, JSON.stringify(usr))
      }
      setTimeout(deleteClientTempFilesLoop, 5 * 1000)
    }
    deleteClientTempFilesLoop()
  }
}