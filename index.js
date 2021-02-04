const TelegramBot = require('node-telegram-bot-api');
const pepes = require('rare-pepe-api');

require('dotenv').config();

const token = process.env.TELEGRAM_TOKEN;
let bot;

if (process.env.NODE_ENV === 'production') {
  bot = new TelegramBot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
} else {
  bot = new TelegramBot(token, { polling: true });
}

// Matches "/random"
bot.onText(/\/random/, (msg) => {
  const chatId = msg.chat.id;
  const random = pepes.getRandom();
  bot.sendMessage(chatId, random.img_url, { parse_mode: 'HTML' });
});