const jwt = require("jsonwebtoken")

const tokenVerif = (req, res, next) => {
    const { authorization } = req.headers

    if(authorization === undefined || authorization === null){
        return res.status(400).json({
            messasge: "No bearer token provided"
        })
    }

    const token = authorization.split(" ")[1]

    if(token === undefined){
        return res.status(400).json({
            message: "Bearer token was not prefixed with \"Bearer\" keyword"
        })
    }


    let result

    try{
        result = jwt.verify(token, process.env.AUTH_TOKEN)
    }catch(err){
        return res.status(400).json({
            message: "Token mismatch or expired"
        })
    }

    req.user = result

    next()
}

module.exports = tokenVerif