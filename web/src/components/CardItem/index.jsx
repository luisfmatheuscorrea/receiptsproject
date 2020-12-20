import './styles.css';

import { P, PCard, RowCard, Strong, TitleR, Card } from '../../styles';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    pagination: {
        display: 'flex',
        marginTop: '1.2rem',
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

function CardItem( receipt, handleOpen, handleActiveReceipt ) {
    const classes = useStyles();

    const openReceipt = receipt.handleOpen;
    const setActiveReceipt = receipt.handleActiveReceipt;
    const info = receipt.receipt;

    const activeReceipt = () => {
        setActiveReceipt(info);
        openReceipt();
    }

    return (
        <Card className={classes.card} onClick={activeReceipt}>
            <RowCard>
                <TitleR>
                    Recibo de <Strong>{info.sender}</Strong> Nº{info.numeration}
                </TitleR>
                <PCard>
                    Data: <Strong>{info.date}</Strong>
                </PCard>
            </RowCard>
            <RowCard>
                <div className="text">
                    <P>Valor: {Intl.NumberFormat('pt-BR', { 
                        style: 'currency', 
                        currency: 'BRL' 
                    }).format(info.value)}</P>
                </div>
                <div className="text">
                    <P>Crédito: {Intl.NumberFormat('pt-BR', { 
                        style: 'currency', 
                        currency: 'BRL' 
                    }).format(info.credit)}</P>
                </div>
                <div className="text">
                    <P>Débito: {Intl.NumberFormat('pt-BR', { 
                        style: 'currency', 
                        currency: 'BRL' 
                    }).format(info.debit)}</P>
                </div>
            </RowCard>
        </Card>
)}

export default CardItem;