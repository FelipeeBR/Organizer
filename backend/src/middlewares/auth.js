const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const authToken = req.headers['authorization'];
    if(authToken != undefined) {
        const bearer = authToken.split(' ');
        var token = bearer[1];
        jwt.verify(token, process.env.JWT_TOKEN, (error, data) => {
            if(error) {
                res.status(401);
                res.json({ error: "unauthorized"});
            }else {
                req.token = token;
                req.loggedUser = { id: data.id, email: data.email };
                next();
            }
        });
    }else{
        res.status(401);
        res.json({ error: "unauthorized"});
    }
}

function signToken(payload, secret, options) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, options, (error, token) => {
            if (error) reject(error);
            else resolve(token);
        });
    });
}

module.exports = {
    auth,
    signToken,
};
