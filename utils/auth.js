import jwt, {decode} from 'jsonwebtoken';

const signToken = (user) => {
    return jwt.sign({
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            userImg: user.userImg,
            idAdmin: user.isAdmin
        },

        process.env.JWT_SECRET, {
            expiresIn: '10d',
        }
    )
}

const isAuth = async (req, res, next) => {
    const {authorization} = req.headers;
    if(authorization) {
        const token = authorization.slice(7, authorization.length);
        jwt.verify(token, process.JWT_SECRET, (err, decode) => {
            if(err) {
                res.status(401).send({message: 'Token is not valid'});
            }else {
                req.user = decode;
                next();
            }
        })
    }else {
        res.status(401).send({message: 'Token is not supplied'});
    }
}

export { signToken, isAuth };