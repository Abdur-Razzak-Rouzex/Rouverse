import nc from 'next-connect';
import bcrypt from "bcryptjs";
import User from "../../../models/User";
import db from "../../../utils/db";
import {signToken} from '../../../utils/auth';

const handler = nc();

const userImage = '';

handler.post(async (req, res) => {
    await db.connect();
    const newUser = new User({
        username: req.body.username,
        fullName: req.bdoy.fullName,
        password: bcrypt.hashSync(req.body.password),
        isAdmin: false,
        userImg: userImage
    });

    const user = await newUser.save();

    const token = signToken(user);
    res.send({
        token,
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        isAdmin: user.isAdmin,
        userImage: user.userImage
    });
});

export default handler;