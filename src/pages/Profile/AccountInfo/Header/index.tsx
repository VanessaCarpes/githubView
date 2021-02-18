import React from 'react';
import { Grid, AppBar, Typography, IconButton } from "@material-ui/core";
import FindReplaceIcon from '@material-ui/icons/FindReplace';
import AddCommentIcon from '@material-ui/icons/AddComment';
import { Account } from '../..';

interface HeaderProps {
    accountProfile: Account;
    handleModalNote: Function;
    searchNew: Function;
}

function Header(props: HeaderProps) {
    const { accountProfile, searchNew, handleModalNote } = props;
    
    return (
        <AppBar>
            <Grid container>
                <Grid container style={{ padding: 16 }} alignItems="center">
                    <Grid item lg={11} md={11} sm={12} xs={12}>
                        <Typography variant="h6">
                            {`${accountProfile.login}'s profile`}
                        </Typography>
                        {accountProfile.location && (
                            <Typography variant="body2">
                                {accountProfile.location}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item lg={1} md={1} sm={12} xs={12} style={{ textAlign: "right" }}>
                        <IconButton aria-label="clear" onClick={() => handleModalNote()}>
                            <AddCommentIcon fontSize="large" style={{ color: "#ffffff" }} />
                        </IconButton>
                        <IconButton aria-label="clear" onClick={() => searchNew()}>
                            <FindReplaceIcon fontSize="large" style={{ color: "#ffffff" }} />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </AppBar>
    );
}

export default Header;