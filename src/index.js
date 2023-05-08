const { Client, GatewayIntentBits, Partials } = require("discord.js")
const Handler = require("@thatbadname/discord-command-handler")
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ],
  partials: [
    Partials.Channel,
    Partials.GuildMember,
    Partials.Message,
    Partials.Reaction,
    Partials.ThreadMember,
    Partials.User
  ]
})

Handler.main.DiscordCommandHandler(client,  {
  mainDir: __dirname,
  configFile: '../database/client/config.json',
  eventsDir: '/events',
  commandsDir: '/commands',
  components: {
    main: '/components',
    buttons: '/buttons',
    selectMenus: '/selectMenus'
  },
  builtIn: {
    automaticRepair: false,
    helpCommand: false
  },
  allowPrefixCommands: true,
  prefix: '>>',
  ownerIds: ['804265795835265034']
})