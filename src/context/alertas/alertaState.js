import React, { useReducer } from 'react';
import alertaContext from './alertaContext';
import alertaReducer from './alertaReducer';

import {
    MOSTRAR_ALERTA, 
    OCULTAR_ALERTA
} from '../../types' 

const AlertaState = props => {
    
    const initialState = {
        alerta: null
    }

    //crear dispatch y state
    const [state, dispatch] = useReducer(alertaReducer, initialState);

    //funciones
    const mostrarAlerta = (msg, categoria) => {
        dispatch({
            type:  MOSTRAR_ALERTA,
            payload: {
                msg, 
                categoria
            }
        });

        // Después de 5 segundos limpiar la alerta
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 5000);
    }

    return (
        <alertaContext.Provider
            value={{
                alerta: state.alerta,
                mostrarAlerta
            }}
        >
            {props.children}
        </alertaContext.Provider>
    )
};

export default AlertaState;