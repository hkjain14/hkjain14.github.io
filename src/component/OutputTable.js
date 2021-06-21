import React, {useEffect, useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function OutputTable() {
    const classes = useStyles();
    const [outputLogs, setOutputLogs] = useState({});

    const addOutputLogs = (event) => {
        setOutputLogs((prevState) => ({...prevState, [event.detail.numberOfOptionsFound]: event.detail}));
    };
    const clearOutputLogs = () => {
        setOutputLogs({});
    };

    useEffect(() => {
        window.addEventListener(
            "outputEvent",
            addOutputLogs,
            false
        );
        window.addEventListener(
            "clearOutputEvent",
            clearOutputLogs,
            false
        );
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                {Object.values(outputLogs).length !== 0 && <TableHead>
                    <StyledTableRow>
                        <StyledTableCell align="center">Date</StyledTableCell>
                        <StyledTableCell align="center">Center</StyledTableCell>
                        <StyledTableCell align="center">Pin code</StyledTableCell>
                        <StyledTableCell align="center">District</StyledTableCell>
                        {Object.values(outputLogs)[0].dose === '1' && <StyledTableCell align="center">Dose 1 slots</StyledTableCell>}
                        {Object.values(outputLogs)[0].dose === '2' && <StyledTableCell align="center">Dose 2 slots</StyledTableCell>}
                        <StyledTableCell align="center">Vaccine</StyledTableCell>
                        <StyledTableCell align="center">Cost</StyledTableCell>
                    </StyledTableRow>
                </TableHead>}
                <TableBody>
                    {Object.values(outputLogs).map((row) => (
                        <StyledTableRow key={row.numberOfOptionsFound}>
                            <StyledTableCell align="center">{row.date}</StyledTableCell>
                            <StyledTableCell align="center">{row.centerName}</StyledTableCell>
                            <StyledTableCell align="center">{row.pin}</StyledTableCell>
                            <StyledTableCell align="center">{row.district}</StyledTableCell>
                            {row.dose === '1' && <StyledTableCell align="center">{row.dose1Cap}</StyledTableCell>}
                            {row.dose === '2' && <StyledTableCell align="center">{row.dose2Cap}</StyledTableCell>}
                            <StyledTableCell align="center">{row.vaccine}</StyledTableCell>
                            <StyledTableCell align="center">{row.cost}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}