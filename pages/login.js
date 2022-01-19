import Layout from "../components/Layout";
import {Button, Link, List, ListItem, TextField, Typography} from "@material-ui/core";
import useStyles from "../utils/styles";
import NextLink from 'next/link'
import * as yup from 'yup';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useSnackbar} from "notistack";
import {useRouter} from "next/router";
import {getError} from "../utils/error";
import axios from "axios";
import Cookies from 'js-cookie';
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../redux";
import {useEffect} from "react";

const loginSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
})

const Login = () => {
    const classes = useStyles();
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const router = useRouter();
    const {redirect} = router.query;

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user.userInfo) {
            router.push('/');
        }
    }, []);


    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(loginSchema),
    })

    const loginFormHandler = async (formData) => {
        closeSnackbar();
        try {
            const {data} = await axios.post('/api/users/login', {
                ...formData
            });

            dispatch(loginUser(data));
            Cookies.set('userInfo', JSON.stringify(data));
            await router.push(redirect || '/');
        } catch (error) {
            enqueueSnackbar(getError(error), {variant: 'error'});
        }
    }

    return (
        <Layout title="Login">
            <form className={classes.form} onSubmit={handleSubmit(loginFormHandler)}>
                <Typography component="h1" variant="h1" className={classes.login}>
                    Login
                </Typography>
                <List>
                    <ListItem>
                        <TextField
                            error={!!errors.username}
                            variant="outlined"
                            fullWidth
                            id="username"
                            label="Username"
                            {...register("username")}
                            helperText={errors.username?.message ?? null}
                        />
                    </ListItem>
                    <ListItem>
                        <TextField
                            error={!!errors.password}
                            variant="outlined"
                            fullWidth
                            id="password"
                            label="Password"
                            inputProps={{type: 'password'}}
                            {...register("password")}
                            helperText={errors.password?.message ?? null}
                        />
                    </ListItem>
                    <ListItem>
                        <Button
                            variant="contained"
                            type="submit"
                            fullWidth
                            color="primary"
                        >
                            Login
                        </Button>
                    </ListItem>
                    <ListItem>
                        Don&apos;t have an account? &nbsp;
                        <NextLink href="/register" passHref>
                            <Link>Register</Link>
                        </NextLink>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}

export default Login;