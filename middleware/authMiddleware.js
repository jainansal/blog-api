import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.cookies.token;

        if (!token) {
            return res.status(403).json('Access denied');
        }

        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length).trimLeft();
        }

        if (!token) {
            return res.status(403).json('Access denied');
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json("Invalid token");
            }
            req.user = user;
            next();
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}