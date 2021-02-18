import { createStyles } from "@material-ui/core";
import theme from "../../../styles/theme";

export const styles = createStyles({
    paper: {
        padding: theme.spacing(2, 2),
    },
    avatar: {
        width: 200,
        height: 200,
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
