const jwt = require("jsonwebtoken")


function auth(req, res, next) {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({ errorMessage: 'Unautharized' });
        }
        
        const verified = jwt.verify(token,process.env.JWT_KEY)
        req.user = verified.user;
        next();
    } catch (e) {
        console.log(e)
        res.status(401).json({ errorMessage: 'Unautharized' })
    }
}

module.exports = auth;