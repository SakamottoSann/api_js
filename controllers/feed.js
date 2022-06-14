const knex = require("../dbConfig");

module.exports = {
    async show(req, res) {
        try {
            const data = [];
            const publics = await knex("publication")
                .select(
                    "p.id as idPublication",
                    "p.publication",
                    "p.created_at",
                    "u.name",
                    "u.image"
                )
                .from("publication as p")
                .orderBy('idPublication', "desc")
                .leftJoin("user as u", "p.user_id", "u.id");


            for (var i = 0; i < publics.length; i++) {
                const comment = await knex("comment")
                    .where({ publication_id: publics[i].idPublication })
                    .select(
                        "c.id as idComment",
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
                        publication_id: publics[i].idPublication,
                        publication: publics[i].publication,
                        created_at: publics[i].created_at,
                        name: publics[i]. name,
                        image: publics[i].image
                    });
                } else {
                    data.push({
                        publication_id: publics[i].idPublication,
                        publication: publics[i].publication,
                        created_at: publics[i].created_at,
                        name: publics[i]. name,
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
                user_id: id,
                publication,
            });
            res.status(200).json({ data: "Publicado!!!" });
        } catch (error) {
            res.status(200).json({ erro: error.message });
        }
    },

}