import React from 'react';

import {NavComponent} from '../../components/NavComponent';
import { ModuleProgress } from '../../components/ModuleProgress';
import Activity from '../../components/Activities/Activity';
import i_writting from '../../assets/icons/teacher.png'
import { useEffect } from 'react';
import Activities from '../../components/Activities/Activities';

const ActivitiesPage = () => (
    <div>


      <div className="container  w-6/12">
      {/* <NavComponent logo={logo}></NavComponent> */}
      <ModuleProgress moduleName="Modulo 1" percent={100}></ModuleProgress>
      {/* <Activities modules={libro_ingles.modulos}></Activities> */}
      <div className="grid grid-cols-6">
      <Activity img={i_writting} percent={100} name={"Grammar"} colspan={'col-span-2'}/>
      <Activity img={i_writting} percent={100} name={"Grammar"} colspan={'col-span-2'}/>
      <Activity img={i_writting} percent={100} name={"Grammar"} colspan={'col-span-2'}/>
      <Activity img={i_writting} percent={100} name={"Grammar"} colspan={'col-span-2 col-start-2'}/>
      <Activity img={i_writting} percent={100} name={"Grammar"} colspan={'col-span-2'}/>
      </div>
      </div>






      <div className="container  w-6/12">
      {/* <NavComponent logo={logo}></NavComponent> */}
      <ModuleProgress moduleName="Modulo 1" percent={70}></ModuleProgress>
      {/* <Activities modules={libro_ingles.modulos}></Activities> */}
      <div className="grid grid-cols-6">
      <Activity img={i_writting} percent={70} name={"Grammar"} colspan={'col-span-2'}/>
      <Activity img={i_writting} percent={70} name={"Grammar"} colspan={'col-span-2'}/>
      <Activity img={i_writting} percent={70} name={"Grammar"} colspan={'col-span-2'}/>
      <Activity img={i_writting} percent={70} name={"Grammar"} colspan={'col-span-2 col-start-2'}/>
      <Activity img={i_writting} percent={70} name={"Grammar"} colspan={'col-span-2'}/>
      </div>
      </div>


      <div className="container  w-6/12">
      {/* <NavComponent logo={logo}></NavComponent> */}
      <ModuleProgress moduleName="Modulo 2" percent={69}></ModuleProgress>
      {/* <Activities modules={libro_ingles.modulos}></Activities> */}
      <div className="grid grid-cols-6">
      <Activity img={i_writting} percent={69} name={"Grammar"} colspan={'col-span-2'}/>
      <Activity img={i_writting} percent={69} name={"Grammar"} colspan={'col-span-2'}/>
      <Activity img={i_writting} percent={69} name={"Grammar"} colspan={'col-span-2'}/>
      <Activity img={i_writting} percent={69} name={"Grammar"} colspan={'col-span-2 col-start-2'}/>
      <Activity img={i_writting} percent={69} name={"Grammar"} colspan={'col-span-2'}/>
      </div>
      </div>

      <div className="container  w-6/12">
      {/* <NavComponent logo={logo}></NavComponent> */}
      <ModuleProgress moduleName="Modulo 3" percent={49}></ModuleProgress>
      {/* <Activities modules={libro_ingles.modulos}></Activities> */}
      <div className="grid grid-cols-6">
      <Activity img={i_writting} percent={49} name={"Grammar"} colspan={'col-span-2'}/>
      <Activity img={i_writting} percent={49} name={"Grammar"} colspan={'col-span-2'}/>
      <Activity img={i_writting} percent={49} name={"Grammar"} colspan={'col-span-2'}/>
      <Activity img={i_writting} percent={49} name={"Grammar"} colspan={'col-span-2 col-start-2'}/>
      <Activity img={i_writting} percent={49} name={"Grammar"} colspan={'col-span-2'}/>
      </div>
      </div>
 
      <div className="container  w-6/12">
      {/* <NavComponent logo={logo}></NavComponent> */}
      <ModuleProgress moduleName="Modulo 4" percent={21}></ModuleProgress>
      {/* <Activities modules={libro_ingles.modulos}></Activities> */}
      <div className="grid grid-cols-6">
      <Activity img={i_writting} percent={21} name={"Grammar"} colspan={'col-span-2'}/>
      <Activity img={i_writting} percent={21} name={"Grammar"} colspan={'col-span-2'}/>
      <Activity img={i_writting} percent={21} name={"Grammar"} colspan={'col-span-2'}/>
      <Activity img={i_writting} percent={21} name={"Grammar"} colspan={'col-span-2 col-start-2'}/>
      <Activity img={i_writting} percent={21} name={"Grammar"} colspan={'col-span-2'}/>
      </div>
      </div>                  

    </div>
  )

  export default ActivitiesPage