const knex = require("../dbConfig");

module.exports = {
    async show(req, res) {
        const data = await knex("warning")
            .select(
                "w.id as idwarning",
                "w.message",
                "w.created_at",
                "u.name",
                "u.image"
            )
            .from("warning as w")
            .orderBy('idwarning', "desc")
            .leftJoin("user as u", "w.user_id", "u.id");

        res.status(200).json({ data: data });
    },
    async createwarning(req, res) {
        const { id, message } = req.body;
        if (!id || !message) {
            res.status(400).json({ erro: true, msg: "Envie Corretamente os Dados!!!" });
            return;
        }
        try {
            await knex("warning").insert({
                user_id: id,
                message: message,
            });
            res.status(200).json({ erro: false, msg: "Seu Aviso foi Salvo!" });
        } catch (error) {
            res.status(400).json({ erro: true, msg: error.message });
        }
    },
    async destroy(req, res) {
        const { id } = req.body;
        try {
            const warning = await knex("warning").where({ id });
                await knex("warning").del().where({ id });
                res.status(200).json({ ok: 1, msg: "Aviso Deletado" });
        } catch (error) {
            res.status(400).json({ ok: 0, msg: "Aviso Não Encontrado!" });
        }
    },
}