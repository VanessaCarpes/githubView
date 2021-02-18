import React from 'react';
import { Typography, Grid, AppBar, Toolbar } from "@material-ui/core";

function Header() {
    return (
        <>
            <AppBar position="sticky" elevation={0}>
                <Toolbar>
                    <Grid container spacing={1} alignItems="center" style={{ padding: '30px 0px 30px' }}>
                        <Grid item>
                            <Typography variant="h5">
                                Github profiler
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Header;