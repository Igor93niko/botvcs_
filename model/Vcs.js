const {Schema, model}=require('mongoose');
const schema=new Schema({
    date:{
        type: String,
        
    },
    time:{
        type: String,
        
    },
    room:{
        type:String
    },
    password:{
        type:String
    },
    admin:{
        type:String
    },
    place:{
        type:String
    }
})

module.exports=model('Vcs',schema);