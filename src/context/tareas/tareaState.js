import React, { useReducer } from 'react';
import tareaContext from './tareaContext';
import tareaReducer from './tareaReducer';
import clienteAxios from '../../config/axios'


import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZA_TAREA,
    LIMPIAR_TAREA
} from '../../types' 

const TareaState = props => {
    const initialState = {   
        tareasproyecto: [],
        tareaseleccionada:null,
        errortarea: false
    }
    
    //crear dispatch y state
    const [state, dispatch] = useReducer(tareaReducer, initialState);

    //crear funciones 

    //obtener las tareas de un proyecto
    const obtenerTareas = async proyecto => {
       try {
        const resultado = await clienteAxios.get('/api/tareas',{ params: { proyecto }});
        dispatch({
            type: TAREAS_PROYECTO,
            payload: resultado.data.tareas
        })
       } catch (error) {
           console.log(error);
       }
    }

    //AGREGAR UNA TAREA AL PROYECTO SELECCIONADO
    const agregarTarea = async tarea => {
        try {
            const resultado = await clienteAxios.post('api/tareas', tarea)
            console.log(resultado);
            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            })
        } catch (error) {
            console.log(error);
        }
    }

    //valida y muestra un error en caso de que sea necesario
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //ELIMINA UNA TAREA DEL FORMTAREA
    const eliminarTarea = async (id, proyecto) => {
       try {
        await clienteAxios.delete(`/api/tareas/${id}`, {params: { proyecto }});
        dispatch({
            type: ELIMINAR_TAREA,
            payload: id
        })
       } catch (error) {
           
       }
    }

      //ACTUALIZAR TAREA DEL STATE
      const actualizarTarea = async tarea => {
       try {
        const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea)
        dispatch({
            type:ACTUALIZA_TAREA,
            payload: resultado.data.tarea
        })
       } catch (error) {
           console.log(error)
       }
    }

    //EXTRAE UNA TAREA PARA EDICION
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload:tarea
        })
    }


    //ELIMINA LA TAREASELECCIONADA
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }
    return (
        <tareaContext.Provider
            value={{
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </tareaContext.Provider>
    )
};

export default TareaState;