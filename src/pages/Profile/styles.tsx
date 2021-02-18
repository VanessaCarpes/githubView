import { createStyles, LinearProgress, withStyles } from "@material-ui/core";
import theme from "../../styles/theme";

export const styles = createStyles({
    root: {
        display: 'flex',
        minHeight: '100vh',
    },
    app: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    main: {
        flex: 1,
        padding: theme.spacing(4, 4),
        background: '#F3F6F9',
    },
    paper: {
        padding: theme.spacing(8, 8),
    },
    avatar: {
        width: theme.spacing(30),
        height: theme.spacing(30),
        paddingBottom: theme.spacing(3),
    },
    footer: {
        padding: theme.spacing(2),
        background: '#F3F6F9',
    },
});

export const BorderLinearProgress = withStyles(() => ({
    root: {
        height: 10,
        width: '50%',
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#8950FC',
    },
}))(LinearProgress); 