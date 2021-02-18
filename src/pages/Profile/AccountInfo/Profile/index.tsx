import React from 'react';
import { Grid, Avatar } from "@material-ui/core";
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import Caption from '../../../components/Caption';
import { Account, AccountNumbers } from '../..';

interface ProfileProps {
    accountProfile: Account;
    accountInfo?: AccountNumbers | null;
    classes: ClassNameMap;
}

function Profile(props: ProfileProps) {
    const { accountProfile, accountInfo, classes } = props;
    
    return (
        <Grid container spacing={3} alignItems="flex-start" direction="column">
            <Avatar
                variant="rounded"
                alt={accountProfile.login}
                src={accountProfile.avatar_url}
                className={classes.avatar}
            />

            <Caption title="Followers" content={accountProfile.followers.toString().padStart(3, '0')} />
            <Caption title="Following" content={accountProfile.following.toString().padStart(3, '0')} />
            <Caption title="Repositories" content={accountProfile.public_repos.toString().padStart(3, '0')} />
            <Caption title="Stars" content={accountInfo?.stars.toString().padStart(3, '0')} />
            <Caption title="Watchers" content={accountInfo?.watchers.toString().padStart(3, '0')} />
            <Caption title="Forks" content={accountInfo?.forks.toString().padStart(3, '0')} />
        </Grid>
    );
}

export default Profile;