const Vcs = require("../model/Vcs");
const command_keyboard = require('./Keyboard');



class Command{

    start(ctx){
      ctx.replyWithHTML('Начнем работу',command_keyboard);
    }
   
    messErr(ctx){
      ctx.scene.enter('errorScene');
    }
    async today(ctx){
            const vcs = await Vcs.find({}).lean(); 
            const date=new Date;
            const today=this.#fulltommorow(date,0);
            ctx.replyWithHTML(this.#result(today,vcs));
            
        }
    list(ctx){
      ctx.scene.enter('listScene')
    }

    #result=(today,vcs)=>{
      let s=''
      vcs.forEach(element => {
          if (element.date===today){
              s+= (element.date+' '+element.time+'  '+element.room+'  '+element.password+'  '+element.admin+' <b>'+element.place+'</b>'+'\n')
          }
          
      });
      return s||'Нет ВКС \n'
  }

  #nameDay=(i)=>{
    switch(i)
    {
        case 0:  return 'Воскресенье' 
        case 1:  return 'Понедельник' 
        case 2:  return 'Вторник' 
        case 3:  return 'Среда' 
        case 4:  return 'Четверг' 
        case 5:  return 'Пятница' 
        case 6:  return 'Суббота' 
    }
}

  async all(ctx){
    
        const vcs = await Vcs.find({}).sort('year').sort('month').sort('day').sort('time').lean()
     let s=''
     vcs.forEach((element)=>{
         s+= ('<b>'+element.date+'</b>'+' '+element.time+'  '+element.room+'  '+element.password+'  '+element.admin+' <b>'+element.place+'</b>'+'\n')
     })
     ctx.replyWithHTML(s)
     
}
async week(ctx){
        const vcs = await Vcs.find({}); 
        const date=new Date
        const day=date.getDay()
        let res=''
        let numday=0
        for(let i=day;i<7;i++){
            const today=this.#fulltommorow(date,numday)
            numday++
            res+=this.#nameDay(i)+':  \n'+this.#result(today,vcs)+'\n'
        }
      
        ctx.replyWithHTML(res)
        

}

async tommorow(ctx){
        const vcs = await Vcs.find({})    
        const date = new Date
        const tommorow=this.#fulltommorow(date,1)
        ctx.replyWithHTML(this.#result(tommorow,vcs))
        
}
    
  help(ctx){
    ctx.replyWithHTML('<b>Сегодня</b>: вывод ВКС на сегодня\n<b>Список</b>: дополнительный список команд\n<b>Сообщить</b>: указать на неточность в расписании')
  }
  sendMessage(ctx){
    ctx.scene.enter('sendMessageScene');
  }

  #fulltommorow=(date,i)=>{
    if (i!=0){
        date.setDate(date.getDate()+1)
    }
    const dd=(date.getDate())<10?'0'+date.getDate():date.getDate()
    const mm=date.getMonth()+1<10?'0'+(date.getMonth()+1):(date.getMonth()+1)
    const yy=date.getFullYear()
    return dd+'.'+mm+'.'+yy
}

   
}


module.exports = Command;
