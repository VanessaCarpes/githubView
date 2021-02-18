import React from 'react';
import { WithStyles, createStyles, Theme, Typography, withStyles, Grid } from "@material-ui/core";

const styles = (theme: Theme) =>
    createStyles({
        profileInfo: {
            fontWeight: 500,
            fontSize: '14px',
            fontStyle: 'normal',
            lineHeight: '17px',
            letterSpacing: 0.1,
            color: '#464E5F',
        },
        profileInfoLabel: {
            fontWeight: 500,
            fontSize: '14px',
            fontStyle: 'normal',
            lineHeight: '17px',
            letterSpacing: 0.1,
            color: '#B5B5C3',
        },
    });

interface CaptionProps extends WithStyles<typeof styles> {
    title: string;
    content?: string;
}

function Caption(props: CaptionProps) {
    const { classes, title, content } = props;

    return (
        <>
            <Grid container spacing={3} alignItems="flex-start">
                <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography
                        variant="caption"
                        className={classes.profileInfoLabel}
                        gutterBottom
                    >
                        {title}
                    </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography
                        variant="caption"
                        className={classes.profileInfo}
                        gutterBottom
                    >
                        {content}
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
}

export default withStyles(styles)(Caption);