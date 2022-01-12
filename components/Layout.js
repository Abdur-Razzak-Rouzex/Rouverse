import Head from 'next/head';
import {AppBar, Badge, Button, Container, Link, Menu, MenuItem, Toolbar, Typography} from "@material-ui/core";
import useStyles from "../utils/styles";
import NextLink from 'next/link'
import NotificationsIcon from '@material-ui/icons/Notifications';
import {useState} from "react";
import {useSnackbar} from "notistack";
import {useRouter} from "next/router";
import Cookies from 'js-cookie';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser, logoutUser} from "../redux";

const Layout = ({children, title}) => {
    const router = useRouter();
    const classes = useStyles();
    const [notifications, setNotifications] = useState(0);

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const {enqueueSnackbar} = useSnackbar();

    const [anchorEl, setAnchorEl] = useState(null);

    const logoutClickHandler = () => {
        setAnchorEl(null);
        dispatch(logoutUser());
        Cookies.remove('user.userInfo');
        router.push('/');
    };

    return (
        <div>
            <Head>
                <title>
                    {title ? `${title} - Rouverse` : 'Rouverse'}
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
                    {user.userInfo ? (
                        <>
                            <Button
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                onClick={logoutClickHandler}
                                className={classes.navbarButton}
                            >
                                {user.userInfo.username}
                            </Button>
                        </>
                    ) : (
                        <NextLink href="/login" passHref>
                            <Link style={{textDecoration: 'none'}}>
                                <Typography component="span">Login</Typography>
                            </Link>
                        </NextLink>
                    )}
                </Toolbar>
            </AppBar>
            <Container className={classes.main}>
                {children}
            </Container>
        </div>
    )
}

export default Layout;