const knex = require("../dbConfig");

module.exports = {

    async show(req, res) {
        const data = await knex("job_positions").select(
            "id",
            "position",
            "created_at",
            "updated_at"
        );
        res.status(200).json({ Cargos: data });
    },

    async createJob(req, res) {
        const { position } = req.body;
        if (!position) {
            res.status(400).json({ error: "Enviar Dados Corretamente!" });
            return;
        }
        try {
            const data = await knex("job_positions").where({ position });
            if (data.length) {
                res.status(400).json({ error: "Cargo Já Cadastrado!" });
                return;
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }

        try {
            const newJob = await knex("job_positions").insert({
                position
            });
            res.status(200).json({ data: newJob[0], msg: "Cargo Cadastrado Com Sucesso!" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
}
