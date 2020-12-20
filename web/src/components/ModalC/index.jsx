import { React, useState } from 'react';
import './styles.css';

import { makeStyles, Modal } from '@material-ui/core'
import { Paper } from '../../styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

function ModalC() {
    const classes = useStyles();

    return(
        <Modal
            open={open}
            onClose={handleClose}
            className={classes.root}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <Paper>
                <h1>Hello World</h1>
            </Paper>
        </Modal>
    )
}

export default ModalC;