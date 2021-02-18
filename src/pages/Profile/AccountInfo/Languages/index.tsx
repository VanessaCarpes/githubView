import React from 'react';
import { Typography, Grid, Table, TableCell, TableBody, TableRow } from "@material-ui/core";
import { Language } from '../..';

interface LanguagesProps {
    languages?: Array<Language>;
}

function Languages(props: LanguagesProps) {
    const { languages } = props;
    
    return (
        <>
        {languages && languages.length > 0 &&
            <Grid container direction="row">
                <Typography variant="h5">Languages</Typography>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Table>
                        <TableBody>
                            {languages.map((row) => {
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
            }
        </>
    );
}

export default Languages;