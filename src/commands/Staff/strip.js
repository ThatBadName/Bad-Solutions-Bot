const { SlashCommandBuilder } = require('discord.js')
const fs = require('fs')
const { userJson } = require('../../constants')

module.exports = {
  data: new SlashCommandBuilder()
  .setName('strip')
  .setDescription('Strip all your roles or add them back')
  .addUserOption(option =>
    option.setName('member')
    .setDescription('The member to strip')  
  ),

  async execute(interaction, client) {
    let member = interaction.options.getMember('member') || interaction.member
    if (!fs.existsSync(`./database/users/${member.id}`)) {
      let user = {...userJson}
      user.id = member.id
      fs.writeFileSync(`./database/users/${member.id}`, JSON.stringify(user))
    }
    let user = JSON.parse(fs.readFileSync(`./database/users/${member.id}`, 'ascii'))
    if (user.strip.active) {
      if (!interaction.member.roles.cache.has('1051191671494291547')) {member=interaction.member; user = JSON.parse(fs.readFileSync(`./database/users/${member.id}`, 'ascii'))}
      await member.roles.add(user.strip.roles, "User unstripped")
      user.strip.active = false
      user.strip.roles = []
      fs.writeFileSync(`./database/users/${member.id}`, JSON.stringify(user))
      
      return interaction.reply({content: '<@' + member + '> has been unstripped', ephemeral: true})
    } else {
      if (!interaction.member.roles.cache.has('1051191671494291547')) return interaction.reply({
        content: `if you were staff i might consider letting you do this`
      })
      const me = await interaction.guild.members.fetchMe({ force: false, cache: true })
      const roleIds = member.roles.cache.filter(role => role.id !== interaction.guild.roles.everyone.id && !role.managed && me.roles.highest.position > role.position).map(role => role.id)
      user.strip.active = true
      user.strip.roles = roleIds
      fs.writeFileSync(`./database/users/${member.id}`, JSON.stringify(user))
      await member.roles.remove(roleIds, "User stripped")
      return interaction.reply({content: '<@' + member + '> has been stripped', ephemeral: true})
    }
  }
}