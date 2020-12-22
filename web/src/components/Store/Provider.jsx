import Context from './Context';
import useStorage from '../../services/useStorage';

const StoreProvider = ({ children }) => {
    const [token, setToken] = useStorage('token');

    return (
        <Context.Provider
            value={{
                token,
                setToken,
            }}
        >
            {children}
        </Context.Provider>
    )
}

export default StoreProvider;