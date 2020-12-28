import './styles.css';

import { RowCard, P, Strong, TitleR, PCard, Card } from '../../styles';
import { makeStyles } from '@material-ui/core'

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

function CardItem( receipt, handleOpen, handleActiveReceipt ) {
    const classes = useStyles();

    const openReceipt = receipt.handleOpen;

    const info = receipt.receipt;
    const setActiveReceipt = receipt.handleActiveReceipt;

    const department = info.departments;

    const toggleReceipt = () => {
        setActiveReceipt(info, department);
        openReceipt();
    }

    return (
        <div className="all">
            <Card className={classes.card} onClick={toggleReceipt}>
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
                <P hide>{department}</P>
            </Card>
        </div>
)}

export default CardItem;