const knex = require("../dbConfig");

module.exports = {
    async show(req, res) {
        const data = await knex("available_job")
            .select(
                "a.id as availablejob_id",
                "j.id as job_id",
                "a.message",
                "a.created_at",
                "u.name",
                "u.image"
            )
            .from("available_job as a")
            .orderBy('availablejob_id', "desc")
            .leftJoin("user as u", "a.user_id", "u.id")
            .leftJoin('job_position as j','a.id', 'j.id' )

        res.status(200).json({ data: data });
    },
    async createVacancie(req, res) {
        const { idUser, idJob, message } = req.body;
        if (!idUser || !idJob || !message) {
            res.status(400).json({ erro: true, msg: "Envie Corretamente os Dados!!!" });
            return;
        }
        try {
            await knex("available_job").insert({
                user_id: idUser,
                job_position_id: idJob,
                message: message,
            });
            res.status(200).json({ erro: false, msg: "Nova Vaga Cadastrada!" });
        } catch (error) {
            res.status(400).json({ erro: true, msg: error.message });
        }
    },
    async destroy(req, res) {
        const { id } = req.body;
        try {
            const vacancie = await knex("available_job").where({ id });
            await knex("available_job").del().where({ id });
            res.status(200).json({ ok: 1, msg: "Vaga Removida!" });
        } catch (error) {
            res.status(400).json({ ok: 0, msg: "Vaga Não localizada!" });
        }
    },
}