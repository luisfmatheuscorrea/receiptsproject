import { React, useState, useEffect } from 'react';
import './styles.css';

import Menu from '../../components/Menu';
import { ColumnTotal, Container, TitleP, GridCard, RowCard } from '../../styles';
import { Alert, Pagination } from '@material-ui/lab';
import { makeStyles, Snackbar } from '@material-ui/core';
import CardItem from '../../components/CardItem'; 

import InputFilter from '../../components/InputFilter';

import api from '../../services/api';
import ModalC from '../../components/ModalC';
import ModalDelete from '../../components/ModalDelete';

const useStyles = makeStyles((theme) => ({
    pagination: {
        display: 'flex',
        marginTop: '1.2rem',
        width: 1100,
    },
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    icon: {
        width: 40,
        height: 40,
        marginLeft: 10,
    },
  }));

function Receipt() {
    const classes = useStyles();
    const [receipts, setReceipts] = useState([]);
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [activeReceipt, setActiveReceipt] = useState([]);
    const [department, setDepartment] = useState('');
    const [senderFilter, setSenderFilter] = useState("");
    const [typeAlert, setTypeAlert] = useState("");
    const [textAlert, setTextAlert] = useState("");
    const [openAlert, setOpenAlert] = useState(false);

    const handleAlert = () => {
        setOpenAlert(!openAlert);
    }

    const addAlert = () => {
        setTextAlert("Recibo deletado com sucesso!");
        setTypeAlert("success");
        handleAlert();
    }

    const errorAlert = () => {
        setTextAlert("Algo deu errado!");
        setTypeAlert("error");
        handleAlert();
    }

    const handleOpen = () => {
        setOpen(true);
    }

    console.log(activeReceipt)

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenDelete = () => {
        setOpenDelete(true);
        setOpen(false);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const handleCloseDeleting = () => {
        setOpenDelete(false);
        loadReceipts();
        addAlert();
    };

    const handleChangePage = (e, value) => {
        setPage(value);
        loadReceipts(e, value);
    };

    const handleActiveReceipt = (info, department) => {
        setActiveReceipt(info);
        setDepartment(department);
    };

    async function loadReceipts( e, page, value) {
        if(e) {
            e.preventDefault();
        }

        const response = await api.get('receipts', {
            params: { 
                page,
                senderFilter
            }
        });

        // setReceipts(response.data.reverse());
        setReceipts(response.data);
    }

    // const loadTotal = () => {
    //     setTotal(receipts.length);
    // }
    
    useEffect(() => {
        loadReceipts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="all">
            <Snackbar open={openAlert} autoHideDuration={4000} onClose={handleAlert}>
                <Alert onClose={handleAlert} className={classes.message} severity={typeAlert}>
                    {textAlert}
                </Alert>
            </Snackbar>
            <Menu />
            <Container>
                <ColumnTotal>
                    <TitleP>
                        Recibos
                    </TitleP>
                </ColumnTotal>
                <RowCard>
                    <Pagination className={classes.pagination} page={page} onChange={handleChangePage} count={10} />
                    <InputFilter
                        name="sender"
                        type="sender"
                        value={senderFilter}
                        loadReceiptsFiltered={loadReceipts}
                        onChange={(e) => { setSenderFilter(e.target.value) }}
                    />
                </RowCard>
                <GridCard>
                    {receipts.map( items => <CardItem key={items.numeration} receipt={items} handleActiveReceipt={handleActiveReceipt} handleOpen={handleOpen} open={open} handleClose={handleClose} /> )}
                </GridCard>
            </Container>
            {department && <ModalC items={activeReceipt} departmentos={department} setOpenDelete={handleOpenDelete} open={open} handleClose={handleClose} /> }
            {activeReceipt && <ModalDelete items={activeReceipt} openDelete={openDelete} handleCloseDelete={handleCloseDelete} handleCloseDeleting={handleCloseDeleting} /> }
        </div>
    )
}

export default Receipt;