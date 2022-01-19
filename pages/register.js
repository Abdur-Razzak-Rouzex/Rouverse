import Layout from "../components/Layout";
import {
    Button, Link, List, ListItem,
    TextField, Typography, CircularProgress
} from "@material-ui/core";
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
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../redux";
import {useEffect} from "react";

const registerSchema = yup.object().shape({
    username: yup.string().required(),
    fullName: yup.string().required().min(5),
    userImg: yup.string(),
    password: yup.string().min(2).required(),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
})

const Register = () => {
    const classes = useStyles();
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const router = useRouter();
    const {redirect} = router.query;
    const [isSubmittingForm, setIsSubmittingForm] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [loadingUpload, setLoadingUpload] = useState(false);

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user.userInfo) {
            router.push('/');
        }
    }, []);

    const uploadHandler = async (e, imageField = 'image') => {
        setLoadingUpload(true);
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('file', file);
        try {
            const {data} = await axios.post('/api/users/upload', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setImageUrl(data.secure_url);
            setLoadingUpload(false);
            enqueueSnackbar('Profile picture uploaded successfully', {variant: 'success'});

        } catch (error) {
            setLoadingUpload(false);
            enqueueSnackbar(getError(error), {variant: 'error'});
        }
    }

    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(registerSchema),
    })

    const registerFormHandler = async (formData) => {
        setIsSubmittingForm(true);
        closeSnackbar();
        try {
            const {data} = await axios.post('/api/users/register', {...formData}, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            dispatch(loginUser(data));
            Cookies.set('userInfo', JSON.stringify(data));
            setIsSubmittingForm(false);
            await router.push(redirect || '/');
            reset();
        } catch (error) {
            enqueueSnackbar(getError(error), {variant: 'error'});
            setIsSubmittingForm(false);
        }
    }

    return (
        <Layout title="Register">
            <form className={classes.form} onSubmit={handleSubmit(registerFormHandler)}>
                <Typography component="h1" variant="h1" className={classes.login}>
                    Register
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
                            error={!!errors.fullName}
                            variant="outlined"
                            fullWidth
                            id="fullName"
                            label="full Name"
                            {...register("fullName")}
                            helperText={errors.fullName?.message ?? null}
                        />
                    </ListItem>
                    <ListItem style={{justifyContent: 'space-between'}}>
                        {imageUrl && <TextField
                            value={imageUrl}
                            error={!!errors.userImg}
                            variant="outlined"
                            id="userImg"
                            label="Profile Picture"
                            {...register("userImg")}
                            helperText={errors.userImg?.message ?? null}
                            InputProps={{
                                readOnly: true,
                            }}
                        />}
                        <Button variant="contained" component="label" sx={{minWidth: 250}}>
                            Upload Profile Picture
                            <input type="file" onChange={uploadHandler} hidden accept="image/*"/>
                        </Button>
                        {loadingUpload && <CircularProgress/>}
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
                        <TextField
                            error={!!errors.confirmPassword}
                            variant="outlined"
                            fullWidth
                            id="confirmPassword"
                            label="Confirm Password"
                            inputProps={{type: 'password'}}
                            {...register("confirmPassword")}
                            helperText={errors.confirmPassword ? "password did't match" : null}
                        />
                    </ListItem>
                    <ListItem>
                        <Button
                            variant="contained"
                            type="submit"
                            fullWidth
                            color="primary"
                        >
                            {isSubmittingForm ?
                                <CircularProgress color={'secondary'}>Please Wait</CircularProgress> : "Register"}
                        </Button>
                    </ListItem>
                    <ListItem>
                        Already have an account? &nbsp;
                        <NextLink href="/login" passHref>
                            <Link>login</Link>
                        </NextLink>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}

export default Register;