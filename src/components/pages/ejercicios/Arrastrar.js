import React from "react";
import { useState} from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import shortid from "shortid";

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
    margin: "0.5rem",
    width: "100%",
    padding: "2%",
    // change background colour if dragging
    background: isDragging ? "#E5E7EB" : "white",

    // styles we need to apply on draggables
    ...draggableStyle,

    "--border-color": "#e5e5e5",
    "borderRadius": "12px",
    "borderWidth": "2px 2px 2px",
    height: "0%",
  });

  const getListStyle = (isDraggingOver, itemsLength) => ({
    background: isDraggingOver ? "white" : "#E5E7EB",
    borderRadius: "12px",
    display: "flex",
    padding: "2px",
    width: "100%",
    border: "1px solid #e5e5e5",
  });


  const esArrastrarN = () => ({
    
  });


  const [items, setItems] = useState(data);

  return (
    <div className="flex flex-col flex-wrap mb-4 mx-3" ref={props.miref}>
      <h2 className="mt-10 text-2xl font-bold ">{(props.ejercicio.question)}</h2>
      {items.map((preguntas, index) => (
        <div
        /*  */
          className=" lg:m-auto lg:w-full lg:p-auto md:m-7  "
          key={shortid.generate()}
          id="arrastrar"
        >
          <h2 className="text-md font-bold text-left my-4 uppercase"> Sentence {index+1}</h2>
          
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
                          className="rounded h-4 justify-center flex items-center "
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <h2 className="text-md ">{ordenar.item}</h2>
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

export default Arrastrar;