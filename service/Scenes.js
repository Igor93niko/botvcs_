const {Markup, Scenes} = require('telegraf');
const Command = require('./Command');

const action = new Command;
const listScene = new Scenes.BaseScene('listScene')
listScene.enter(async (ctx)=>{
  const command_keyboard = ()=> Markup.inlineKeyboard([[Markup.button.callback('Завтра','tommorow'),Markup.button.callback('Неделя','week'),Markup.button.callback('Все','all')],[Markup.button.callback('Назад','back')]]);
  ctx.reply('Выберите команду из предложенного списка',command_keyboard());
})
  
listScene.action('tommorow',async(ctx)=>{
  await action.tommorow(ctx);
  ctx.scene.leave();
});
listScene.action('all',async(ctx) =>{
  await action.all(ctx);
  ctx.scene.leave();
});
listScene.action('week',async(ctx)=>{
  await action.week(ctx);
  ctx.scene.leave();
});
listScene.action('back',ctx =>{
  ctx.reply('Вышли!')
  ctx.scene.leave();
});
listScene.on('text',ctx=>ctx.scene.leave());
module.exports = listScene;


