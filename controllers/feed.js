const knex = require("../dbConfig");

module.exports = {
    async show(req, res) {
        try {
            const data = [];
            const publics = await knex("publication")
                .select(
                    "p.id as idP",
                    "p.publication",
                    "p.created_at",
                    "u.name as user_name",
                    "u.image"
                )
                .from("publication as p")
                .orderBy('id', "desc")
                .leftJoin("user as u", "p.id", "u.id as idU");

            console.log(publics)

            for (var i = 0; i < publics.length; i++) {
                const comment = await knex("comment")
                    .where({ idpublication: publics[i].idP })
                    .select(
                        "c.id as idR",
                        "c.publication_id",
                        "c.comment",
                        "c.created_at",
                        "u.name",
                        "u.image"
                    )
                    .from("comment as c")
                    .leftJoin("user as u", "c.user_id", "u.id");

                if (!comment.length) {
                    data.push({
                        publication_id: publics[i].idP,
                        publication: publics[i].publication,
                        created_at: publics[i].created_at,
                        name: publics[i]. user_name,
                        image: publics[i].image
                    });
                } else {
                    data.push({
                        publication_id: publics[i].idP,
                        publication: publics[i].publication,
                        created_at: publics[i].created_at,
                        name: publics[i]. user_name,
                        image: publics[i].image,
                        comment: comment,
                    });
                }
            }
            res.status(200).json({ erro: "false", data: data });
        } catch (error) {
            res.status(400).json({ erro: "true", msg: error.message });
        }
    },

    async createPublic(req, res) {
        const { id, publication } = req.body;
        if (!id || !publication) {
            res.status(400).json({ erro: "Publicação Invalida!" });
            return;
        }
        try {
            const newPubli = await knex("publication").insert({
                id,
                publication,
            });
            res.status(200).json({ data: "Publicado!!!" });
        } catch (error) {
            res.status(200).json({ erro: error.message });
        }
    },

}