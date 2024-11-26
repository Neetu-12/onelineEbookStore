const jwt = require("jsonwebtoken");

let verifyToken = (req, res, next) => {
    let token = req.headers.cookie.split("=")[1];
    // console.log(("Neetu,Sah,Pravenn").split(","));
    if (token) {
        // console.log(token);
        let verify = jwt.verify(token, 'secrete_Key');
        if (!verify) {
            res.status(404).send("Invalid token.")
        }
        else {
            // console.log(req.body.meta, verify, "veri...");  // getting database datas.          
            req.body.meta = verify;
            next();
        }
    }
    else {
        res.send("login first")
    }
}

module.exports = verifyToken;