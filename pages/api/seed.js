import nc from 'next-connect';
import db from "../../utils/db";
import Post from "../../models/Post";
import data from "../../utils/data";

const handler = nc();

handler.get(async (req, res) => {
    await db.connect();
    await Post.deleteMany();
    await Post.insertMany(data.posts);
    res.send({message: 'seeded successfully'});
})

export default handler;