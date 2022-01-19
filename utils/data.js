import bcrypt from 'bcryptjs';

const data = {
    posts: [
        {
            id: 1,
            username: "john",
            fullName: "John Keller",
            textStatus: 'My first status on Rouverse',
            userImg: "https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            postImg: "https://images.pexels.com/photos/9730025/pexels-photo-9730025.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
            totalLikes: 5,
        },
        {
            id: 2,
            username: "monica",
            fullName: "Monica Stan",
            textStatus: 'My first status on Rouverse',
            userImg: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
            postImg: "https://images.pexels.com/photos/3497624/pexels-photo-3497624.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
            totalLikes: 5,
        },
    ],
    users: [
        {
            username: 'john',
            fullName: 'John Keller',
            password: bcrypt.hashSync('123456'),
            userImg: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            isAdmin: true,
        },
        {
            username: 'monica',
            fullName: 'Monica Stan',
            password: bcrypt.hashSync('123456'),
            userImg: 'https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            isAdmin: false,
        },
    ],
}

export default data;