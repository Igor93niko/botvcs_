const Users = require("../model/Users");

module.exports = async function check(id){
    let flag=false;    
    const user = await Users.findOne({id});
    if (user!==null){flag=true};
    return flag;
};