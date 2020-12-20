import styled from "styled-components";

export const Modal = styled.div`
    background-color: #00eab79c;

    height: 100vh;
    width: 100vw;

    position: fixed;
    top: 0;
    right: 0;

    display: ${props => props.open ? "flex" : "none"};
    justify-content: center;
    align-items: center;

    z-index: -2;

    transition: 400ms;
`;

export const Container = styled.div`
    background-color: #FAFAFA;

    height: 99.4vh;
    width: 100vw;

    /* float: center; */

    margin: -10px -8px -10px -8px;

    /* display: ${props => props.open ? "flex" : "none"}; */
    display: flex;
    flex-direction: column;
    justify-content: normal;
    align-items: center;

    font: 1.6rem Montserrat;

    transition: 400ms;
`;

export const Form = styled.form`
    background-color: #FAFAFA;

    width: 100vw;

    margin: -10px -8px -10px -8px;

    display: flex;
    flex-direction: column;
    align-items: center;

    font: 1.6rem Montserrat;

    transition: 400ms;
`;

export const InputG = styled.input`
    width: 100%;
    height: 3.6rem;
    margin-top: 0;
    border-radius: 0.8rem;
    border: none;
    outline: 0;
    background: none;
    
    font: 1.6rem Montserrat;
`;

export const ButtonGray = styled.button`
    padding: 15px 40px 15px 40px;
    background-image: linear-gradient(to left, #D3CCE3, #E9E4F0);
    border-radius: 0.8rem;
    border: none;
    margin-top: 4rem;
    margin-bottom: 5rem;
    box-shadow: 0 4px 14px #00000073;

    font: 1.6rem Montserrat;

    cursor: pointer;

    transition: 400ms ease;

    &:hover {
        transform: scale(1.03, 1.03);
        box-shadow: 0 4px 10px #00000073;
        /* transform: scaleY(1.1); */
    }
`;

export const TextareaG = styled.textarea`
    width: 100%;
    height: 10rem;
    min-height: 8rem;
    margin-top: 0.3rem;
    border: 2px solid #313131;
    outline: 0;
    resize: vertical;
    padding: 1.2rem 1.6rem;
    background: none;

    font: 1.6rem Montserrat;
`;

export const LabelInput = styled.label`
    font-size: 1.2rem;
`;

export const TitleP = styled.h1`
    font: 3rem Montserrat;
    font-weight: 500;
`;

export const TitleR = styled.h3`
    font: 2rem Montserrat;
    font-weight: 400;
    text-overflow: ellipsis;
    margin: 0 0 0 0;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    width: 90%;
`;

export const Strong = styled.strong`
    font-size: 2rem;
    font-weight: 500px;
    margin: 0 0 0 0;
`;

export const P = styled.p`
    font-size: 1.2rem;
    margin: 5px 0 0 0;
`;

export const PCard = styled(P)`
    margin-bottom: 0;
    margin: 0 0 0 0;
`;

export const RowCard = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const GridCard = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: space-between;
    align-items: center;
`;

export const GridDepartments = styled.ul`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
    justify-content: center;
    align-items: center;
`;

export const RowCard2 = styled(RowCard)`
    margin-top: 20px;
    /* align-items: normal; */
`;

export const RowCard3 = styled(RowCard)`
    margin-top: 3px;
    /* align-items: normal; */
`;

export const RowCard4 = styled(RowCard)`
    margin-top: 5px;
    align-items: normal;
`;

export const ColumnReceipt = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-family: Montserrat;
`;

export const ColumnReceipt2 = styled(ColumnReceipt)`
    justify-content: right;
`;

export const ColumnReceipt3 = styled(ColumnReceipt2)`
    margin-top: 2.5rem;
    margin-bottom: -2.5rem;
`;

export const Logo = styled.img`
    width: 100px;
    margin: 0 -10px 0 -20px;
`;

export const ColumnTotal = styled(Column)`
    width: 100%;
    
    box-shadow: 0 4px 10px #00000073;
`;

export const ColumnMargin = styled(Column)`
    text-align: left;
`;

export const ColumnSpace = styled(Column)`
    margin-top: 1.6rem;
`;

export const IconButton = styled.img`
    margin-right: 0.8rem;
`;

export const Card = styled.div`
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
    margin: 1.2rem 10px 0 10px;
    padding: 30px 40px 30px 40px;
    width: 800px;

    transition: 400ms ease;

    cursor: pointer;

    &:hover {
        transform: scale(1.01, 1.01);
    }
`;

export const Paper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #fafafa;
    padding: 20px 40px;
    border-radius: 5px;
    justify-content: center;
`;

export const ReceiptPaper = styled.div`
    display: ${props => props.hide ? 'none' : 'flex'};
    flex-direction: column;
    padding: 10px 10px;
    font-family: Montserrat;
    max-width: 757px;
`;

export const ButtonSave = styled.div`
    width: fit-content;
    padding: 10px 15px;
    display: flex;
    align-items: center;
    font: 1.2rem Montserrat;
    border-radius: 10px;

    transition: 400ms ease;

    cursor: pointer;

    &:hover {
        background-color: #dadada;
    }
`;

export const H1 = styled.h1`
    font-size: 30px;
    margin: 0;
`;

export const H2 = styled.h2`
    font-size: 18px;
    margin: 0;
`;

export const H4 = styled.h4`
    font-size: 16px;
    margin: 0;
`;

export const P2 = styled.p`
    font-size: 14px;
    margin: 0;
`;

export const P3 = styled.p`
    font-size: 16px;
    margin: 0;
`;

export const P3Italic = styled(P3)`
    font-style: italic;
    font-weight: 600;
`;

export const P4 = styled.p`
    font-size: 16px;
    margin-top: 3px;
    padding: 0;
`;

export const CheckBoxGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2px;
`;

export const CheckBox = styled.div`
    display: block;
    margin: 0;
    padding: 0;
`;