import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import {Grid, Typography, ThemeProvider, createTheme} from "@material-ui/core";
import useStyles from "../utils/styles";
import db from "../utils/db";
import Post from "../models/Post";
import io from 'socket.io-client'
import {useEffect, useState} from 'react'
import {useSnackbar} from "notistack";
import { useSelector} from "react-redux";

export default function Home(props) {
    const {posts} = props
    const classes = useStyles();
    const {enqueueSnackbar} = useSnackbar();
    const [socket, setSocket] = useState(null);

    const user = useSelector(state => state.user);
    console.log('user.userinfo: ', user.userInfo);

    useEffect(() => {
        if (user.userInfo) {
            setSocket(io("http://localhost:5000"));
            enqueueSnackbar('Real time communication activated', {variant: 'success'});
        }
    }, [user]);

    useEffect(() => {
        socket?.emit("newUser", user?.userInfo?.username);
    }, [socket, user]);


    const theme = createTheme({
        palette: {
            type: 'dark'
        }
    })

    return (
        <div>
            <Layout socket={socket}>
                <Grid container spacing={3}>

                    <Grid item xs={12} md={4}>
                        <Typography>User profile section</Typography>
                    </Grid>

                    {/** Main section */}
                    <Grid item xs={12} md={4}>
                        <h2>Input box to create a post</h2>
                        <ThemeProvider theme={theme}>
                            {posts.map(post => (
                                <PostCard post={post} key={post._id} socket={socket}/>
                            ))}
                        </ThemeProvider>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Typography>online users section</Typography>
                    </Grid>

                    <footer className={classes.footer}>
                        <Typography>
                            All rights reserved @Rouzex
                        </Typography>
                    </footer>

                </Grid>
            </Layout>
        </div>
    )
}

export async function getServerSideProps() {
    await db.connect();
    const posts = await Post.find({}).lean();
    return {
        props: {posts: posts.map(db.convertDocToObj)}
    }
}