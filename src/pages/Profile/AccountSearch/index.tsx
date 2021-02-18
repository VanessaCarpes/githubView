import React, { useCallback, useState } from 'react';
import { Typography, Grid, IconButton, TextField } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

interface AccountSearchProps {
    error: string;
    handleSearch: Function;
}

function AccountSearch(props: AccountSearchProps) {
    const { error, handleSearch } = props;
    const [account, setAccount] = useState('');

    const search = useCallback(() => {
        handleSearch(account);
    }, [account]);

    return (
        <>
            <Grid container spacing={1} justify="center" alignItems="center">
                <Grid item>
                    <Typography variant="body1">github.com/</Typography>
                </Grid>
                <Grid item>
                    <TextField
                        name="profile"
                        label="Profile"
                        value={account}
                        onChange={(e) => setAccount(e.target.value)}
                        variant="outlined"
                        error={!!error}
                        helperText={error && error}
                    />
                </Grid>
                <Grid item>
                    <IconButton aria-label="search" onClick={() => search()}>
                        <SearchIcon fontSize="large" />
                    </IconButton>
                </Grid>
            </Grid>
        </>
    );
}

export default AccountSearch;