import Head from 'next/head';
import {AppBar, Container, Tab, Toolbar, Typography} from "@material-ui/core";

const Layout = ({children}) => {
    return (
        <div>
            <Head>
                <title>Rouverse</title>
            </Head>
            <AppBar position="static">
                <Toolbar>
                    <Typography>Rouverse</Typography>
                </Toolbar>
            </AppBar>
            <Container>
                {children}
            </Container>
            <footer>
                <Typography>
                    All rights reserved @Rouzex
                </Typography>
            </footer>
        </div>
    )
}

export default Layout;