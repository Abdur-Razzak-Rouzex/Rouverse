import Head from 'next/head';
import {AppBar, Badge, Button, Container, Link, Menu, MenuItem, Toolbar, Typography} from "@material-ui/core";
import useStyles from "../utils/styles";
import NextLink from 'next/link'
import NotificationsIcon from '@material-ui/icons/Notifications';
import {useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import {useRouter} from "next/router";
import Cookies from 'js-cookie';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser, logoutUser} from "../redux";

const Layout = ({children, title, socket}) => {
    const router = useRouter();
    const classes = useStyles();
    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        socket?.on("getNotification", (data) => {
            setNotifications((prev) => [...prev, data]);
        });
    }, [socket]);

    const logoutClickHandler = () => {
        dispatch(logoutUser());
        Cookies.remove('userInfo');
        router.push('/');
    };

    const displayNotification = ({senderName, type}) => {
        let action;

        if (type === 1) {
            action = "liked";
        } else if (type === 2) {
            action = "commented";
        } else {
            action = "shared";
        }
        return (
            <span className="notification">{`${senderName} ${action} your post.`}</span>
        );
    };

    const handleRead = () => {
        setNotifications([]);
        setOpen(false);
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
                    <div onClick={() => setOpen(!open)}>
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
                    </div>
                    {open && (
                        <div className="notifications">
                            {notifications.map((n) => displayNotification(n))}
                            <button className="nButton" onClick={handleRead}>
                                Mark as read
                            </button>
                        </div>
                    )}
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