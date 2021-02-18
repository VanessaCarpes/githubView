import React from 'react';
import { Typography, Grid, List, ListItem, ListItemText } from "@material-ui/core";
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Note } from '..';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

interface NotesProps {
    notes: Array<Note>;
    classes: ClassNameMap;
}

function Notes(props: NotesProps) {
    const { notes, classes } = props;
    
    return (
        <>
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
        </>
    );
}

export default Notes;