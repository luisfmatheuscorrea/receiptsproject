import { React, useState } from 'react';

import './styles.css';

import Menu from '../../components/Menu';
import { ButtonGray, ColumnSpace, ColumnTotal, Form, GridDepartments, LabelInput, TitleP, TitleR, ColumnReceipt3 } from '../../styles';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import items from '../../services/items.json';

import api from '../../services/api';
import { makeStyles, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';

function CreateReceipt() {
    const [sender, setSender] = useState('');
    const [receivement, setReceivement] = useState('');
    const [value, setValue] = useState();
    const [debit, setDebit] = useState();
    const [credit, setCredit] = useState();
    const [referring, setReferring] = useState('');
    const [departments, setDepartments] = useState(['']);
    const [observation, setObservation] = useState('');
    const [date, setDate] = useState(['']);
    const [typeAlert, setTypeAlert] = useState("");
    const [textAlert, setTextAlert] = useState("");
    const [openAlert, setOpenAlert] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [openOthers, setOpenOthers] = useState(false);
    const history = useHistory();

    const handleAlert = () => {
        setOpenAlert(!openAlert);
    }

    const addAlert = () => {
        setTextAlert("Recibo criado com sucesso!");
        setTypeAlert("success");
        handleAlert();
        goToReceipts();
    }

    function formatDate() {
        setDate(date.split('-').reverse().join('/'));
    }

    const errorAlert = () => {
        setTextAlert("Algo deu errado!");
        setTypeAlert("error");
        handleAlert();
    }

    const handleOpenOthers = () => {
        setOpenOthers(true);
    }

    const useStyles = makeStyles({
        message: {
            fontSize: 16,
        },
    });
    
    const classes = useStyles();

    const goToReceipts = () => {
        setTimeout(() => {
            history.push("/");
        }, 3000);
    }

    function handleCreateReceipt(e) {
        e.preventDefault();

        setDepartments(selectedItems);
        formatDate();

        api.post('receipts', {
            sender,
            departments,
            receivement,
            value,
            debit,
            credit,
            date,
            referring,
            observation,
        }).then(() => {
            addAlert();
        }).catch(() => {
            errorAlert();
        });
    }

    function handleSelectItem( title ) {
        const alreadySelected = selectedItems.findIndex(item => item === title);

        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== title);

            setSelectedItems(filteredItems);
        } else {
            setSelectedItems([ ...selectedItems, title ]);
        }

        setDepartments(selectedItems);
    }

    return (
        <div className="all">
            <Snackbar open={openAlert} autoHideDuration={4000} onClose={handleAlert}>
                <Alert onClose={handleAlert} className={classes.message} severity={typeAlert}>
                    {textAlert}
                </Alert>
            </Snackbar>
            <Menu />
            <Form onSubmit={handleCreateReceipt}>
                <ColumnTotal>
                    <TitleP>Criar Recibo</TitleP>
                </ColumnTotal>
                <ColumnSpace>
                    <Input 
                        name="sender" 
                        label="Recebemos da(o)"
                        required="required"
                        value={sender} 
                        onChange={(e) => { setSender(e.target.value) }}
                    />
                    <Input 
                        name="receivement" 
                        label="Aviso de Recebimento"
                        value={receivement} 
                        onChange={(e) => { setReceivement(e.target.value) }}
                    />
                </ColumnSpace>
                <ColumnSpace>
                    <Input 
                        name="value" 
                        label="Valor"
                        type="number"
                        required="required"
                        value={value} 
                        onChange={(e) => { setValue(e.target.value) }}
                    />
                    <Input 
                        name="referring"
                        label="Valor Referente à"
                        value={referring}
                        onChange={(e) => { setReferring(e.target.value) }}
                    />
                </ColumnSpace>
                <ColumnSpace>
                    <Input 
                        name="credit"
                        label="Crédito"
                        type="number"
                        value={credit}
                        onChange={(e) => { setCredit(e.target.value) }}
                    />
                    <Input 
                        name="debit"
                        label="Débito"
                        type="number"
                        value={debit}
                        onChange={(e) => { setDebit(e.target.value) }}
                    />
                    <Input 
                        name="date"
                        label="Data"
                        type="date"
                        value={date}
                        onChange={(e) => { setDate(e.target.value) }}
                    />
                </ColumnSpace>
                <ColumnReceipt3>
                    <TitleR>Departamentos</TitleR>
                    <LabelInput>Selecione um ou mais</LabelInput>
                    <GridDepartments>
                        {items.map(item => (
                            <li 
                                key={item.id} 
                                onClick={() => handleSelectItem(item.title)}
                                className={selectedItems.includes(item.title) ? 'selected' : ''}
                            >
                                <span>{item.title}</span>
                            </li>
                        ))}
                            <li
                                onClick={handleOpenOthers}
                            >
                                <span>Outros</span>
                            </li>
                            <input
                                name="other"
                                placeholder="Digite aqui e pressione Enter para confirmar"
                                className={openOthers ? 'visible' : 'hide'}
                                // value={other}
                                onKeyPress={(e) => { 
                                    if (e.key === "Enter") {
                                        setSelectedItems([ ...selectedItems, e.target.value]) }}
                                    }
                            />
                    </GridDepartments>
                </ColumnReceipt3>
                <ColumnSpace>
                    <Textarea 
                        name="observation"
                        label="Observações"
                        value={observation}
                        onChange={(e) => { setObservation(e.target.value) }}
                    />
                </ColumnSpace>
                <ButtonGray type="submit">
                    CRIAR RECIBO
                </ButtonGray>
            </Form>
        </div>
    )
}

export default CreateReceipt;