const jwt = require('jsonwebtoken')

module.exports = {
    signAcessToken: (userId)=> {

        let payload = {
            userId: userId
        }

        let options = {
            expiresIn: '365d'
        }

        const token = jwt.sign(
            payload,
            process.env.TOKEN_KEY,
            options
        );

        console.log('Token ', token)

        return token
    },

    verifyAccessToken: (token)=>{
        let payload = jwt.verify(token, process.env.TOKEN_KEY)
        return payload
    }
}