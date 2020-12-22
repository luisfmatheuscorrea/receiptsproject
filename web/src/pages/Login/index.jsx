import { React, useContext, useState } from 'react';
import './styles.css';

// import LogoUIECB from '../../assets/logo-uiecb-preta.png';

import Input from '../../components/Input';

import { ContainerLogin, PaperLogin, ButtonGray, TitleP } from '../../styles';
import { Divider } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import StoreContext from '../../components/Store/Context';

function login({ user, password }) {
    if (user === `uiecb` && password === process.env.REACT_APP_USER_PASSWORD) {
      return { token: '1234' };
    }
    return { error: 'Usuário ou senha inválido' };
}

function Login() {
    const [values, setValues] = useState({ user: '', password: '' });
    const [error, setError] = useState(null);
    const { setToken } = useContext(StoreContext);
    const history = useHistory();

    function initialState() {
        setValues({ user: '', password: '' });
    }
    
      function onSubmit(e) {
        e.preventDefault();
    
        const { token, error } = login(values);
    
        if (token) {
          setToken(token);
          return history.push('/');
        }
        
        console.log(process.env.REACT_APP_USER_PASSWORD);
        setError(error);
        initialState();
      }

    return (
        <div className="all">
            <ContainerLogin>
                <PaperLogin>
                    <form onSubmit={onSubmit}>
                        <TitleP>
                            LOGIN
                        </TitleP>
                        {/* <Input 
                            id="user"
                            name="user"
                            label="Usuário"
                            type="text"
                            value={user}
                            onChange={(e) => { setUser(e.target.value) }}
                        /> */}
                        <Input 
                            id="user"
                            name="user"
                            label="Usuário"
                            type="text"
                            value={values.user}
                            onChange={(e) => { setValues({...values, user: e.target.value}) }}
                        />
                        <Divider />
                        <Input 
                            id="password"
                            name="password"
                            label="Senha"
                            type="password"
                            value={values.password}
                            onChange={(e) => { setValues({...values, password: e.target.value}) }}
                        />
                        {error && (
                            <div className="error">{error}</div>
                        )}
                        <ButtonGray type="submit">
                            ENTRAR
                        </ButtonGray>
                    </form>
                </PaperLogin>
            </ContainerLogin>
        </div>
    )
}

export default Login;