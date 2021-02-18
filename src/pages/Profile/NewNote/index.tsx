import React, { useCallback, useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { PulseLoader } from 'react-spinners';
import { Grid, IconButton, TextField, Typography } from '@material-ui/core';
import api from '../../../services/backend/api';

interface NewNoteProps {
    userId: string;
    isOpen: boolean;
    handleToggleModal: Function;
    addNote: Function;
}

export const NewNote = (props: NewNoteProps) => {
    const { userId, isOpen, handleToggleModal, addNote } = props;
    const [note, setNote] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleClose = useCallback(() => {
        setNote('');
        setError('');
        handleToggleModal();
    }, [handleToggleModal]);

    const handleSubmit = async () => {
        if (!loading) {
            try {
                setLoading(true);
                const response = await api.post('', { userId: userId, annotation: note });

                if (response.status === 200) {
                    addNote(response.data);
                    handleClose();
                } else {
                    setError('An unexpected error occurred.');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle style={{ padding: '32px 16px 16px 32px' }}>
                <Typography variant="h6" style={{ lineHeight: '22px' }}>
                    New Note
                    </Typography>
            </DialogTitle>

            <DialogContent style={{ height: 230, padding: '0 16px' }}>
                <Grid container spacing={2} alignItems="center">
                    <form>
                        <Grid item style={{ margin: 16 }}>
                            <TextField
                                name="note"
                                label="Note"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                variant="outlined"
                                multiline
                                rows={8}
                                error={!!error}
                                helperText={error ? error : `${note.length ? note.length : '0'}/255`}
                                style={{ minWidth: '300px' }}
                                inputProps={{
                                    maxlength: 255,
                                }}
                            />
                        </Grid>
                    </form>
                </Grid>
            </DialogContent>

            <DialogActions style={{ flexWrap: 'wrap' }}>
                <Grid container spacing={2} style={{ paddingBottom: 16, margin: 0 }}>
                    <Grid item xl={8} lg={8} md={8} sm={8} xs={8} style={{ textAlign: "right" }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleClose}
                        >
                            CANCEL
                        </Button>
                    </Grid>
                    <Grid item style={{ paddingRight: 0, textAlign: "right" }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            {loading ? (
                                <PulseLoader color="#fff" size={5} />
                            ) : (
                                    'SAVE'
                                )}
                        </Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    );
}
