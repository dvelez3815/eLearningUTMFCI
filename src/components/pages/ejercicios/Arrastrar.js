import React, { useEffect } from "react";
import { useState, useRef, createRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import shortid from "shortid";

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
        ],
        [
            {
                "item": "b.",
                "answer": 8
            },
            {
                "item": "c",
                "answer": 9
            },
            {
                "item": "d",
                "answer": 10
            },
            {
                "item": "a",
                "answer": 11
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

  const reorder = (list, startIndex, endIndex,index) => {
      const result = [...list];
      const [removed] = result[index].splice(startIndex, 1);
      result[index].splice(endIndex, 0, removed);
      return result
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

  const [items, setItems] = useState(data.options);

 
  


  return (
      <div>

    {items.map((preguntas, index) => (

        <div style={{ width: "100%" }} className="p-4" key={shortid.generate()}>
            <DragDropContext
                onDragEnd={(result) => {
                    if (!result.destination) {
                        return;
                    }
                    if (result.destination.index === result.source.index) {
                        return;
                    }
                        setItems(reorder(items, result.source.index, result.destination.index,index))
                }}
                key={shortid.generate()}
            >
                <Droppable droppableId="droppable" direction="horizontal">
                    {(provided, snapshot) => (
                        <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver, preguntas.length)}
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
                                    className="rounded h-10 justify-center flex items-center	"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getItemStyle(
                                        snapshot.isDragging,
                                        provided.draggableProps.style
                                    )}
                                    >
                                    <p className="text-xs">{ordenar.item}</p>
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
