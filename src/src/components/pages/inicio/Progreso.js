import React from 'react'
import shortid from 'shortid'
import Activity from '../../Activities/Activity'
import { ModuleProgress } from '../../ModuleProgress'

const Progreso = ({modulo,writingimg,vocabularyimg,readingimg,grammarimg}) => {
    return (
        <div key={shortid.generate()}> 
        <ModuleProgress
        key={shortid.generate()}
          moduleName={"Unit: " + modulo.book_info.unit}
          percent={parseInt(
            ((modulo.writing.user_progress +
              modulo.reading.user_progress +
              modulo.grammar.user_progress +
              modulo.vocabulary.user_progress) /
              (modulo.writing.total_task +
                modulo.reading.total_task +
                modulo.grammar.total_task +
                modulo.vocabulary.total_task)) *
              100
          )}
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
          img={writingimg}
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
          img={vocabularyimg}
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
          img={readingimg}
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
          img={grammarimg}
        />
      </div>
    )
}

export default Progreso
