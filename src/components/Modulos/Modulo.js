import React from 'react';
import shortid from 'shortid';
import Activity from '../Activities/Activity';
import { ModuleProgress } from '../ModuleProgress';

import writingimg from "../../assets/icons/Writing.png";
import grammarimg from "../../assets/icons/Grammar.png";
import readingimg from "../../assets/icons/Reading.png";
import vocabularyimg from "../../assets/icons/Vocabulary.png";

import writingimgng from "../../assets/icons/Writing_0.png";
import grammarimgng from "../../assets/icons/Grammar_0.png";
import readingimgng from "../../assets/icons/Reading_0.png";
import vocabularyimgng from "../../assets/icons/Vocabulary_0.png";



const Modulo = (props) => {
  let bloqueo = props.bloqueo
  
  return <div className=' w-full'>
    {bloqueo?
      <div className="tooltip ">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>       
        <span className='tooltiptext  p-2 text-xs'>{'Resuelva todas las actividades del módulo anterior para desbloquear el presente módulo'} </span>
      </div>
    :
    <div className='pt-3'></div>
    
    }
      
      <div className='md:p-3   '> 
      
        {props.modulo.map((modulo, index) => {
            let userprogress = (modulo.writing.user_progress + modulo.grammar.user_progress + modulo.reading.user_progress + modulo.vocabulary.user_progress);
            let total_task = (modulo.writing.total_task + modulo.grammar.total_task + modulo.reading.total_task + modulo.vocabulary.total_task);
            let progress = (userprogress / total_task) * 100;


          return (<div key={shortid.generate()} >
            
          <ModuleProgress
            key={shortid.generate()}
            moduleName={"MODULE " + props.moduloindex +" | UNIT " + modulo.book_info.unit   }
            percent={parseInt(progress)}
            bloqueo = {bloqueo}
          ></ModuleProgress>            
          <Activity
            rutaReview={`/review/${modulo.book_info.book}/${modulo.book_info.module}/${modulo.book_info.unit}/writing`}
            moduleName={`Module: ${modulo.book_info.module}`}
            ruta={`/modulo/${modulo.book_info.module}/writing/${modulo.book_info.unit}/${modulo.writing.task_id}`}
            taskid={modulo.writing.task_id}
            percent={parseInt(
              (modulo.writing.user_progress /
                modulo.writing.total_task) *
                100
            )}
            key={shortid.generate()}
            name={"writing"}
            img={props.bloqueo?writingimgng:writingimg}
            bloqueo={props.bloqueo}
            info = {modulo}
            task = {props.lecciones}

          />

          <Activity
            rutaReview={`/review/${modulo.book_info.book}/${modulo.book_info.module}/${modulo.book_info.unit}/vocabulary`}
            moduleName={`Module: ${modulo.book_info.module}`}
            ruta={`/modulo/${modulo.book_info.module}/vocabulary/${modulo.book_info.unit}/${modulo.vocabulary.task_id}`}
            taskid={modulo.vocabulary.task_id}
            percent={parseInt(
              (modulo.vocabulary.user_progress /
                modulo.vocabulary.total_task) *
                100
            )}
            key={shortid.generate()}
            name={"vocabulary"}
            img={props.bloqueo?vocabularyimgng:vocabularyimg}
            bloqueo={props.bloqueo}
            info = {modulo}
            task = {props.lecciones}

          />

          <Activity
            rutaReview={`/review/${modulo.book_info.book}/${modulo.book_info.module}/${modulo.book_info.unit}/reading`}
            moduleName={`Module: ${modulo.book_info.module}`}
            ruta={`/modulo/${modulo.book_info.module}/reading/${modulo.book_info.unit}/${modulo.reading.task_id}`}
            taskid={modulo.reading.task_id}
            percent={parseInt(
              (modulo.reading.user_progress /
                modulo.reading.total_task) *
                100
            )}
            key={shortid.generate()}
            name={"reading"}
            img={props.bloqueo?readingimgng:readingimg}
            bloqueo={props.bloqueo}
            info = {modulo}
            task = {props.lecciones}

          />

          <Activity
            rutaReview={`/review/${modulo.book_info.book}/${modulo.book_info.module}/${modulo.book_info.unit}/grammar`}
            moduleName={`Module: ${modulo.book_info.module}`}
            ruta={`/modulo/${modulo.book_info.module}/grammar/${modulo.book_info.unit}/${modulo.grammar.task_id}`}
            taskid={modulo.grammar.task_id}
            percent={parseInt(
              (modulo.grammar.user_progress /
                modulo.grammar.total_task) *
                100
            )}
            key={shortid.generate()}
            name={"grammar"}
            img={props.bloqueo?grammarimgng:grammarimg}
            bloqueo={props.bloqueo}
            info = {modulo}
            task = {props.lecciones}

          />

          </div>)
          
        })}
      </div>
  </div>;
};

export default Modulo;
