import React, { useCallback, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import { Language } from '@material-ui/icons';
import { styles, BorderLinearProgress } from './styles';
import Header from '../components/Header';
import AccountInfo from './AccountInfo';
import AccountSearch from './AccountSearch';
import api from '../../services/gitHub/api';

export interface Account {
    id: string;
    login: string;
    avatar_url: string;
    location: string;
    followers: number;
    following: number;
    public_repos: number;
}

interface Language {
    name: string;
    count: number;
    percent?: number;
}

export interface AccountNumbers {
    stars: number;
    watchers: number;
    forks: number;
    languages: Array<Language>;
}

function Profile(props) {
    const { classes } = props;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [accountProfile, setAccountProfile] = useState<Account | null>();
    const [accountInfo, setAccountInfo] = useState<AccountNumbers | null>();

    const searchNew = useCallback(async () => {
        setAccountProfile(null);
        setAccountInfo(null);
    }, []);

    const handleSearch = useCallback(async (account) => {
        setLoading(true);
        setError('');

        try {
            const response = await api.get(account);
            const repos = await api.get(`${account}/repos`);

            if (response.status === 200) {
                setAccountProfile(response.data);
            }

            let starCount = 0;
            let watchersCount = 0;
            let forksCount = 0;
            let totalLines = 0;
            const languagesCount = new Array<Language>();

            for (const repo of repos.data) {
                starCount += repo.stargazers_count;
                watchersCount += repo.watchers;
                forksCount += repo.forks;

                const languages = await api.get(repo.languages_url);

                Object.entries(languages.data).forEach(([key, value]) => {
                    totalLines += value as number;
                    const alreadyExistsPos = languagesCount.findIndex(
                        (lang) => lang.name === key,
                    );

                    if (alreadyExistsPos < 0) {
                        languagesCount.push({ name: key, count: value as number });
                    } else {
                        languagesCount[alreadyExistsPos] = {
                            name: key,
                            count: languagesCount[alreadyExistsPos].count + (value as number),
                        };
                    }
                });
            }

            const languages = languagesCount.map((lang) => {
                return {
                    name: lang.name,
                    count: lang.count,
                    percent: (lang.count / totalLines) * 100,
                };
            });

            setAccountInfo({
                stars: starCount,
                watchers: watchersCount,
                forks: forksCount,
                languages,
            });

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <div className={classes.app}>
                <Header />

                <main className={classes.main}>
                    <Paper className={classes.paper}>
                        {loading ? (
                            <div style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                                <BorderLinearProgress />
                            </div>
                        ) : accountProfile ? (
                            <AccountInfo accountProfile={accountProfile} accountInfo={accountInfo} searchNew={searchNew} />
                        ) : (
                                    <AccountSearch handleSearch={handleSearch} error={error && error} />
                                )}
                    </Paper>
                </main>

                <footer className={classes.footer}>
                    <Typography variant="body2" color="textSecondary" align="center">
                        {`Copyright © Vanessa Carpes - ${new Date().getFullYear()} ;)`}
                    </Typography>
                </footer>
            </div>
        </div>
    );
}

export default withStyles(styles)(withRouter(Profile));
