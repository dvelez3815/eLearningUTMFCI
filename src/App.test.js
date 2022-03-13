import { render, screen } from '@testing-library/react';
import { useEffect, useRef, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';
import shortid from "shortid";



test('existe ejercicio opcion correcta para un libro x', async() => {
  const url = `${process.env.REACT_APP_API_URL}/book/1`;
  const data = await getData(url);
  const ejerciciosjsx = ejerciciosOpcionCorrecta1(data);
  render(ejerciciosjsx[0]);
  const linkElement = await screen.findByText(/Choose/i);
  expect(linkElement).toBeInTheDocument();
});
test('existe ejercicio opcion correcta_N para un libro x', async() => {
  const url = `${process.env.REACT_APP_API_URL}/book/1`;
  const data = await getData(url);
  const ejerciciosjsx = ejerciciosOpcionCorrectaN(data);
  render(ejerciciosjsx[0]);
  const linkElement = await screen.findByText(/Choose/i);
  expect(linkElement).toBeInTheDocument();
});
test('existe ejercicios verdaero falso para un libro x', async() => {
  const url = `${process.env.REACT_APP_API_URL}/book/1`;
  const data = await getData(url);
  const ejerciciosjsx = ejerciciosVerdaderoFalso(data);
  render(ejerciciosjsx[0]);
  const linkElement = await screen.findByText(/true or false/i);
  expect(linkElement).toBeInTheDocument();
});
test('existe ejercicios arrastrar para un libro x', async() => {
  const url = `${process.env.REACT_APP_API_URL}/book/1`;
  const data = await getData(url);
  const ejerciciosjsx = ejerciciosArrastrar(data);
  render(ejerciciosjsx[0]);
  const linkElement = await screen.findByText(/Order/i);
  expect(linkElement).toBeInTheDocument();
});
test('existe ejercicios completar texto para un libro x', async() => {
  const url = `${process.env.REACT_APP_API_URL}/book/1`;
  const data = await getData(url);
  const ejerciciosjsx = ejerciciosCompletarTexto(data);
  render(ejerciciosjsx[0]);
  const linkElement = await screen.findByText(/Complete/i);
  expect(linkElement).toBeInTheDocument();
});
test('existe ejercicios emparejar texto para un libro x', async() => {
  const url = `${process.env.REACT_APP_API_URL}/book/1`;
  const data = await getData(url);
  const ejerciciosjsx = ejerciciosEmparejar(data);
  render(ejerciciosjsx[0]);
  const linkElement = await screen.findByText(/Match/i);
  expect(linkElement).toBeInTheDocument();
});









const getData = async (url) => {
  try{
      let res = await fetch(url,{
          method: 'GET',
          headers: {
              'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoiZ2dAZ21haWwuY29tIiwiaWF0IjoxNjQ0MjQ0NzQ3LCJleHAiOjE2NDQyNDgzNDd9.2Pq-7398tHvUsk42dGjjluU4pNUpzKfQqWpXGB8VmKE',
              },
      });
      if(!res.ok){
          throw {err:true, status: res.status, statusText: !res.statusText?"Ocurrió un error":res.statusText};
      }
      let data = await res.json();
      return data;
  }catch(err){
   console.log(err);
  }
  
}


const ejerciciosVerdaderoFalso = (ejercicios)=>{

  let misEjercicios = [];
  ejercicios.map((ejercicio, index) => {

     if(ejercicio.type === "true_false"){
        misEjercicios.push(<VerdaderoFalso key={index} ejercicio={ejercicio} />);        
      }
    });
    return misEjercicios;
}

const ejerciciosArrastrar = (ejercicios)=>{

  let misEjercicios = [];
  ejercicios.map((ejercicio, index) => {

     if(ejercicio.type === "ordenar"){
        misEjercicios.push(<Arrastrar key={index} ejercicio={ejercicio} />);        
      }
    });
    return misEjercicios;
}



const ejerciciosCompletarTexto = (ejercicios)=>{

  let misEjercicios = [];
  ejercicios.map((ejercicio, index) => {

     if(ejercicio.type === "completar_texto"){
        misEjercicios.push(<CompletarTexto key={index} ejercicio={ejercicio} />);        
      }
    });
    return misEjercicios;
}

const ejerciciosEmparejar = (ejercicios)=>{

  let misEjercicios = [];
  ejercicios.map((ejercicio, index) => {

     if(ejercicio.type === "emparejar"){
        misEjercicios.push(<Emparejar key={index} ejercicio={ejercicio} />);        
      }
    });
    return misEjercicios;
}





const ejerciciosOpcionCorrecta1 = (ejercicios)=>{

  let misEjercicios = [];
  ejercicios.map((ejercicio, index) => {

     if(ejercicio.type === "opcion_correcta_1"){
        misEjercicios.push(<OpcionCorrecta_1 key={index} ejercicio={ejercicio} />);        
      }
    });
    return misEjercicios;
}

const ejerciciosOpcionCorrectaN = (ejercicios)=>{

  let misEjercicios = [];
  ejercicios.map((ejercicio, index) => {

     if(ejercicio.type === "opcion_correcta_n"){
        misEjercicios.push(<OpcionCorrecta_n key={index} ejercicio={ejercicio} />);        
      }
    });
    return misEjercicios;
}





 const OpcionCorrecta_1 = (props) => {
  return (
    <div className="flex flex-col space-y-10 xl:px-80 sm:px-20 ">
      <h2 className="mt-10 text-sm mr-8 ml-8 md:text-2xl font-bold text-green-700 py-5">
        {props.ejercicio.question}
      </h2>
      <div className="container w-auto ">
        <div
          className="flex flex-wrap items-center justify-center gap-2"
          aria-label="choice"
          role="radiogroup"
        >
          {props.ejercicio.options.map((ejercicio, index) => {
            return (
              <Texto
                key={index}
                src={
                  "https://d2pur3iezf4d1j.cloudfront.net/images/18a521f1507cb86689faa5b2e8277703"
                }
                alt={"agua"}
                nombre={"agua"}
                data={props.ejercicio.options[index]}
                ejercicio={props.ejercicio}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
const Texto = (props) => {
  return (
    <div
      style={{ height: "70px" }}
      className="flex flex-col w-2/5 sm:w-60 center-items justify-center flex-wrap cardCheck"
      aria-checked="false"
      role="radio"
      tabIndex="-1"
      ref={props.myref}
    >
      <button
        className="h-full"
        onClick={() => {
          props.marcar(props.myref);
        }}
      >
        <h2 className="text-xs sm:text-xs ">{props.data.item}</h2>
      </button>
    </div>
  );
};



export const OpcionCorrecta_n = (props) => {


  return (
    <div className="flex flex-col flex-wrap mt-8 xl:px-80 sm:px-20 ">
      <h1>Choose</h1>
      <h2 className="mt-10 text-sm mr-8 ml-8 md:text-2xl font-bold text-green-700 py-5">{props.ejercicio.question}</h2>
      <div className="container m-auto p-auto w-auto">
        <div
          className="flex flex-wrap items-center justify-center gap-2 "
          aria-label="choice"
          role="radiogroup"
        >
          {props.ejercicio.options.map((ejercicio, index) => {
            return (
              <TextoN
                key={index}
                src={
                  "https://d2pur3iezf4d1j.cloudfront.net/images/18a521f1507cb86689faa5b2e8277703"
                }
                alt={"agua"}
                nombre={"agua"}
                data={props.ejercicio.options[index]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const TextoN = (props) => {
  return (
    <div
      style={{ height: "70px" }}
      className="flex flex-col w-2/5 center-items justify-center flex-wrap cardCheck"
      aria-checked="false"
      role="radio"
      tabIndex="-1"
    >
      <button
        className="h-full"
      >
        <h2 className="text-xs sm:text-xs	">{props.data.item}</h2>
      </button>
    </div>
  );
};


const VerdaderoFalso = (props) => {
  return (
    <div className="flex flex-col flex-wrap mt-8 xl:px-60 sm:px-20 ">  
    <h2 className="m-auto p-auto text-sm font-bold sm:text-2xl text-green-700">{(props.ejercicio.question)}</h2>
  <div className="container m-auto p-auto w-auto">
    <div className="flex flex-col  items-center justify-center gap-2 mr-8 ml-8  divide-y-4 divide-gray-200 divide-dotted" ref={props.miref}>

      
      
          {props.ejercicio.body.map((item, index) => {
              if(item.item  && item.answer){
                  let juego = [];
                  item.item.map((texto, index) => {
                    //console.log(texto)
                      if(texto[0]==='_'){
                          // aqui van las opciones del juego true/false
                          if(item.answer)
                          {item.answer.forEach((opcion)=>{
                              juego.push(<TextoMarcar key={shortid.generate()} texto={opcion[0]}/>)
                          })}
                          
                      }else{
                          juego.push(texto)
                      }
                      
                  })
                  return <TextoGeneral key={shortid.generate()} juego={juego} index={index}/>
              }else{
                  
              }
          })
          }
        </div>
      </div>
      </div>
    );
}




const TextoGeneral= (props) => {
  return (
    <div className="text-center w-full p-4 ">
      <h2 className="text-md font-bold text-left my-4 uppercase block"></h2>

    <div className="  w-full">
        {props.juego.map((juego,index)=>{
          if(typeof juego === 'string'){
            return <p key={shortid.generate()} className={"w-auto py-2 sm:w-auto font-medium mx-2 text-justify	text-xs sm:text-lg"}>{juego}</p>
          }else if(typeof juego === 'object'){
            return juego
          }
        })}
    </div>
        </div>
  );
};

const TextoMarcar = (props) => {

  const quitarActivados = (event) => {
      let div = Array.from(event.target.parentNode.children);
      
      for (let index = 0; index < div.length; index++) {
        const element = div[index].getElementsByTagName("button");
        //console.log(div[index]);
        if(div[index].classList.contains("activado")){
          div[index].classList.remove("activado");
        }

      }
      event.target.classList.toggle("activado")
      
      // event.target.getElementsByTagName("p")[0].toggle("activado");
      
  }

  return (
    <button className={"shadow appearance-none border rounded w-auto h-10 sm:h-12 sm:w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"} onClick={quitarActivados}>{props.texto}</button>
    );      
}



//Arrastrar
const Arrastrar = (props) => {
  let data = props.ejercicio.options;

  //Re ordena la lista en base al cambio realizado

  const reorder = (list, startIndex, endIndex, index) => {
    const result = [...list];
    const [removed] = result[index].splice(startIndex, 1);
    result[index].splice(endIndex, 0, removed);
    return result;
  };


  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    // padding: grid * 2,
    margin: "0.3rem",
    width: "60%",
    // change background colour if dragging
    background: isDragging ? "#E5E7EB" : "white",

    // styles we need to apply on draggables
    ...draggableStyle,

    "--border-color": "#e5e5e5",
    "borderRadius": "12px",
    "borderWidth": "2px 2px 2px",
    height: "50px",
  });

  const getListStyle = (isDraggingOver, itemsLength) => ({
    background: isDraggingOver ? "white" : "#E5E7EB",
    borderRadius: "12px",
    display: "flex",
    padding: "10px",
    width: "80%",
    border: "1px solid #e5e5e5",
  });


  const [items, setItems] = useState(data);

  return (
    <div className="flex flex-col flex-wrap mb-4 xl:px-80 sm:px-20   ">
      <h2 className="mt-10 text-2xl font-bold text-green-700 ">{(props.ejercicio.question)}</h2>
      {items.map((preguntas, index) => (
        <div
          className="container  lg:m-auto lg:p-auto lg:w-auto lg:w-full md:m-7  "
          key={shortid.generate()}
          id="arrastrar"
        >
          <h2 className="text-md  font-medium text-left my-4  "> Sentence {index+1}</h2>
          
          <DragDropContext
            onDragEnd={(result) => {
              if (!result.destination) {
                return;
              }
              if (result.destination.index === result.source.index) {
                return;
              }
              setItems(
                reorder(
                  items,
                  result.source.index,
                  result.destination.index,
                  index
                )
              );
            }}
            key={shortid.generate()}
          >
            <Droppable droppableId="droppable" direction="vertical">
              {(provided, snapshot) => (
                <div
                className="mx-auto flex  flex-col rounded justify-center items-center "
                  style={getListStyle(
                    snapshot.isDraggingOver,
                    preguntas.length
                  )}
                  {...provided.droppableProps}
                >
                    
                  {preguntas.map((ordenar, index) => (
                    <Draggable
                      key={ordenar.answer}
                      draggableId={ordenar.answer.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          className="rounded  justify-center flex items-center  	"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <p className="sm:text-xs text-xs">{ordenar.item}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      ))}
    </div>
  );
};

const CompletarTexto = (props) => {
  return (
    <div className="flex flex-col  flex-wrap mt-8 xl:px-60 sm:px-20  my-10">
      <h1>Complete</h1>
      <h2 className="m-auto p-auto text-sm font-bold sm:text-2xl text-green-700 p-5">
        {props.ejercicio.question}
      </h2>
      {props.ejercicio.img && (
      
        <ViewImage img={props.ejercicio.img} />
      )}
      <div className="container m-auto p-auto w-auto my-2 ">
        <div
          className="flex flex-col items-center justify-center gap-2 text-xs   mr-8 ml-8"
          ref={props.miref}
        >
          {props.ejercicio.body.map((item, index) => {
            if (item.item && item.answer) {
              let juego = [];
              item.item.map((texto, index) => {
                if (texto[0] === "_") {
                  // aqui van las opciones
                  juego.push(
                    <InputCompletarTexto texto={""} key={shortid.generate()} />
                  );
                } else {
                  juego.push(texto);
                }
              });
              return (
                <JuegoCompletarTexto key={shortid.generate()} juego={juego} />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

const InputCompletarTexto = (props) => {
  const [texto, setTexto] = useState("");

  return (
    <input
      className={
        "shadow  appearance-none border text-center rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      }
      type="text"
      value={texto}
      onChange={(e) => {
        setTexto(e.target.value);
      }}
    />
  );
};

const JuegoCompletarTexto = (props) => {
  return (
    <div className="flex w-full  justify-items-center py-1	items-center">
      {props.juego.map((juego, index) => {
        if (typeof juego === "string") {
          return (
            <p
              key={shortid.generate()}
              className={"w-full mx-2 text-justify	text-xs sm:text-xl"}
            >
              {juego}
            </p>
          );
        } else {
          return juego;
        }
      })}
    </div>
  );
};



const Emparejar = (props) => {
  const [opciones, setOpciones] = useState([]);
  const divRef = useRef(null);
  const opcionesRef = useRef(null);

  let opcionesElegidas = [];

  const quitarRepetidos = (opciones) => {
    let seen = new Set();
    return opciones.filter((item) => {
      let k = item;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  useEffect(() => {
    if (props.ejercicio.body) {
      props.ejercicio.body.forEach((opcion) => {
        opcionesElegidas.push(opcion.answer);
      });
    }
    if (props.ejercicio.options) {
      props.ejercicio.options.forEach((opcion) => {
        opcionesElegidas.push(opcion);
      });
    }
    opcionesElegidas = quitarRepetidos(opcionesElegidas);
    opcionesElegidas.sort((a, b) => {
      if (a.length < b.length) return -1;
      else return 1;
    });
    setOpciones(opcionesElegidas);
  }, []);

  const cambiarVisibilidad = (event, props) => {
    let aMarcar = Array.from(divRef.current.firstChild.children);
    //console.log(aMarcar);

    let contador = 0;
    aMarcar.forEach((element) => {
      
      if (
        element.getElementsByClassName('opt-1')[0].innerText ===
        "Waiting answer..."
      ) {
        contador += 1;
      }
    });

    //Si ya se han completado todas las opciones
    
    if (contador !== 0) {
      aMarcar.some((element) => {
        if (
          element.getElementsByClassName('opt-1')[0].innerText ===
          "Waiting answer..."
        ) {
          element.getElementsByClassName('opt-1')[0].innerText =
            event.target.innerText;
          event.target.parentNode.parentNode.classList.add("bg-gray-400");
          event.target.parentNode.classList.add("invisible");
          return true;
        }
      });
    } else {
      event.preventDefault();
    }
  };

  return (
    <div className="flex flex-col flex-wrap mt-8 xl:px-80 sm:px-20  ">
      <h1>Match</h1>
      <h2 className="m-auto p-3 text-sm  font-bold sm:text-2xl text-green-700 ">
        {props.ejercicio.question}{" "}
      </h2>
      {props.ejercicio.img && <ViewImage img={props.ejercicio.img} />}
      <div className="contenedor m-auto p-auto w-auto my-1 " ref={divRef}>
        <div
          className="flex flex-col sm:items-center sm:justify-center my-5 sm:my-1 mr-8 ml-8   "
          ref={props.miref}
        >
          {props.ejercicio.body.map((item, index) => {
            if (item.item && item.answer) {
              let juego = [];
              item.item.map((texto, index) => {
                if (texto[0] === "_") {
                  // aqui van las opciones
                  juego.push(
                    <InputCompletarTexto2
                      texto={""}
                      key={shortid.generate()}
                      opcionesRef={opcionesRef}
                      opt={Array.from(opciones)}
                    />
                  );
                } else {
                  juego.push(texto);
                }
              });
              return (
                <JuegoCompletarTexto2
                  key={shortid.generate()}
                  type={props.ejercicio.type}
                  juego={juego}
                />
              );
            } else {
            }
          })}
        </div>
        <div
          className="flex flex-wrap gap-2 py-10 justify-center"
          ref={opcionesRef}
        >
          {opciones.length > 0 &&
            opciones.map((opcion, index) => {
              return (
                <div key={shortid.generate()} className={"rounded-full "}>
                  <button
                    onClick={(event, props) => {
                      cambiarVisibilidad(event, props);
                    }}
                  >
                    <span className="text-sm sm:text-lg cardCheck px-5 border-yellow-200 ">
                      {opcion}
                    </span>
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const InputCompletarTexto2 = (props) => {
  const volverALaNormalidad = (event) => {
    let opciones = Array.from(props.opcionesRef.current.children);
    opciones.forEach((element, index) => {
      if (props.opt[index] === event.target.innerText) {
        element.firstChild.classList.remove("invisible");
        element.classList.remove("bg-gray-400");
        event.target.innerText = "Waiting answer...";
      }
    });
  };

  return (
    <button
      className={
        "shadow appearance-none border rounded w-full h-13 sm:h-12 sm:w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs opt-1"
      }
      onClick={volverALaNormalidad}
    >
      Waiting answer...
    </button>
  );
};

const JuegoCompletarTexto2 = (props) => {
  return (
    <div className="grid grid-cols-2 text-justify items-center  my-2 ">
      <div>
        {props.juego.map((juego, index) => {
          if (typeof juego === "string") {
              
            return (
              <div
                key={shortid.generate()}
              >
                  {/* <ViewImage img={juego}/> */}
                {props.type === "emparejar_img" && <ViewImage img={juego} />}
                {props.type == "emparejar" && <h2 className=
                  "mx-2 text-justify text-xs sm:text-lg"
                 >{ juego }</h2>}
              </div>
            );
          }
        })}
      </div>
      <div>
        {props.juego.map((juego, index) => {
          if (typeof juego !== "string") {
            return juego;
          }
        })}
      </div>
    </div>
  );
};
