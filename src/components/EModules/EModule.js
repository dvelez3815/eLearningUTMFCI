import Activity from "../Activities/Activity";
import { ModuleProgress } from "../ModuleProgress";
import i_writting from '../../assets/icons/teacher.png'


export default function EModule(props){

    return(
        <>
        <div className="">
        <ModuleProgress moduleName="Modulo 1" percent={props.percent}></ModuleProgress>
        <div className="grid grid-cols-6">
        <Activity img={i_writting} percent={props.percent} name={"Gramática"} colspan={'col-span-1 col-start-2 sm:col-span-2 sm:col-start-1'}/>
        <Activity img={i_writting} percent={props.percent} name={"Vocabulario"} colspan={'col-span-1 col-start-4 sm:col-start-3 sm:col-span-2'}/>
        <Activity img={i_writting} percent={props.percent} name={"Escritura"} colspan={'col-span-1 col-start-2 sm:col-start-5 sm:col-span-2'}/>
        <Activity img={i_writting} percent={props.percent} name={"Escucha"} colspan={'col-span-1 col-start-4 sm:col-start-2 sm:col-span-2'}/>
        <Activity img={i_writting} percent={props.percent} name={"Pronunciación"} colspan={'col-span-1 col-start-2 sm:col-start-4 sm:col-span-2'}/>        
        </div>
        </div>
        </>
    )
}