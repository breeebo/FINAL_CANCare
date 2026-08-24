// controllers/authController.js
exports.checkSession = (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ loggedIn: false });
    }
    res.json({ loggedIn: true, userId: req.session.userId });
};