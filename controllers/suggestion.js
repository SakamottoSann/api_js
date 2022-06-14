const knex = require("../dbConfig");

module.exports = {
    async show(req, res) {
        const data = await knex("suggestion")
            .select(
                "s.id as idsuggestion",
                "s.suggestion",
                "s.created_at",
                "u.name",
                "u.image"
            )
            .from("suggestion as s")
            .orderBy('idsuggestion', "desc")
            .leftJoin("user as u", "s.user_id", "u.id");

        res.status(200).json({ data: data });
    },
    async createSuggestion(req, res) {
        const { id, suggestion } = req.body;

        if (!id || !suggestion) {
            res.status(400).json({ erro: true, msg: "Envie Corretamente os Dados!!!" });
            return;
        }
        try {
            await knex("suggestion").insert({
                user_id: id,
                suggestion: suggestion,
            });
            res.status(200).json({ erro: false, msg: "Sua Sugestão foi Salva!" });
        } catch (error) {
            res.status(400).json({ erro: true, msg: error.message });
        }
    },
    async destroy(req, res) {
        const { id } = req.body;
        try {
            const suggestion = await knex("suggestion").where({ id });
                await knex("suggestion").del().where({ id });
                res.status(200).json({ ok: 1, msg: "Sugestão Deletada" });
        } catch (error) {
            res.status(400).json({ ok: 0, msg: "Sugestão Não Encontrada!" });
        }
    },
}