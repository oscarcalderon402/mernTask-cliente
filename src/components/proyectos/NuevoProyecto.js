import React, { Fragment, useState, useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext'

const NuevoProyecto = () => {

    //obtener el state del formulario
    const proyectosContex = useContext(proyectoContext);
    const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = 
    proyectosContex;

    //state pra proyecto
    const [ proyecto, guardarProyecto] = useState({
        nombre: ''
    });

    //extraer nombre del proyecto
    const {nombre}= proyecto;

    //Lee los contenidos del input
    const onChangeProyecto = e => {
        guardarProyecto ({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    //cuando el usuario envia un proyecto
    const onSubmitProyecto = e =>{
        e.preventDefault();

        //validar
        if(nombre === ''){
            mostrarError();
            return;
        }
        //agregar al state
        agregarProyecto(proyecto);
        //reiniciar el form
        guardarProyecto({
            nombre: ''
        })
    }

    const onClick = () => {
        mostrarFormulario();
    }

    return (
        <Fragment>
        <button
            type="button"
            className="btn btn-block btn-primario"
            onClick={onClick}
        >Nuevo Proyecto</button>
        {formulario 
        ?
        (
            <form
            className="formulario-nuevo-proyecto"
            onSubmit={onSubmitProyecto}
        >
            <input 
                type="text" 
                className="input-text" 
                placeholder="Nombre Proyecto" 
                name="nombre"
                value={nombre}
                onChange={onChangeProyecto}
                />
                <input 
                type="submit" 
                className="btn btn-primario btn-block" 
                value="Agregar Proyecto"
                />
        </form>
        ) 
        
        : null}
        { errorformulario ?<p className="mensaje error">El nombre del Proyecto es obligatorio</p> : null }
        </Fragment> 
     );
}
 
export default NuevoProyecto;