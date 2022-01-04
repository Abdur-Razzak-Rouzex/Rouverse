import Head from 'next/head';
import {AppBar, Container, Tab, Toolbar, Typography} from "@material-ui/core";
import useStyles from "../utils/styles";

const Layout = ({children}) => {
    const classes = useStyles();
    return (
        <div>
            <Head>
                <title>Rouverse</title>
            </Head>
            <AppBar position="static" className={classes.navbar}>
                <Toolbar>
                    <Typography>Rouverse</Typography>
                </Toolbar>
            </AppBar>
            <Container className={classes.main}>
                {children}
            </Container>
            <footer className={classes.footer}>
                <Typography>
                    All rights reserved @Rouzex
                </Typography>
            </footer>
        </div>
    )
}

export default Layout;