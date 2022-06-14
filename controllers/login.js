const knex = require("../dbConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async index(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Enviar e-mail e senha" });
      return;
    }
    try {
      const data = await knex("user").where({ email });
      if (data.length == 0) {
        res.status(200).json({ erro: "true", msg: "Email não cadastrado" });
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
          user: {
            token,
            user_id: data[0].id,
            jobpositions_id: data[0].jobpositions_id,
            name: data[0].name,
            image: data[0].image,
            email: data[0].email,
            fone: data[0].fone,
            ctps: data[0].ctps,
            score: data[0].score,
            created_at: data[0].created_at,
          }
        });
      } else {
        res.status(400).json({ error: "Senha incorreta" });
      }
    } catch (error) {
      res.status(200).json({ erro: error.message });
    }
  }
};
