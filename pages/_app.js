import '../styles/globals.css'
import {useEffect} from "react";
import {SnackbarProvider} from 'notistack';
import {Provider} from 'react-redux';
import store from "../redux/store";

function MyApp({Component, pageProps}) {
    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <Provider store={store}>
            <SnackbarProvider anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Component {...pageProps} />
            </SnackbarProvider>
        </Provider>
    )
}

export default MyApp
