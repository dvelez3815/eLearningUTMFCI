import medalla from "../assets/icons/medalla.svg";


export function ModuleProgress(props) {
  return (
<div className="relative pt-1 max-w-7xl mx-auto px-8">
  <div className="flex flex-col sm:flex-row mb-7 items-center justify-between">
    <div>
      <span className="text-xl font-bold inline-block py-5 px-2 uppercase rounded-full text-amber-600 bg-amber-200">
        {props.moduleName}
      </span>
    </div>
    <figure>
        <img src={medalla} alt="medalla" className="absolute bottom-0 left-9" width="45px"/>
      </figure>  
    <div className="">
      <span className="text-xl font-bold inline-block text-amber-600">
        {props.percent}% COMPLETADO
      </span> 
        
    </div>
  </div>
  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-amber-200 h-4 border">
    {
      props.percent<25
      ?<div style={{width: `${props.percent}%`}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-400"></div>
      :props.percent<50
      ?<div style={{width: `${props.percent}%`}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-400"></div>
      :props.percent<70
      ?<div style={{width: `${props.percent}%`}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-600"></div>
      :props.percent<85
      ?
      <div style={{width: `${props.percent}%`}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-400"></div>
      :<div style={{width: `${props.percent}%`}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-600"></div>

    }
    
  </div>
</div>    
  );
}
