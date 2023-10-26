const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const { token } = req.params;
    if (!token) {
        return res.status(200).send({ erro: true, aut: true, msg: "Falha na autenticação" })
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_KEY);
        req.user_id = decode.user_id;
        next();
    } catch (error) {
        return res.status(200).send({ erro: true, aut: true, msg: "Falha na autenticação" })
    }
}