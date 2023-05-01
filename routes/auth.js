import express from 'express';
import bcrypt from 'bcryptjs'
import User from '../models/user.js'
import { registerValidation, loginValidation } from '../validations/validation.js'

const authRoute = express.Router();

authRoute.post('/register', async (req, res) => {
    const error = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const emailExists = await User.findOne({email: req.body.email})
    if (emailExists) return res.status(400).send("Email already exists")

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        date: Date.now
    });
    try{
        await user.save();
        res.send("Account created successfully")
    }catch(err){
        res.status(400).send(err);
    }
});

authRoute.post('/login', async (req, res) => {
    const error = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const user = await User.findOne({email: req.body.email})
    if (!user) return res.status(400).send("Email is incorrect")

    const isValidPass = await bcrypt.compare(req.body.password, user.password)

    if (!isValidPass) return res.status(400).send("Password is incorrect")

    res.send("Verification sucessful")

    try{
        const savedUser = await user.save();
        res.send(savedUser)
    }catch(err){
        res.status(400).send(err);
    }
});

export default authRoute;