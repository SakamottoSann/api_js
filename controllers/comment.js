const knex = require("../dbConfig");

module.exports = {
    async createComment(req, res) {
        const { idUser, idPublication, comment } = req.body;

        if (!idUser || !idPublication || !comment) {
            res.status(400).json({ erro: true, msg: "Envie Corretamente os Dados!!!" });
            return;
        }
        try {
            await knex("comment").insert({
                user_id: idUser,
                publication_id: idPublication,
                comment,
            });
            res.status(200).json({ erro: false, msg: "Comentario Salvo" });
        } catch (error) {
            res.status(400).json({ erro: true, msg: error.message });
        }
    },
}