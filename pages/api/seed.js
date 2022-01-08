import nc from 'next-connect';
import db from "../../utils/db";
import Post from "../../models/Post";
import User from "../../models/User";
import data from "../../utils/data";

const handler = nc();

handler.get(async (req, res) => {
    await db.connect();
    await Post.deleteMany();
    await Post.insertMany(data.posts);
    await User.deleteMany();
    await User.insertMany(data.users);
    res.send({message: 'seeded successfully'});
})

export default handler;