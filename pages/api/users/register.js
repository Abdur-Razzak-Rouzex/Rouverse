import nc from 'next-connect';
import bcrypt from "bcryptjs";
import User from "../../../models/User";
import db from "../../../utils/db";
import {signToken} from '../../../utils/auth';
import {onError} from "../../../utils/error";

const handler = nc({onError});

handler.post(async (req, res) => {
    await db.connect();

    const salt = await bcrypt.genSaltSync(10)
    const body = JSON.parse(req.body);

    const newUser = new User({
        username: body.username,
        fullName: body.fullName,
        password: await bcrypt.hashSync(body.password, salt),
        isAdmin: false,
        userImg: body.userImg
    });

    const user = await newUser.save();

    const token = signToken(user);
    res.send({
        token,
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        isAdmin: user.isAdmin,
        userImg: user.userImg
    });
});

export default handler;