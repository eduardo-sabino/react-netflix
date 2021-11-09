const jwt = require('jsonwebtoken')

function verify(req, res, next){
    const authHearder = req.headers.token
    if (authHearder) {
        const token = authHearder.split(' ')[1]
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) res.status(403).json("Token is not valid!");
            req.user = user;
            next();
          });
    } else {
        res.status(401).json('You are not authenticated')
    }
}

module.exports = verify