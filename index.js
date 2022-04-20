const {session, Scenes:{Stage}}=require("telegraf");
const mongoose = require('mongoose');
const check = require('./utils/check');
const Command = require('./service/Command');
const listScene = require('./service/Scenes');
const errorScene = require('./service/ErrorScene');
const sendMessageScene = require('./service/SendMessageScene');
const bot = require('./service/Bot');
require("dotenv").config();

async function start(){
  try {
      await mongoose.connect(process.env.MONGODB_URI,
      {
          useNewUrlParser:true
      })
  } catch (error) {
      console.log(error);
  }
}

start();

const commands = [
  'today',
  'start',
  'list',
  'tommorow',
  'week',
  'all',
  'messErr',
  'sendMessage',
  'help'
]
const hears = [
  {
    value:['Сегодня','сегодня','today','Today'],
    action:'today'
  },{
    value:['Помощь','помощь','help','Help'],
    action:'help'
  },{
    value:['Список','список','list','List'],
    action:'list'
  },{
    value:['Завтра','завтра','tommorow','Tommorow'],
    action:'tommorow'
  },{
    value:['Неделя','неделя','week','week'],
    action:'week'
  },{
    value:['Все','все','All','all'],
    action:'all'
  }
  ,{
    value:['Сообщить','сообщить','message','Message'],
    action:'messErr'
  }
]
//const bot = new Telegraf(process.env.BOT_TOKEN);
const action = new Command;
const stage = new Stage([listScene,errorScene,sendMessageScene]);
bot.use(session());
bot.use(stage.middleware());
commands.forEach(command => {
  bot.command(command,async(ctx)=>{
    if(await check(ctx.message.from.id)){
    action[command](ctx);
  }
  else{
    ctx.replyWithHTML(`У вас не достаточно прав обратитесь в управление информации и сообщите номер:<b> ${ctx.message.from.id}</b>`);
  }
});
});
hears.forEach(hear => {
  bot.hears(hear.value,async(ctx)=>{
    if(await check(ctx.message.from.id))
    {
      action[hear.action](ctx);
    }
    else
    {
      ctx.replyWithHTML(`У вас не достаточно прав обратитесь в управление информации и сообщите номер:<b> ${ctx.message.from.id}</b>`);
    }
  })});
bot.launch();
