const knex = require("../dbConfig");
const bcrypt = require("bcrypt");

module.exports = {
  async show(req, res) {
    const data = await knex("user").select(
      "id",
      "email",
      "name",
      "created_at",
      "updated_at"
    );
    res.status(200).json({ data: data });
  },

  async createUser(req, res) {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      res.status(400).json({ error: "Enviar dados" });
      return;
    }
    try {
      const data = await knex("user").where({ email });
      if (data.length) {
        res.status(400).json({ error: "Email já cadastrado." });
        return;
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }

    const hash = bcrypt.hashSync(password, 10);

    try {
      const newUser = await knex("user").insert({
        email,
        name,
        password: hash,
      });
      res.status(200).json({ data: newUser[0] });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },



};
