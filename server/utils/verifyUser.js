const jwt = require('jsonwebtoken');

const verifyToken = async(req, res, next) => {
    const token = req.headers.access_token || req.headers.authorization;
    console.log(token);
    if (!token){
        return res.status(401).json({message: 'Unauthorized: Person!', alert: false});
    }
    await jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err){
            return res.status(401).json({message: 'Forbidden: Person!', alert: false});
        }
        req.user = user;
        next();
    });
}

module.exports = {verifyToken};