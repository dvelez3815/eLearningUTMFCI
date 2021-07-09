import Activity from "./Activity";

import algo from '../../assets/icons/teacher.png'

export default function Activities(props){
    let images = [];
    return(
        <div>
            {props.modules.map((englishModule,index)=>{
                // img[0] = require(e.imagenes[index])
                englishModule.imagenes.map((image, index)=>{
                    let t2 = String(image)
                    // images[index] = require(t2);
                    console.log(t2);
                })                
                
                return <Activity img={algo} percent={1}/>
            })}
        </div>
        
        
    );
}