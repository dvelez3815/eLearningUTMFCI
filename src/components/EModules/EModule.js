import Activity from "../Activities/Activity";
import { ModuleProgress } from "../ModuleProgress";
import i_writting from '../../assets/icons/teacher.png'


export default function EModule(){
    
    return(
        <>
        <div className="container  w-4/5">
        <ModuleProgress moduleName="Modulo 1" percent={100}></ModuleProgress>
        <div className="grid grid-cols-6">
        <Activity img={i_writting} percent={100} name={"Gramática"} colspan={'col-span-6 md:col-span-2'}/>
        <Activity img={i_writting} percent={100} name={"Vocabulario"} colspan={'col-span-3 md:col-span-2'}/>
        <Activity img={i_writting} percent={100} name={"Escritura"} colspan={'col-span-3 md:col-span-2'}/>
        <Activity img={i_writting} percent={100} name={"Escucha"} colspan={'col-span-3 md:col-span-2 md:col-start-2'}/>
        <Activity img={i_writting} percent={100} name={"Pronunciación"} colspan={'col-span-3 md:col-span-2'}/>
        </div>
        </div>
        </>
    )
}