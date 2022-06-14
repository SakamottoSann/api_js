const bcrypt = require("bcrypt");
const knex = require("../dbConfig");

module.exports = {
  async show(req, res) {
    const data = await knex("user").select(
      "id",
      "job_position_id",
      "name",
      "image",
      "email",
      "fone",
      "ctps",
      "score",
      "created_at",
      "updated_at"
    );
    res.status(200).json({ Users: data });
  },

  async createUser(req, res) {
    const { name, image, email, fone, ctps, password, jobposition_id } = req.body;
    if (!name || !email || !fone || !ctps || !password || !jobposition_id) {
      res.status(400).json({ error: "Enviar dados do colaborador!" });
      return;
    }
    try {
      const data = await knex("user").where({ ctps });
      if (data.length) {
        res.status(400).json({ error: "Colaborador Já Cadastrado!" });
        return;
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }

    const hash = bcrypt.hashSync(password, 10);

    try {
      const newUser = await knex("user").insert({
        name,
        image,
        email,
        fone,
        ctps,
        password: hash,
        job_position_id: jobposition_id
      });
      res.status(200).json({ data: newUser[0], msg: "Colaborador Cadastrado Com Sucesso!" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    const { id, password, newpassword } = req.body;
    if (!password || !newpassword) {
      res.status(400).json({ erro: "Enviar Senha." });
      return;
    }
    try {

      const usuario = await knex("user").where({ id });
      // console.log(usuario[0].senha)
      if (bcrypt.compareSync(password, usuario[0].password)) {
        const hash = bcrypt.hashSync(newpassword, 10);
        await knex("user").update("password", hash).where({ id });
        res.status(200).json({ ok: 1, msg: "Senha alterada." });
      } else {
        res.status(400).json({ erro: "Senha incorreta" });
      }
    } catch (error) {
      res.status.json({ ok: 0, msg: error.message });
    }
  },

  async upJobPosition(req, res) {
    const { id, jobposition_id } = req.body;
    try {
      const usuario = await knex("user").update("jobposition_id", jobposition_id).where({ id });
      res.status(200).json({ erro: false, msg: "Cargo Atualizado Com Sucesso!!!" });
    } catch (error) {
      res.status(200).json({ erro: "true", msg: error.message });
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
        res.status(200).json({ ok: 1, msg: "Usuario Deletado" });
      } else {
        res.status(400).json({ erro: "Senha incorreta" });
      }
    } catch (error) {
      res.status(400).json({ ok: 0, msg: "Usuario Não Encontrado!" });
    }
  },

};
