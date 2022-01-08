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

const registerSchema = yup.object().shape({
    username: yup.string().required(),
    fullName: yup.string().required().min(5),
    imageName: yup.string().required(),
    password: yup.string().min(2).required(),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
})

const Register = () => {
    const classes = useStyles();
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const router = useRouter();
    const {redirect} = router.query;
    const [isSubmittingForm, setIsSubmittingForm] = useState(false);
    const [imageName, setImageName] = useState(null);
    const [imageFormData, setImageFormData] = useState(null);

    /*    const {state, dispatch} = useContext(Store);
        const {userInfo} = state;
        useEffect(() => {
            if (userInfo) {
                router.push('/');
            }
        }, []);*/

    const uploadHandler = async (e, imageField = 'image') => {
        const file = e.target.files[0];
        setImageName(file.name);
        const bodyFormData = new FormData();
        bodyFormData.append('file', file);
        setImageFormData(bodyFormData);
    }

    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(registerSchema),
    })

    const registerFormHandler = async (formData) => {
        setIsSubmittingForm(true);
        closeSnackbar();
        formData.userImg = imageFormData;
        try {
            const {data} = await axios.post('/api/users/register', {...formData}, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            /*dispatch({type: 'USER_LOGIN', payload: data});*/
            Cookies.set('userInfo', data);
            setIsSubmittingForm(false);
            router.push(redirect || '/');
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
                        <TextField
                            value={imageName}
                            error={!!errors.imageName}
                            variant="outlined"
                            id="imageName"
                            label="Profile Picture"
                            {...register("imageName")}
                            helperText={errors.imageName?.message ?? null}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <Button variant="contained" component="label" sx={{minWidth: 250}}>
                            Upload Profile Picture
                            <input type="file" onChange={uploadHandler} hidden accept="image/*"/>
                        </Button>
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