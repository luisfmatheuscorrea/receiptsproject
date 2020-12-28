import './styles.css';

import SearchIcon from '@material-ui/icons/Search';

import { IconButton2, InputG, RowCard } from "../../styles";
import { makeStyles, useTheme } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    icon: {
      width: 40,
      height: 40,
    },
  }));

const InputFilter = ({ loadReceiptsFiltered, label, name, ...rest }) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <form className="input-filter" onSubmit={loadReceiptsFiltered}>
            <RowCard>
                <InputG placeholder="Filtre pelo Pagador" type="text" id={name} {...rest} />
                <button type="submit">
                    <SearchIcon className={classes.icon} />
                </button>
            </RowCard>
        </form>
    );
}

export default InputFilter;