const {Scenes} = require('telegraf');
const bot = require('./Bot');
const errorScene = new Scenes.BaseScene('errorScene')
errorScene.enter(ctx=>{
  ctx.reply('Введите информацию или отправьте файл');
})
  
errorScene.on('text',ctx=>{
  bot.telegram.sendMessage('-1001692759395',ctx.message.text);
  ctx.scene.leave();
});
module.exports = errorScene;