const {Scenes} = require('telegraf');
const bot = require('./Bot');
const main_keyboard = require('./Keyboard');
const sendMessageScene = new Scenes.BaseScene('sendMessageScene')
sendMessageScene.enter(ctx=>{
  ctx.reply('Введите id');
})
  
sendMessageScene.on('text',async (ctx)=>{
  await bot.telegram.sendMessage(ctx.message.text.trim().toString(),'Доступ предоставлен', main_keyboard);
  ctx.scene.leave();
});

module.exports = sendMessageScene;