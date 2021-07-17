import Activity from "../Activities/Activity";
import { ModuleProgress } from "../ModuleProgress";
import i_writting from '../../assets/icons/teacher.png'


export default function EModule(props){
    
    return(
        <>
        <div className="container  w-6/12">
        <ModuleProgress moduleName="Modulo 1" percent={props.percent}></ModuleProgress>
        <div className="grid grid-cols-6">
        <Activity img={i_writting} percent={props.percent} name={"Gramática"} colspan={'col-span-6 md:col-span-2'}/>
        <Activity img={i_writting} percent={props.percent} name={"Vocabulario"} colspan={'col-span-3 md:col-span-2'}/>
        <Activity img={i_writting} percent={props.percent} name={"Escritura"} colspan={'col-span-3 md:col-span-2'}/>
        <Activity img={i_writting} percent={props.percent} name={"Escucha"} colspan={'col-span-3 md:col-span-2 md:col-start-2'}/>
        <Activity img={i_writting} percent={props.percent} name={"Pronunciación"} colspan={'col-span-3 md:col-span-2'}/>
        </div>
        </div>
        </>
    )
}