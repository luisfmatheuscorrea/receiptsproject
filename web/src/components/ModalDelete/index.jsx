import './styles.css';

import { RowConfirm, Paper, ButtonConfirm, TitleT } from '../../styles';
import { makeStyles, Modal } from '@material-ui/core'
import api from '../../services/api';

const useStyles = makeStyles((theme) => ({
    pagination: {
        display: 'flex',
        backgroundColor: '#fafafa',
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

function ModalDelete( items, openDelete, handleCloseDelete, handleCloseDeleting ) {
    const classes = useStyles();

    const closingDelete = items.handleCloseDelete;
    const closeDeleting = items.handleCloseDeleting;
    const item = items.items;

    function handleDelete() {
        api.delete(`/receipts/${item.numeration}`)
            .then(() => {
                closeDeleting();
            }) 
            .catch(() => {
                alert('Erro ao excluir');
                closingDelete();
            });
    };

    return (
        <div className="all">
            <Modal
                open={items.openDelete}
                onClose={items.handleCloseDelete}
                className={classes.modal}
                disableAutoFocus
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Paper>
                    <TitleT>TEM CERTEZA QUE DESEJA DELETAR?</TitleT>
                    <RowConfirm>
                        <ButtonConfirm onClick={handleDelete}>
                            SIM
                        </ButtonConfirm>
                        <ButtonConfirm onClick={items.handleCloseDelete}>
                            NÃO
                        </ButtonConfirm>
                    </RowConfirm>
                </Paper>
            </Modal>
        </div>
)}

export default ModalDelete;