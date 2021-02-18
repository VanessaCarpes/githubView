import React, { useCallback, useEffect, useState } from 'react';
import { Typography, withStyles, Grid, AppBar, IconButton, WithStyles, Avatar, Table, TableCell, TableBody, TableRow, List, ListItem, ListItemText } from "@material-ui/core";
import FindReplaceIcon from '@material-ui/icons/FindReplace';
import AddCommentIcon from '@material-ui/icons/AddComment';
import { styles } from './styles';
import Caption from '../../components/Caption';
import { Account, AccountNumbers } from '..';
import { NewNote } from '../NewNote';
import api from '../../../services/backend/api';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';

interface AccountInfoProps extends WithStyles<typeof styles> {
    accountProfile: Account;
    accountInfo?: AccountNumbers | null;
    searchNew: Function;
}

interface Note {
    id: number;
    userId: string;
    annotation: string;
    createdAt: Date;
}

function AccountInfo(props: AccountInfoProps) {
    const { classes, accountProfile, accountInfo, searchNew } = props;
    const [openNewNote, setOpenNewNote] = useState(false);
    const [notes, setNotes] = useState<Array<Note>>([]);

    const handleModalNote = () => {
        setOpenNewNote(!openNewNote);
    };

    const pushNote = useCallback((note: Note) => {
        const addingNote = notes;
        addingNote.unshift(note);

        setNotes(addingNote);
    }, [notes]);

    useEffect(() => {
        async function loadNotes(): Promise<void> {
            try {
                const response = await api.get(`/${accountProfile.id}`);

                if (response.status === 200) {
                    setNotes(response.data);
                }
            } catch (err) {
                setNotes([]);
            }
        }
        loadNotes();
    }, []);

    return (
        <>
            <NewNote userId={accountProfile.id} isOpen={openNewNote} addNote={pushNote} handleToggleModal={handleModalNote} />

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

            <Grid
                container
                justify="space-between"
                direction="row"
            >
                <Grid item lg={2} md={2} sm={12} xs={12}>
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
                </Grid>
                <Grid
                    item
                    lg={10}
                    md={10}
                    sm={12}
                    xs={12}
                    className={classes.paper}
                    style={{ margin: 0 }}
                >
                    <Grid container direction="row">
                        <Typography variant="h5">Languages</Typography>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Table>
                                <TableBody>
                                    {accountInfo?.languages.map((row) => {
                                        return (
                                            <TableRow key={row.name}>
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.percent?.toFixed(2)}%
                                            </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>

                    {notes.length > 0 &&
                        <Grid container direction="row" style={{ paddingTop: 40 }}>
                            <Typography variant="h5">Notes</Typography>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <List className={classes.list}>
                                    {notes.map((note) => {
                                        return (
                                            <ListItem key={note.id}>
                                                <ListItemText
                                                    primary={note.annotation}
                                                    secondary={formatDistanceToNow(new Date(note.createdAt),
                                                        {
                                                            addSuffix: true,
                                                            locale: enUS,
                                                        },
                                                    )}
                                                />
                                            </ListItem>
                                        )
                                    })}
                                </List>
                            </Grid>
                        </Grid>
                    }
                </Grid>
            </Grid >
        </>
    );
}

export default withStyles(styles)(AccountInfo);