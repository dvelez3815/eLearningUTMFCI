import "./CheckExercise.css";

const Grammar = (props) => {
  let datos = {
    total_completado: 80,
  };
  return (
    <div className="container m-auto p-auto w-10/12">
      <div className="flex justify-between py-5">
        <h2>
          <span>
            <p className="text-lg font-bold	">¿Cuál de estos es agua?</p>
          </span>
        </h2>
        <div>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center	gap-2 mb-4" aria-label="choice" role="radiogroup">
        <div className="flex flex-col w-1/4 flex-wrap cardCheck" aria-checked="false" role="radio" tabIndex="-1" data-test="challenge-choice-card">
          <img
            src="https://d2pur3iezf4d1j.cloudfront.net/images/18a521f1507cb86689faa5b2e8277703"
            alt=""
          />
          <p className="text-sm font-medium	">Tea</p>
        </div>
        <div className="flex flex-col w-1/4 flex-wrap cardCheck" aria-checked="false" role="radio" tabIndex="-1" data-test="challenge-choice-card">
          <img
            src="https://d2pur3iezf4d1j.cloudfront.net/images/18a521f1507cb86689faa5b2e8277703"
            alt=""
          />
          <p className="text-sm font-medium	">Tea</p>
        </div>
        <div className="flex flex-col w-1/4 flex-wrap cardCheck" aria-checked="false" role="radio" tabIndex="-1" data-test="challenge-choice-card">
          <img
            src="https://d2pur3iezf4d1j.cloudfront.net/images/18a521f1507cb86689faa5b2e8277703"
            alt=""
          />
          <p className="text-sm font-medium	">Tea</p>
        </div>
        <div className="flex flex-col w-1/4 flex-wrap cardCheck" aria-checked="false" role="radio" tabIndex="-1" data-test="challenge-choice-card">
          <img
            src="https://d2pur3iezf4d1j.cloudfront.net/images/18a521f1507cb86689faa5b2e8277703"
            alt=""
          />
          <p className="text-sm font-medium	">Tea</p>
        </div>
        <div className="flex flex-col w-1/4 flex-wrap cardCheck activado" aria-checked="true" role="radio" tabIndex="-1" data-test="challenge-choice-card">
          <img
            src="https://d2pur3iezf4d1j.cloudfront.net/images/18a521f1507cb86689faa5b2e8277703"
            alt=""
          />
          <p className="text-sm font-medium	">Tea</p>
        </div>
      </div>

      <div className="flex justify-between flex-col sm:flex-row">
        <div className="mb-4">
          <button className="btn-exercise" disabled={false} onClick={()=>console.log("hola")}>
            <span>
              <p>saltar</p>
            </span>
          </button>
        </div>
        <div className="mb-4">
        <button className="bg-green-500 hover:bg-green-700 btn-exercise">
          <span>
            <p>comprobar</p>
          </span>
          </button>
        </div>
      </div>

      <div className="flex justify-between">
        <div></div>
        <div className="order-last">
          <p>COMPLETADO: {`${datos.total_completado}%`}</p>
        </div>
      </div>

      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-amber-200 h-4 border">
        <div
          style={{ width: `${datos.total_completado}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-400"
        ></div>
      </div>
    </div>
  );
};

export default Grammar;
