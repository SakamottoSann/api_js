const knex = require("../dbConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async index(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Enviar e-mail e senha"});
      return;
    }
    try {
      const data = await knex("user").where({ email });
      if (data.length == 0) {
        res.status(200).json({ erro: "true", msg: "Email não cadastrado"});
        return;
      }
      if (bcrypt.compareSync(password, data[0].password)) {
        const token = jwt.sign(
          {
            user_id: data[0].id,
            name: data[0].name,
          },
          process.env.JWT_KEY,
          { expiresIn: "10h" }
        );
        res.status(200).json({ token, 
          user: {
            name: data[0].name, 
            id: data[0].idUser,
        } 
        });
      } else {
        res.status(400).json({ error: "Senha incorreta" });
      }
    } catch (error) {
      res.status(200).json({ erro: error.message});
    }
  }
};
