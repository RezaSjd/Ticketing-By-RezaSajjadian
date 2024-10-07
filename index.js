/*

☆.。.:*・°☆.。.:*・°☆.。.:*・°☆.。.:*・°☆
                                                 
⠛⠛⣿⣿⣿⣿⣿⡷⢶⣦⣶⣶⣤⣤⣤⣀⠀⠀⠀
 ⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀⠀
 ⠀⠀⠀⠉⠉⠉⠙⠻⣿⣿⠿⠿⠛⠛⠛⠻⣿⣿⣇⠀
 ⠀⠀⢤⣀⣀⣀⠀⠀⢸⣷⡄⠀⣁⣀⣤⣴⣿⣿⣿⣆
 ⠀⠀⠀⠀⠹⠏⠀⠀⠀⣿⣧⠀⠹⣿⣿⣿⣿⣿⡿⣿
 ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠛⠿⠇⢀⣼⣿⣿⠛⢯⡿⡟
 ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠦⠴⢿⢿⣿⡿⠷⠀⣿⠀
 ⠀⠀⠀⠀⠀⠀⠀⠙⣷⣶⣶⣤⣤⣤⣤⣤⣶⣦⠃⠀
 ⠀⠀⠀⠀⠀⠀⠀⢐⣿⣾⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀
 ⠀⠀⠀⠀⠀⠀⠀⠈⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀
 ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠻⢿⣿⣿⣿⣿⠟⠁  
                    
DISCORD :  https://discord.com/invite/T6dndmYWRw                                          
                                                                       
☆.。.:*・°☆.。.:*・°☆.。.:*・°☆.。.:*・°☆
*/

const { Client, GatewayIntentBits, Partials } = require('discord.js');

// توکن ربات خود را اینجا وارد کنید
const TOKEN = 'توکن-ربات-شما';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel],
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// متغیر برای ذخیره اطلاعات تیکت‌ها
let ticketChannels = new Map();

// دستور برای باز کردن تیکت
client.on('messageCreate', async message => {
  if (message.content === '!newticket') {
    if (ticketChannels.has(message.author.id)) {
      return message.reply('شما در حال حاضر یک تیکت باز دارید.');
    }

    const ticketChannel = await message.guild.channels.create(`ticket-${message.author.username}`, {
      type: 'text',
      permissionOverwrites: [
        {
          id: message.guild.id,
          deny: ['VIEW_CHANNEL'],
        },
        {
          id: message.author.id,
          allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
        },
        {
          id: message.guild.roles.everyone,
          deny: ['VIEW_CHANNEL'],
        },
      ],
    });

    ticketChannels.set(message.author.id, ticketChannel.id);
    message.reply(`تیکت شما با موفقیت ایجاد شد: ${ticketChannel}`);
    ticketChannel.send(`سلام ${message.author}, چطور می‌تونیم کمکت کنیم؟`);
  }

  // دستور برای بستن تیکت
  if (message.content === '!closeticket') {
    const ticketChannelId = ticketChannels.get(message.author.id);

    if (!ticketChannelId) {
      return message.reply('شما تیکت بازی ندارید.');
    }

    const ticketChannel = message.guild.channels.cache.get(ticketChannelId);

    if (ticketChannel) {
      await ticketChannel.delete();
      ticketChannels.delete(message.author.id);
      message.author.send('تیکت شما بسته شد.');
    } else {
      message.reply('خطا در بستن تیکت.');
    }
  }
});

client.login(TOKEN);

/*


☆.。.:*・°☆.。.:*・°☆.。.:*・°☆.。.:*・°☆
                                                 
⠛⠛⣿⣿⣿⣿⣿⡷⢶⣦⣶⣶⣤⣤⣤⣀⠀⠀⠀
 ⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀⠀
 ⠀⠀⠀⠉⠉⠉⠙⠻⣿⣿⠿⠿⠛⠛⠛⠻⣿⣿⣇⠀
 ⠀⠀⢤⣀⣀⣀⠀⠀⢸⣷⡄⠀⣁⣀⣤⣴⣿⣿⣿⣆
 ⠀⠀⠀⠀⠹⠏⠀⠀⠀⣿⣧⠀⠹⣿⣿⣿⣿⣿⡿⣿
 ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠛⠿⠇⢀⣼⣿⣿⠛⢯⡿⡟
 ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠦⠴⢿⢿⣿⡿⠷⠀⣿⠀
 ⠀⠀⠀⠀⠀⠀⠀⠙⣷⣶⣶⣤⣤⣤⣤⣤⣶⣦⠃⠀
 ⠀⠀⠀⠀⠀⠀⠀⢐⣿⣾⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀
 ⠀⠀⠀⠀⠀⠀⠀⠈⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀
 ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠻⢿⣿⣿⣿⣿⠟⠁  
                    
DISCORD :  https://discord.com/invite/T6dndmYWRw                                          
                                                                       
☆.。.:*・°☆.。.:*・°☆.。.:*・°☆.。.:*・°☆
*/
