import { createStyles, LinearProgress, withStyles } from "@material-ui/core";
import theme from "../../../styles/theme";

export const styles = createStyles({
    paper: {
        padding: theme.spacing(2, 2),
    },
    avatar: {
        width: theme.spacing(30),
        height: theme.spacing(30),
        paddingBottom: theme.spacing(3),
    },
    list: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
});
