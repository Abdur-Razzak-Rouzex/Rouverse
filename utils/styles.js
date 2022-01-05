import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    navbar: {
        backgroundColor: '#203040',
        '& a': {
            color: '#FFF',
            marginLeft: 10,
        }
    },
    main: {
        minHeight: '80vh'
    },
    footer: {
        textAlign: "center",
    },
    root: {
        marginBottom: 20
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    brand: {
        fontWeight: 'bold',
        fontSize: '1.5rem'
    },
    grow: {
        flexGrow: 1,
    },
})

export default useStyles;