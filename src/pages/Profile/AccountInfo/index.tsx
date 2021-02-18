import React, { useCallback, useEffect, useState } from 'react';
import { withStyles, Grid, WithStyles } from "@material-ui/core";
import { styles } from './styles';
import { Account, AccountNumbers } from '..';
import { NewNote } from '../NewNote';
import api from '../../../services/backend/api';
import Notes from './Notes';
import Languages from './Languages';
import Profile from './Profile';
import Header from './Header';

interface AccountInfoProps extends WithStyles<typeof styles> {
    accountProfile: Account;
    accountInfo?: AccountNumbers | null;
    searchNew: Function;
}

export interface Note {
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

            <Header accountProfile={accountProfile} searchNew={searchNew} handleModalNote={handleModalNote} />

            <Grid container justify="space-between" direction="row">
                <Grid item lg={2} md={2} sm={12} xs={12}>
                    <Profile accountProfile={accountProfile} accountInfo={accountInfo} classes={classes} />
                </Grid>
                <Grid item lg={10} md={12} sm={12} xs={12} className={classes.paper} style={{ margin: 0 }}>
                    <Languages languages={accountInfo?.languages} />
                    <Notes notes={notes} classes={classes} />
                </Grid>
            </Grid>
        </>
    );
}

export default withStyles(styles)(AccountInfo);