const knex = require("../../dbConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async index(req, res) {
    const { login, pass, pushToken } = req.body;
    if (!login || !pass) {
      res.status(200).json({ erro: true, msg: "Enviar Login e Senha!" });
      return;
    }
    try {

      const data = await knex("user").where({ login }).select(
        "u.id",
        "a.level",
        "u.name",
        "u.image",
        "u.email",
        "u.status",
        "u.pushToken",
        "u.created_at",
        "u.updated_at"
      )
        .from("user as u")
        .leftJoin("access_level as a", "j.access_level_id", "a.id")

      if (data.length == 0) {
        res.status(200).json({ erro: true, msg: "Colaborador Não Cadastrado" });
        return;
      }

      if (pushToken) {
        await knex("user").update({ pushToken: String(pushToken) }).where({ id: data[0].id })
      }

      if (data[0].status === 0) {
        res.status(200).json({ erro: true, status: true, msg: "Usuario Inativo!" })
        return;
      }
      if (bcrypt.compareSync(password, data[0].password)) {
        const token = jwt.sign({
          user_id: data[0].id,
          user_name: data[0].name
        },
          process.env.JWT_KEY,
          { expiresIn: "3h" }
        )
        res.status(200).json({
          erro: false,
          data: {
            token,
            user_id: data[0].id,
            jobpositions_id: data[0].jobpositions_id,
            position: data[0].position,
            accesslevel: data[0].level,
            name: data[0].name,
            location: data[0].location,
            image: data[0].image,
            email: data[0].email,
            fone: data[0].fone,
            ctps: data[0].ctps,
            score: data[0].score,
            created_at: data[0].created_at,
          }
        });
      } else {
        res.status(200).json({ erro: true, msg: "Senha incorreta" });
      }
    } catch (error) {
      res.status(200).json({ erro: true, msg: error.message });
    }
  }
};