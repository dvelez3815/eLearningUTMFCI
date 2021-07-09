import medalla from "../assets/icons/medalla.svg";


export function ModuleProgress() {
  let data = 1;
  return (
<div className="relative pt-1 max-w-7xl mx-auto px-8">
  <div className="flex mb-2 items-center justify-between">
    <div>
      <span className="text-xs font-semibold inline-block py-5 px-2 uppercase rounded-full text-amber-600 bg-amber-200">
        MODULO {data}
      </span>
    </div>
    <figure>
        <img src={medalla} alt="medalla" className="absolute bottom-0 left-9" width="45px"/>
      </figure>  
    <div className="text-right">
      <span className="text-xs font-semibold inline-block text-amber-600">
        PROGRESO: 100%
      </span> 
        
    </div>
  </div>
  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-amber-200 h-4 border">
    <div style={{width: "100%"}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-400"></div>
  </div>
</div>    
  );
}
