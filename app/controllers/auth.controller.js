const User = require('../models/user')
const express = require('express')
const auth = express.Router()
const { signAcessToken } = require('../utils/jwt')

auth.post('/login', async(req, res, next)=>{
    try{
        
        const { email, password } = req.body
        if(!email || !password) throw new Error('Bad Request!!')

        // check if user exists
        let user = await User.findOne({ email: email.trim() }).exec()
        if(!user) throw Error('User does not exists!!')

        if(user.password != password.trim() ) throw new Error('invalid username/ password')

        res.json({
            email: user.email,
            accessToken: signAcessToken(user._id),
            message: 'success'
        })

    } catch(err){
        next(err)
    }
})


auth.post('/register', async(req, res, next)=>{
    try{

        const { email, password } = req.body
        if(!email || !password) throw new Error('Bad Request!!')

        // if the user exists
        let user = await User.findOne({ email: email.trim() }).exec()
        if(user) throw Error('User already exists!!')

        let newUser = new User({ email: email.trim() , password: password.trim() })

        await newUser.save()

        res.json({
            email: newUser.email,
            accessToken: signAcessToken(newUser._id),
            message: 'success',
        })

    } catch(err){
        next(err)
    }
})

module.exports = auth