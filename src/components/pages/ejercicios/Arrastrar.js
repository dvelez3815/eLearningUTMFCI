import React from "react";
import { useState, useRef, createRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Arrastrar = () => {
  let data = {
    "options": [
        [
            {
                "item": "Peter: My name is Peter.",
                "answer": 2
            },
            {
                "item": "Peter : I’m a Doctor Nice to meet you, too.",
                "answer": 4
            },
            {
                "item": "Mary:  What´s your name?",
                "answer": 1
            },
            {
                "item": "Mary: Nice to meet you. What´s your job?",
                "answer": 3
            }
        ]
    ],
    "body": [],
    "_id": "6133aa1062a77824887c0f77",
    "task_id": "6133a93562a77824887c0f6b",
    "type": "ordenar",
    "question": "Order the next dialogue",
    "__v": 0
}



  //Re ordena la lista en base al cambio realizado

  const reorder = (list, startIndex, endIndex) => {
    //se guarda la lista actual en una variable
    const result = [...list];
    //se guarda el item que se ha movido
    const [removed] = result.splice(startIndex, 1);
    //se inserta el item movido en la posicion donde se ha soltado
    result.splice(endIndex, 0, removed);
    return result;
  };



  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    // padding: grid * 2,
    "margin": "0.5rem",
    width: "70%",


    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver, itemsLength) => ({
    background: isDraggingOver ? "lightblue" : "white",
    border: "1px solid lightgrey",
    display: "flex",
    padding: "2px",
    width: "auto",
  });

  const [items, setItems] = useState(data.options[0]);

  return (
    <div style={{ width: "100%" }} className="p-4">
      <DragDropContext
        onDragEnd={(result) => {
          if (!result.destination) {
            return;
          }
          if (result.destination.index === result.source.index) {
            return;
          }
          setItems(
            reorder(items, result.source.index, result.destination.index)
          );
        }}
      >
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver, items.length)}
              {...provided.droppableProps}
            >
              {items.map((item, index) => (
                <Draggable
                  key={item.answer}
                  draggableId={item.answer.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                    className="rounded h-10 justify-center flex items-center	"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <p className="text-xs">{item.item}</p>
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
  );
};

export default Arrastrar;
