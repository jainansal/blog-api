import User from "../models/UserModel.js";

export const getProfile = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id);

        if (!user) {
            res.status(400).json("Couldn't fetch user data.");
        } else {
            const {password, ...info} = user._doc;
            
            res.status(200).json(info);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};