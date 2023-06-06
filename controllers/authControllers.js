import bcrypt from 'bcrypt';
import generateToken from '../config/generateToken.js';
import User from '../models/UserModel.js';

// Login
export const authLogin = async (req, res) => {
    try {
        const username = req.body.username;
        const pw = req.body.password;

        const user = await User.findOne({ username: username });
        if (!user) {
            res.status(400).json({ msg: "Username doesn't exist." });
            return;
        }

        const passMatch = await bcrypt.compare(pw, user.password);

        if (!passMatch) {
            res.status(400).json({ msg: 'Wrong password.' });
            return;
        }

        const token = generateToken(user._id);

        const { password, ...info } = user._doc;

        res.status(200).json({ ...info, token });

    } catch (err) {
        res.status(500).json(err);
    }
};

// Register
export const authRegister = async (req, res) => {
    try {
        const userExists = await User.findOne({ username: req.body.username });

        if (userExists) {
            res.status(400).json({ msg: 'User already exists.' });
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            password: passwordHash
        });

        const savedUser = await newUser.save();

        const token = generateToken(savedUser._id);
        const { password, ...info } = savedUser._doc;

        res.status(200).json({ ...info, token });
    } catch (err) {
        res.status(500).json(err);
    }
};