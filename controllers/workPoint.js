const knex = require("../dbConfig");

module.exports = {
    async show(req, res) {
        const data = await knex("work_point")
            .select(
                "w.id as idPoint",
                "w.workpoint",
                "w.created_at",
                "u.name",
            )
            .from("work_point as w")
            .orderBy('idPoint', "desc")
            .leftJoin("user as u", "w.user_id", "u.id");

        res.status(200).json({ data: data });
    },
    async createPoint(req, res) {
        const { idUser, workpoint } = req.body;
        if (!idUser || workpoint) {
            res.status(400).json({ erro: true, msg: "Envie Corretamente os Dados!!!" });
            return;
        }
        try {
            await knex("work_point").insert({
                user_id: idUser,
                workpoint
            });
            res.status(200).json({ erro: false, msg: "Seu Ponto foi Salvo!" });
        } catch (error) {
            res.status(400).json({ erro: true, msg: error.message });
        }
    }
}