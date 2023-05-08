const {
  SlashCommandBuilder
} = require('discord.js')
const stuff = require('@thatbadname/time-string-converter')
const fs = require('fs')
const { userJson } = require('../../constants')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('temprole')
    .setDescription('Add/remove a role from a user temporarily')
    .addSubcommand(option =>
      option.setName('create')
      .setDescription('Make one')
      .addRoleOption(option =>
        option.setName('role')
        .setDescription('The role to add/remove')
        .setRequired(true)
      )
      .addUserOption(option =>
        option.setName('member')
        .setDescription('The member')
        .setRequired(true)
      )
      .addStringOption(option =>
        option.setName('type')
        .setDescription('The type of temprole')
        .setRequired(true)
        .setChoices({
          name: 'Grant temporarily',
          value: '0'
        }, {
          name: 'Remove temporarily',
          value: '1'
        })
      )
      .addStringOption(option =>
        option.setName('duration')
        .setDescription('How long to do it for')
        .setMinLength(1)
        .setMaxLength(10)
        .setRequired(true)
      )
    )
    .addSubcommand(option =>
      option.setName('list')
      .setDescription('List the temproles for a user')
      .addUserOption(option =>
        option.setName('member')
        .setDescription('The member')
        .setRequired(true)
      )
    )
    .addSubcommand(option =>
      option.setName('delete')
      .setDescription('Delete a temprole')
      .addUserOption(option =>
        option.setName('member')
        .setDescription('The member')
        .setRequired(true)
      )
      .addRoleOption(option =>
        option.setName('role')
        .setDescription('The role to add/remove')
        .setRequired(true)
      )
    ),

  async execute(interaction, client) {
    if (!interaction.member.roles.cache.has('1051191671494291547')) return interaction.reply({
      content: `if you were staff i might consider letting you do this`
    })
    const command = interaction.options.getSubcommand()
    if (command === 'create') {
      const role = interaction.options.getRole('role')
      const member = interaction.options.getMember('member')
      const type = interaction.options.getString('type')
      const duration = stuff.convertStringToSeconds(interaction.options.getString('duration'))
      const expiresDate = new Date()
      expiresDate.setUTCSeconds(expiresDate.getUTCSeconds() + duration)
      let expires = Math.round(expiresDate.getTime() / 1000)

      if (!fs.existsSync(`./database/users/${member.id}`)) {
        let user = {...userJson}
        user.id = member.id
        fs.writeFileSync(`./database/users/${member.id}`, JSON.stringify(user))
      }
      let json = {
        roleId: role.id,
        type: Number(type),
        expires: expires,
        guildId: interaction.guild.id
      }
      let user = JSON.parse(fs.readFileSync(`./database/users/${member.id}`, 'ascii'))
      if (user.temproles.find(r=>r.roleId===role.id)) return interaction.reply({content: `There is already a temprole with this user using that role`})
      user.temproles.push(json)
      fs.writeFileSync(`./database/users/${member.id}`, JSON.stringify(user))

      if (type==0) await member.roles.add(role.id, "Temproles").catch(() => {})
      else await member.roles.remove(role.id, "Temproles").catch(() => {})
      interaction.reply({content: `${member} ${Number(type) === 0 ? 'has' : 'no longer has'} ${role} until <t:${expires}>, <t:${expires}:R>`, ephemeral: true})
    } else if (command === 'delete') {
      const member = interaction.options.getMember('member')
      if (!fs.existsSync(`./database/users/${member.id}`)) return interaction.reply({content: `This user has no temproles`})
      let user = JSON.parse(fs.readFileSync(`./database/users/${member.id}`, 'ascii'))
      const removeById = (arr, id) => {
        const requiredIndex = arr.findIndex(el => {
           return el.roleId === id;
        });
        if(requiredIndex === -1){
           return false;
        };
        return !!arr.splice(requiredIndex, 1);
     };
     const role = interaction.options.getRole('role')
     const info = user.temproles.find(r=>r.roleId===role.id)
     if (!info) return interaction.reply({content: `Doesnt exist lmao`})

     removeById(user.temproles, role.id)
     fs.writeFileSync(`./database/users/${member.id}`, JSON.stringify(user))
     interaction.reply({content: `Deleted temprole (${role}) with ${member}. I have ${info.type === 0 ? 'removed' : 'added back'} the role`})
     if (info.type===1) await member.roles.add(role.id, "Temproles").catch(() => {})
      else await member.roles.remove(role.id, "Temproles").catch(() => {})
    } else if (command === 'list') {
      const member = interaction.options.getMember('member')
      if (!fs.existsSync(`./database/users/${member.id}`)) return interaction.reply({content: `Temproles for ${member}:`, ephemeral: true})
      interaction.reply({content:
        `Temproles for ${member}:\n`+
        `${JSON.parse(fs.readFileSync(`./database/users/${member.id}`, 'ascii')).temproles.filter(r=>r.guildId===interaction.guild.id).map(r=>`<@&${r.roleId}> [${r.type==0?'AddTemp':'RemoveTemp'}] <t:${r.expires}>, <t:${r.expires}:R>`).join('\n')}`
        , ephemeral: true})
    }
  }
}