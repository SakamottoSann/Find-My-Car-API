const bcrypt = require("bcrypt");
const knex = require("../../dbConfig");

module.exports = {
  async show(req, res) {
    const data = await knex("users").select('*')
    res.status(200).json({ Users: data });
  },

  async createUser(req, res) {
    const { first_name, last_name, cpf, birth, email, number_phone, login, password, status, validity, access_level_id } = req.body;
    if (!first_name || !last_name || !cpf || !birth || !number_phone || !login || !password || !status || !validity || !access_level_id) {
      res.status(200).json({ erro: true, msg: "Evie corretamente os dados do cliente!" });
      return;
    }
    try {
      const data = await knex("users").where({ cpf });
      if (data.length) {
        res.status(200).json({ erro: true, msg: "Usuario já cadastrado!" });
        return;
      }
    } catch (error) {
      res.status(200).json({ erro: true, msg: error.message });
    }

    const hash = bcrypt.hashSync(password, 10);

    try {
      await knex("users").insert({
        first_name, 
        last_name, 
        cpf, 
        birth, 
        email, 
        number_phone, 
        login, 
        password: hash, 
        status, 
        validity,
        access_level_id
      });
      res.status(200).json({ erro: false, msg: "Usuario cadastrado com sucesso!" });
    } catch (error) {
      res.status(200).json({ erro: true, msg: error.message });
    }
  },

  async update(req, res) {
    const { id, password, newpassword } = req.body;
    if (!password || !newpassword) {
      res.status(400).json({ erro: true, msg: "Enviar Senha." });
      return;
    }
    try {

      const usuario = await knex("user").where({ id });
      if (bcrypt.compareSync(password, usuario[0].password)) {
        const hash = bcrypt.hashSync(newpassword, 10);
        await knex("user").update("password", hash).where({ id });
        res.status(200).json({ erro: false, msg: "Senha Alterada." });
      } else {
        res.status(200).json({ erro: true, msg: "Senha Incorreta" });
      }
    } catch (error) {
      res.status(200).json({ erro: true, msg: error.message });
    }
  },

  async destroy(req, res) {
    const { id, password } = req.body;
    if (!password) {
      res.status(400).json({ erro: "Enviar Senha." });
      return;
    }
    try {
      const usuario = await knex("user").where({ id });
      if (bcrypt.compareSync(password, usuario[0].password)) {
        await knex("user").del().where({ id });
        res.status(200).json({ erro: false, msg: "Usuario Deletado" });
      } else {
        res.status(400).json({ erro: true, msg: "Senha incorreta" });
      }
    } catch (error) {
      res.status(400).json({ erro: true, msg: "Usuario Não Encontrado!" });
    }
  },

};
