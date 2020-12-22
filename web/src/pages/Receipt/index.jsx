import { React, useState, useRef, useEffect } from 'react';
import './styles.css';

import Menu from '../../components/Menu';
import { ColumnTotal, Container, RowCard, TitleP, Paper, ButtonSave, RowCard2, P3Italic, RowCard4, RowCard3, ReceiptPaper, Logo, ColumnReceipt, H2, H4, P2, P3, P4, H1, ColumnReceipt2, CheckBox, CheckBoxGrid, GridCard } from '../../styles';
import { Pagination } from '@material-ui/lab';
import { makeStyles, Modal } from '@material-ui/core';
import LocalPrintshopIcon from '@material-ui/icons/LocalPrintshop';
import { useReactToPrint } from 'react-to-print';
import LogoUIECB from '../../assets/logo-uiecb-preta.png';
import Number from 'numero-por-extenso';
import CardItem from '../../components/CardItem'; 

import api from '../../services/api';

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

function Receipt() {
    const classes = useStyles();
    const [receipts, setReceipts] = useState([]);
    // const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [info, setInfo] = useState([]);
    const [hide, setHide] = useState(false);
    const [department, setDepartment] = useState([""]);
    const [junta, setJunta] = useState(false);
    // const [comec, setComec] = useState(false);
    // const [dem, setDem] = useState(false);
    // const [couac, setCouac] = useState(false);
    // const [projeto, setProjeto] = useState(false);
    // const [dam, setDam] = useState(false);
    // const [det, setDet] = useState(false);
    // const [ageral, setAgeral] = useState(false);
    // const [stcrj, setStcrj] = useState(false);
    const componentRef = useRef();
    const numero = Number;
    const item = info;

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const toggleHide = async () => {
        setHide(false);
        
        setTimeout(setHide(true), 3000)
    }

    const printDualCopies = async () => {
        await toggleHide();
        setTimeout(handlePrint(), 200);
    };

    const handleOpen = () => {
        loadDepartment()
            .then(departamentos => {
                if(department?.includes('Junta Geral')) {
                    setJunta(true);
                }
            })

        settingOpen();
    }

    const settingOpen = () => {
        setOpen(true);
    };

    const loadDepartment = async () => {
        setDepartment(item.departments);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangePage = (event, value) => {
        setPage(value);
        loadReceipts(value);
    };

    const handleActiveReceipt = (receipt) => {
        setInfo(receipt);
    };

    async function loadReceipts(page, value) {
        const response = await api.get('receipts', {
            params: { page }
        });

        console.log(response.data)

        setReceipts(response.data.reverse());
    }

    // const loadTotal = () => {
    //     setTotal(receipts.length);
    // }

    useEffect(() => {
        setJunta(true);
    }, [])
    
    useEffect(() => {
        loadReceipts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="all">
            <Menu />
            <Container>
                <ColumnTotal>
                    <TitleP>
                        Recibos
                    </TitleP>
                </ColumnTotal>
                <Pagination className={classes.pagination} page={page} onChange={handleChangePage} count={10} />
                <GridCard>
                    {receipts.map( receipt => {return <CardItem key={receipt.numeration} receipt={receipt} handleOpen={handleOpen} handleActiveReceipt={handleActiveReceipt} />; })}
                </GridCard>
            </Container>
            {department && <Modal
                open={open}
                onClose={handleClose}
                className={classes.modal}
                disableAutoFocus
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Paper>
                    <ButtonSave onClick={printDualCopies}>
                        SALVAR OU IMPRIMIR
                        <LocalPrintshopIcon className={classes.icon} />
                    </ButtonSave>
                    <div className="add-all" ref={componentRef}>
                    <ReceiptPaper>
                        <RowCard>
                            <Logo src={LogoUIECB} alt="Logo"/>
                            <ColumnReceipt>
                                <H2>UNIÃO DAS IGREJAS EVANGÉLICAS CONGREGACIONAIS DO BRASIL - UIECB</H2>
                                <H4>CNPJ: 33.997.297/0001-60</H4>
                                <P2>Rua Visconde Inhaúma, 134 - Grupo 1901/1924 - Centro - CEP 200091-007 - Rio de Janeiro - RJ</P2>
                                <P2>E-mail: secretaria@uiecb.com.br - Tel: (21) 2203-8850</P2>
                            </ColumnReceipt>
                        </RowCard>
                        <RowCard2>
                            <ColumnReceipt2>
                                <H1>RECIBO</H1>
                                <P2>Nº {item.numeration}</P2>
                            </ColumnReceipt2>
                            <H1>{Intl.NumberFormat('pt-BR', { 
                                    style: 'currency', 
                                    currency: 'BRL' 
                                }).format(item.value)}</H1>
                            <ColumnReceipt2>
                                <P3>Débito:{Intl.NumberFormat('pt-BR', { 
                                            style: 'currency', 
                                            currency: 'BRL' 
                                        }).format(item.debit)} | C.C. _________</P3>
                                <P3>Crédito:{Intl.NumberFormat('pt-BR', { 
                                            style: 'currency', 
                                            currency: 'BRL' 
                                        }).format(item.credit)} | C.C. _________</P3>
                            </ColumnReceipt2>
                        </RowCard2>
                        <RowCard>
                            <P3>Recebemos da(o) {item.sender}</P3>
                            <P3>A.R.:________________________________________________</P3>
                        </RowCard>
                        <RowCard>
                            <P4>A importância de {Intl.NumberFormat('pt-BR', { 
                                                            style: 'currency', 
                                                            currency: 'BRL' 
                                                        }).format(item.value)} ({numero.porExtenso(`${item.value}`, numero.estilo.monetario)}) referente à {item.referring}.</P4>
                        </RowCard>
                        <RowCard3>
                            <H2>Departamentos:</H2>
                            <P3>Rio de Janeiro, {item.date}</P3>
                        </RowCard3>
                        <RowCard3>
                            <CheckBoxGrid>
                                <CheckBox>
                                    <input type="checkbox" id="junta" name="junta" checked={department?.includes('Junta Geral')} />
                                    <label for="junta">Junta Geral</label>
                                </CheckBox>
                                {/* <CheckBox>
                                    <input type="checkbox" id="comec" name="comec" checked={department.includes('COMEC')} />
                                    <label for="comec">COMEC</label>
                                </CheckBox>
                                <CheckBox>
                                    <input type="checkbox" id="dem" name="dem" checked={department.includes('DEM')} />
                                    <label for="dem">DEM</label>
                                </CheckBox>
                                <CheckBox>
                                    <input type="checkbox" id="couac" name="couac" checked={department.includes('COUAC')} />
                                    <label for="couac">COUAC</label>
                                </CheckBox>
                                <CheckBox>
                                    <input type="checkbox" id="projeto" name="projeto" checked={department.includes('Projeto')} />
                                    <label for="projeto">Projeto</label>
                                </CheckBox>
                                <CheckBox>
                                    <input type="checkbox" id="dam" name="dam" checked={department.includes('DAM')} />
                                    <label for="dam">DAM</label>
                                </CheckBox>
                                <CheckBox>
                                    <input type="checkbox" id="det" name="det" checked={department.includes('DET')} />
                                    <label for="det">DET</label>
                                </CheckBox>
                                <CheckBox>
                                    <input type="checkbox" id="a-geral" name="a.geral" checked={department.includes('A. Geral')} />
                                    <label for="a.geral">A. Geral</label>
                                </CheckBox>
                                <CheckBox>
                                    <input type="checkbox" id="stcrj" name="stcrj" checked={department.includes('STCRJ')} />
                                    <label for="stcrj">STCRJ</label>
                                </CheckBox>
                                <CheckBox>
                                    <input type="checkbox" id="confeuhec" name="confeuhec" checked={department.includes('CONFEUHEC')} />
                                    <label for="confeuhec">CONFEUHEC</label>
                                </CheckBox> */}
                            </CheckBoxGrid>
                            <ColumnReceipt>
                                <P3>__________________________________________</P3>
                                <P3Italic>Pelo Tesoureiro</P3Italic>
                            </ColumnReceipt>
                        </RowCard3>
                        <RowCard4>
                            <H2>OBS.: </H2>
                            <P3>{item.observation}</P3>
                        </RowCard4>
                    </ReceiptPaper>
                    <ReceiptPaper hide={hide}>
                        <RowCard>
                            <Logo src={LogoUIECB} alt="Logo"/>
                            <ColumnReceipt>
                                <H2>UNIÃO DAS IGREJAS EVANGÉLICAS CONGREGACIONAIS DO BRASIL - UIECB</H2>
                                <H4>CNPJ: 33.997.297/0001-60</H4>
                                <P2>Rua Visconde Inhaúma, 134 - Grupo 1901/1924 - Centro - CEP 200091-007 - Rio de Janeiro - RJ</P2>
                                <P2>E-mail: secretaria@uiecb.com.br - Tel: (21) 2203-8850</P2>
                            </ColumnReceipt>
                        </RowCard>
                        <RowCard2>
                            <ColumnReceipt2>
                                <H1>RECIBO</H1>
                                <P2>Nº {item.numeration}</P2>
                            </ColumnReceipt2>
                            <H1>{Intl.NumberFormat('pt-BR', { 
                                    style: 'currency', 
                                    currency: 'BRL' 
                                }).format(item.value)}</H1>
                            <ColumnReceipt2>
                                <P3>Débito:{Intl.NumberFormat('pt-BR', { 
                                            style: 'currency', 
                                            currency: 'BRL' 
                                        }).format(item.debit)} | C.C. _________</P3>
                                <P3>Crédito:{Intl.NumberFormat('pt-BR', { 
                                            style: 'currency', 
                                            currency: 'BRL' 
                                        }).format(item.credit)} | C.C. _________</P3>
                            </ColumnReceipt2>
                        </RowCard2>
                        <RowCard>
                            <P3>Recebemos da(o) {item.sender}</P3>
                            <P3>A.R.:________________________________________________</P3>
                        </RowCard>
                        <RowCard>
                            <P4>A importância de {Intl.NumberFormat('pt-BR', { 
                                                            style: 'currency', 
                                                            currency: 'BRL' 
                                                        }).format(item.value)} ({numero.porExtenso(`${item.value}`, numero.estilo.monetario)}) referente à {item.referring}.</P4>
                        </RowCard>
                        <RowCard3>
                            <H2>Departamentos:</H2>
                            <P3>Rio de Janeiro, {item.date}</P3>
                        </RowCard3>
                        <RowCard3>
                            <CheckBoxGrid>
                                {/* <CheckBox>
                                    <input type="checkbox" id="junta" name="junta" checked={department.includes('Junta Geral')} />
                                    <label for="junta">Junta Geral</label>
                                </CheckBox>
                                <CheckBox>
                                    <input type="checkbox" id="comec" name="comec" checked={department.includes('COMEC')} />
                                    <label for="comec">COMEC</label>
                                </CheckBox>
                                <CheckBox>
                                    <input type="checkbox" id="dem" name="dem" checked={department.includes('DEM')} />
                                    <label for="dem">DEM</label>
                                </CheckBox>
                                <CheckBox>
                                    <input type="checkbox" id="couac" name="couac" checked={department.includes('COUAC')} />
                                    <label for="couac">COUAC</label>
                                </CheckBox>
                                <CheckBox>
                                    <input type="checkbox" id="projeto" name="projeto" checked={department.includes('Projeto')} />
                                    <label for="projeto">Projeto</label>
                                </CheckBox>
                                <CheckBox>
                                    <input type="checkbox" id="dam" name="dam" checked={department.includes('DAM')} />
                                    <label for="dam">DAM</label>
                                </CheckBox>
                                <CheckBox>
                                    <input type="checkbox" id="det" name="det" checked={department.includes('DET')} />
                                    <label for="det">DET</label>
                                </CheckBox>
                                <CheckBox>
                                    <input type="checkbox" id="a-geral" name="a.geral" checked={department.includes('A. Geral')} />
                                    <label for="a.geral">A. Geral</label>
                                </CheckBox>
                                <CheckBox>
                                    <input type="checkbox" id="stcrj" name="stcrj" checked={department.includes('STCRJ')} />
                                    <label for="stcrj">STCRJ</label>
                                </CheckBox>
                                <CheckBox>
                                    <input type="checkbox" id="confeuhec" name="confeuhec" checked={department.includes('CONFEUHEC')} />
                                    <label for="confeuhec">CONFEUHEC</label>
                                </CheckBox> */}
                            </CheckBoxGrid>
                            <ColumnReceipt>
                                <P3>__________________________________________</P3>
                                <P3Italic>Pelo Tesoureiro</P3Italic>
                            </ColumnReceipt>
                        </RowCard3>
                        <RowCard4>
                            <H2>OBS.: </H2>
                            <P3>{item.observation}</P3>
                        </RowCard4>
                    </ReceiptPaper>
                    </div>
                </Paper>
            </Modal>}
        </div>
    )
}

export default Receipt;