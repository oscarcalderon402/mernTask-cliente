import React, { Fragment, useContext } from 'react';
import Tarea from './Tarea'
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const ListadoTareas = () => {
    
    //extraer proyectos de state inicial
    const proyectosContex = useContext(proyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContex;

    //obtener tareas
    const tareasContex = useContext(tareaContext);
    const { tareasproyecto } = tareasContex;

    //si no hay proyecto selecionado
    if(!proyecto)return <h2>Selecciona un proyecto</h2>

    //array destructurin para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    

    const onClickEliminar = () => {
        eliminarProyecto(proyectoActual._id);
    }
    
    return (  
        <Fragment>
        <h2>Proyecto: {proyectoActual.nombre}</h2>
        <ul className="listado-tareas">
            {tareasproyecto.length === 0 
            ? (<li className="tarea"><p>No hay tareas</p></li>)
            : <TransitionGroup>
                {tareasproyecto.map(tarea => (
                <CSSTransition
                    key={tarea.id}
                    timeout={200}
                    classNames="tarea"
                >
                    <Tarea
                        tarea={tarea}
                        />
                </CSSTransition>
                    ))}
            </TransitionGroup>
            }
         
        </ul>
        <button
            type="button"
            className="btn btn-eliminar"
            onClick={onClickEliminar}
        >Eliminar Proyecto &times;</button>
        </Fragment>
    );
}
 
export default ListadoTareas;