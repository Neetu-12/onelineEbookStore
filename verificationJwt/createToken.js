const jwt = require("jsonwebtoken")

var createToken = (data) => {
    // return jwt.sign(data,"secrete_Key")
    token = jwt.sign(data, "secrete_Key")
    // console.log(token, "...jwtfile");//
    return token;
}


module.exports = { createToken }
