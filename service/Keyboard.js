const {Markup} = require('telegraf');


const main_keyboard = Markup.keyboard([['Сегодня','Список','Помощь'],['Сообщить']]).resize();
   
module.exports = main_keyboard;