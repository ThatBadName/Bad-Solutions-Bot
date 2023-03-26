async function selfRoles(client, interaction) {
  const roleId = interaction.customId.split('-')[1]

  if (!interaction.member.roles.cache.has(roleId)) {
    interaction.member.roles.add(roleId)

    interaction.reply({
      content: `✅ Added <@&${roleId}>`,
      ephemeral: true
    })

  } else {
    interaction.member.roles.remove(roleId)

    interaction.reply({
      content: `✅ Removed <@&${roleId}>`,
      ephemeral: true
    })
  }
}

module.exports = selfRoles