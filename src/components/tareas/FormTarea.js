import React, {useContext, useState, useEffect} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext'

const FormTarea = () => {
    
    //extraer si un proyecto esta activo
     const proyectosContex = useContext(proyectoContext);
     const { proyecto } = proyectosContex;

     //extraer tarea
     const tareasContex = useContext(tareaContext);
     const { tareaseleccionada ,errortarea, agregarTarea, validarTarea, 
        obtenerTareas, actualizarTarea, limpiarTarea } = tareasContex;
    
     // effe que detecta si hay una tarea seleccionada
    useEffect(()=>{
        if(tareaseleccionada !==null){
            guardarTarea(tareaseleccionada)
        } else {
            guardarTarea({
                nombre:''
            })
        }
    }, [tareaseleccionada])

     //state del fomulario
     const [tarea, guardarTarea] = useState({
         nombre: ''

     })

     //extrear el nombre del proyecto
     const { nombre } = tarea;

     //si no hay proyecto selecionado
    if(!proyecto)return null;

    //array destructurin para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    //leer los valores 

    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    } 

    const onSubmit = e => {
        e.preventDefault();

        //validar
        if(nombre.trim() === '') {
            validarTarea();
            return;
        }

        //si es edicion si es una nueva tarea
        if(tareaseleccionada === null){
            //tarea nueva
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        } else {
            //actualizar tarea existente
            actualizarTarea(tarea);

            //elimina tarea selecionada
            limpiarTarea(tarea);
        }
      


        //obtener y filtrar las tareas actuales
        obtenerTareas(proyectoActual.id);

        //reiniciar el form
        guardarTarea({
            nombre: ''
        })
    }

    return ( 
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}                     
                        />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? 'Editar Tarea': 'Agregar Tarea'}
                        />

                </div>
            </form>
            {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p>:null}
        </div>
     );
}
 
export default FormTarea;