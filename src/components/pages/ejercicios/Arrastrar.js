import React from "react";
import { useState, useEffect} from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import shortid from "shortid";
import ViewImage from '../../ViewImage/ViewImage'
import axios from 'axios'

const Arrastrar = (props) => {
  let data = props.ejercicio.options;

  //Re ordena la lista en base al cambio realizado
  const [title, setTitle] = useState('')

  useEffect(async () => {
    
    translateText()

    }, []);

  const translateText = () => {
    let tit = ''
    if (String(props.ejercicio.question).length===0 ){
      tit=('order the sentence').replace(/[$.]/g,'')
    }else{
      tit=(props.ejercicio.question).replace(/[$.]/g,'')
    }
            
    let data = {
        q : tit.replace(/[$_]/g,'.').toLocaleLowerCase(),
        source: 'en',
        target: 'es'
    }
    axios.post(`https://libretranslate.de/translate`, data)
    .then((response) => {
      setTitle(response.data.translatedText)  
      //console.log(response.data.translatedText)
    })
  } 
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
    
  });

  const getItemStyleH = (isDragging, draggableStyle) => ({
     // some basic styles to make the items look a bit nicer
     userSelect: "none",
     // padding: grid * 2,
     margin: "0.3rem",
     width: "60%",
     // change background colour if dragging
     background: isDragging ? "rgb(248 250 252)" : "white",
 
     // styles we need to apply on draggables
     ...draggableStyle,
 
     "--border-color": "#e5e5e5",
     "borderRadius": "12px",
     "borderWidth": "2px 2px 2px",
     height: "auto",
  });

  const getListStyle = (isDraggingOver, itemsLength) => ({
    background: isDraggingOver ? "white" : "rgb(248 250 252)",
    borderRadius: "12px",
    display: "flex",
    padding: "10px",
    width: "80%",
    border: "1px solid #e5e5e5",
  });


  const [items, setItems] = useState(data);

  return (

      <div className="flex  flex-col  flex-wrap md:mt-8  xl:px-40 px-5 sm:px-20  "ref={props.miref}>
      <div className="static min-w-fit ">
        <h2 className="m-auto p-3 text-sm  font-bold sm:text-xl text-green-700 ">
          {String(props.ejercicio.question).length===0?
            ('order the sentence').toUpperCase()
          :
            (props.ejercicio.question).toUpperCase()
          }{" "}
        </h2>

      </div>
      {props.ejercicio.img && (
          <ViewImage img={props.ejercicio.img} />
        )}
      {items.map((preguntas, index) => (
        <div
          className="container lg:m-auto lg:p-auto lg:w-auto lg:w-full   "
          key={shortid.generate()}
          id="arrastrar"
        >
          <h2 className="text-md  font-medium text-left my-4  "> Sentence {index+1}</h2>
          <div className="hidden md:block ">
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
                <Droppable droppableId="droppable" direction="horizontal">
                  {(provided, snapshot) => (
                    <div
                    className={
                      preguntas.length > 7?
                      " static flex h-36 static  bg-gray-50 w-full overflow-x-auto  rounded-md  items-center  bg-white  shadow-md rounded"
                      :
                      " static flex h-36 static bg-gray-50 w-full overflow-x-auto justify-center  rounded-md  items-center  bg-white w-full mb-6 shadow-md rounded"
                    }
                      ref={provided.innerRef}
                      
                      {...provided.droppableProps}
                    >
                      
                      {preguntas.map((ordenar, index) => (
                        <Draggable
                          key={ordenar.answer}
                          draggableId={ordenar.answer.toString()}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div className="px-2">
                              <div
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                                className={
                                  
                                  String(ordenar.item).length < 20?
                                  "rounded-md 3xl h-20 w-24 bg-white items-center  justify-center  p-2  flex  overflow-y-auto border shadow-md"
                                  :
                                  String(ordenar.item).length < 37?
                                  "rounded-md 3xl h-20 w-24 bg-white items-center  justify-center  p-2  flex  overflow-y-auto border shadow-md"
                                  :
                                  "rounded-md 3xl h-20 w-40 bg-white p-2  flex  overflow-y-auto border shadow-md" 

                                }
                                
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                
                              > 
                             
                                
                                <p className="sm:text-xs text-xs  ">{ordenar.item}</p>
                              </div>
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
          <div className="md:hidden">
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
                      ref={provided.innerRef}
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
                              className="rounded  justify-center flex items-center py-4 overflow-y-auto	"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyleH(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              <p className="sm:text-xs p-2 text-xs">{ordenar.item}</p>
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
        </div>
      ))}
    </div>
  );
};

export default Arrastrar;