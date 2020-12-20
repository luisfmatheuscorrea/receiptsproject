import './styles.css';

import { LabelInput, TextareaG } from "../../styles";

const Textarea = ({ label, name, ...rest }) => {
  return (
    <div className="textarea-block">
      <LabelInput htmlFor={name}>{label}</LabelInput>
      <TextareaG id={name} {...rest} />
    </div>
  );
}

export default Textarea;