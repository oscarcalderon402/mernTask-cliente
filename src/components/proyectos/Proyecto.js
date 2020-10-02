import React, { useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'


const Proyecto = ({proyecto}) => {
    //obetener el state de proyecto
    const proyectosContex = useContext(proyectoContext);
    const { proyectoActual } = proyectosContex;
    
    const tareasContex = useContext(tareaContext);
    const { obtenerTareas } = tareasContex;


    //funcion para agregar el proyecto actual
    const seleccionarProyecto = id => {
        proyectoActual(id); // fijar un proyecto actual
        obtenerTareas(id); // filtrar las tareas cuando se de click

    }

    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={()=>seleccionarProyecto(proyecto._id)}
            >{proyecto.nombre}</button>
        </li>
     );
}
 
export default Proyecto;