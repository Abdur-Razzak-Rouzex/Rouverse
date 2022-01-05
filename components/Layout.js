import Head from 'next/head';
import {
    AppBar, Container, Link, Tab,
    Toolbar, Typography, Badge,
    Button
} from "@material-ui/core";
import useStyles from "../utils/styles";
import NextLink from 'next/link'
import NotificationsIcon from '@material-ui/icons/Notifications';
import {useState} from "react";

const Layout = ({children}) => {

    const classes = useStyles();
    const [notifications, setNotifications] = useState(0);
    return (
        <div>
            <Head>
                <title>
                    Rouverse
                </title>
            </Head>
            <AppBar position="static" className={classes.navbar}>
                <Toolbar>
                    <NextLink href="/" passHref>
                        <Link style={{textDecoration: "none"}}>
                            <Typography className={classes.brand}>
                                Rouverse
                            </Typography>
                        </Link>
                    </NextLink>
                    <div className={classes.grow}/>
                    <Typography component="span">
                        {notifications.length > 0 ? (
                            <Badge
                                color="secondary"
                                badgeContent={notifications.length}
                            >
                                <NotificationsIcon/>
                            </Badge>
                        ) : (
                            <NotificationsIcon/>
                        )}
                    </Typography>
                    {/*{userInfo ? (
                        <>
                            <Button
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                onClick={loginClickHandler}
                                className={classes.navbarButton}
                            >
                                {userInfo.name}
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={loginMenuCloseHandler}
                            >
                                <MenuItem
                                    onClick={(e) => loginMenuCloseHandler(e, '/profile')}
                                >
                                    Profile
                                </MenuItem>
                                <MenuItem
                                    onClick={(e) =>
                                        loginMenuCloseHandler(e, '/order-history')
                                    }
                                >
                                    Order Hisotry
                                </MenuItem>
                                {userInfo.isAdmin && (
                                    <MenuItem
                                        onClick={(e) =>
                                            loginMenuCloseHandler(e, '/admin/dashboard')
                                        }
                                    >
                                        Admin Dashboard
                                    </MenuItem>
                                )}
                                <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                            </Menu>
                        </>
                    ) : (*/}
                    <NextLink href="/login" passHref>
                        <Link style={{textDecoration: 'none'}}>
                            <Typography component="span">Login</Typography>
                        </Link>
                    </NextLink>
                    {/*)}*/}
                </Toolbar>
            </AppBar>
            <Container className={classes.main}>
                {children}
            </Container>
        </div>
    )
}

export default Layout;