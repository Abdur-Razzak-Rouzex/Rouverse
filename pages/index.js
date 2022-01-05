import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import {Grid, Typography, ThemeProvider, createTheme} from "@material-ui/core";
import useStyles from "../utils/styles";
import db from "../utils/db";
import Post from "../models/Post";


export default function Home(props) {
    const {posts} = props
    const classes = useStyles();

    const theme = createTheme({
        palette: {
            type: 'dark'
        }
    })
    return (
        <div>
            <Layout>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Typography>User profile section</Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <h2>Input box to create a post</h2>
                        <ThemeProvider theme={theme}>
                            {posts.map(post => (
                                <PostCard post={post} key={post._id}/>
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