import './styles.css';

import { LabelInput, InputG } from "../../styles";

const Input = ({ label, name, ...rest }) => {
    return (
        <div className="input">
            <LabelInput htmlFor={name}>{label}</LabelInput>
            <InputG type="text" id={name} {...rest} />
        </div>
    );
}

export default Input;