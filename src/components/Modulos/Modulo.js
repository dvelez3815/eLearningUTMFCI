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
  return <div>
    <div className='flex flex-col  '>
      {props.moduloindex === 1?
      <div>
          <h2  key={shortid.generate()} className={props.bloqueo?"rounded-lg text-2xl text-center text-gray-600 mt-2 mx-10 font-bold p-2":" rounded-lg text-2xl text-center text-green-700 mt-2 mx-10 font-bold p-2"}>{`Module ${props.moduloindex}`}
          </h2>
          <span className="flex content-center justify-center">
          <span className={props.bloqueo?" absolute justify-center rounded-full h-3 w-3 bg-gray-400 opacity-75":"animate-ping absolute justify-center rounded-full h-3 w-3 bg-green-400 opacity-75" }></span>
          <span className={props.bloqueo?" justify-center  rounded-full h-3 w-3 bg-gray-500":" justify-center  rounded-full h-3 w-3 bg-green-500"}></span>
        </span>
      </div>
      :
      <div>
          <h2  key={shortid.generate()} className={props.bloqueo?"rounded-lg text-2xl text-center text-gray-600 mt-2 mx-10 font-bold p-2":" rounded-lg text-2xl text-center text-blue-900 mt-2 mx-10 font-bold p-2"}>{`Module ${props.moduloindex}`}
          </h2>
          <span className="flex content-center justify-center">
          <span className={props.bloqueo?" absolute justify-center rounded-full h-3 w-3 bg-gray-400 opacity-75":"animate-ping absolute justify-center rounded-full h-3 w-3 bg-blue-700 opacity-75" }></span>
          <span className={props.bloqueo?" justify-center  rounded-full h-3 w-3 bg-gray-500":" justify-center  rounded-full h-3 w-3 bg-blue-800"}></span>
        </span>
      </div>
      }
      
      
    </div>
      
      <div className='p-3 mb-8'> 
      
        {props.modulo.map((modulo, index) => {
            let userprogress = (modulo.writing.user_progress + modulo.grammar.user_progress + modulo.reading.user_progress + modulo.vocabulary.user_progress);
            let total_task = (modulo.writing.total_task + modulo.grammar.total_task + modulo.reading.total_task + modulo.vocabulary.total_task);
            let progress = (userprogress / total_task) * 100;
            
          return (<div key={shortid.generate()} >
          <ModuleProgress
            key={shortid.generate()}
            moduleName={"Unit " + modulo.book_info.unit}
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
          />

          </div>)
          
        })}
      </div>
  </div>;
};

export default Modulo;
