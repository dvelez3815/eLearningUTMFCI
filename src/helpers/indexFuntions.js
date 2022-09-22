
import Libro from '../components/Libros/Libro';
import shortid from 'shortid';

export function getProgressColor(progress){
    let progressColor;
    progress<25
    ?progressColor = "rgba(248, 113, 113, 1)"
    :progress<50
    ?progressColor = "rgba(251, 191, 36, 1)"
    :progress<70
    ?progressColor = "rgba(217, 119, 6, 1)"
    :progress<85
    ?
    progressColor = "rgba(52, 211, 153, 1)"
    :progressColor = "rgba(5, 150, 105, 1)"
    
    return progressColor;
}
export function llenarInfo(progreso, task) {

    console.log('progreso', progreso)
    console.log('task', task)
    
    let libroActual = 1;
    let totalLibro = 5;
    let libros = [];
    let userInfo = progreso
    //let task = tasku

    //console.log(userInfo)
    if (userInfo.name === "JsonWebTokenError") {
        window.location.href = "./signin";
    }

    for (let i = 0; i < userInfo.length - 1; i++) {
        for (let j = 0; j < userInfo.length - i - 1; j++) {
            if (
                parseInt(
                    "" + userInfo[j].book_info.module + userInfo[j].book_info.unit
                ) >
                parseInt(
                    "" +
                    userInfo[j + 1].book_info.module +
                    userInfo[j + 1].book_info.unit
                )
            ) {
                let aux = userInfo[j];
                userInfo[j] = userInfo[j + 1];
                userInfo[j + 1] = aux;
            }
        }
    }

    let mergeBooks = { libros: [] };
    while (libroActual <= totalLibro) {
        let librox = userInfo.filter(book => book.book_info.book === libroActual);
        let contador = 1;
        //total de modulos
        let startedmodulo = librox[0].book_info.module;
        let contador2 = startedmodulo
        let modulos = [];
        while (contador <= 2) {
            let modulo = librox.filter(book => book.book_info.module === contador2);
            contador2++;
            contador++;

            let userprogress = (modulo[0].writing.user_progress + modulo[0].grammar.user_progress + modulo[0].reading.user_progress + modulo[0].vocabulary.user_progress);
            let total_task = (modulo[0].writing.total_task + modulo[0].grammar.total_task + modulo[0].reading.total_task + modulo[0].vocabulary.total_task);
            let progress = (userprogress / total_task) * 100;

            let userprogress2 = (modulo[1].writing.user_progress + modulo[1].grammar.user_progress + modulo[1].reading.user_progress + modulo[1].vocabulary.user_progress);
            let total_task2 = (modulo[1].writing.total_task + modulo[1].grammar.total_task + modulo[1].reading.total_task + modulo[1].vocabulary.total_task);
            let progress2 = (userprogress2 / total_task2) * 100;


            let totalmoduleprogress = (progress + progress2) / 2;


            modulos.push({ modulo, totalmoduleprogress });
        }
        mergeBooks.libros.push(modulos)
        libroActual++;
    }

    let contadormodulos = 0;
    mergeBooks.libros.forEach((libro, index) => {
        let totaluserprogress = 0;
        let totaltask = 0;
        let totalmoduleprogress = 0;
        libro.forEach(modulo => {
            modulo.modulo.forEach(unit => {
                totaluserprogress = totaluserprogress + (unit.grammar.user_progress + unit.reading.user_progress + unit.vocabulary.user_progress + unit.writing.user_progress);
                totaltask = totaltask + (unit.grammar.total_task + unit.reading.total_task + unit.vocabulary.total_task + unit.writing.total_task);
            });
        });
        mergeBooks.libros[index] = { userprogress: totaluserprogress, totaltask: totaltask, modulos: mergeBooks.libros[index] }
    });



    mergeBooks.libros.forEach((book, index) => {
        let lastbook_is_aproved = true;
        if (index !== 0) {
            let modulo1 = mergeBooks.libros[index - 1].modulos[0].totalmoduleprogress;
            let modulo2 = mergeBooks.libros[index - 1].modulos[1].totalmoduleprogress;
            let totalmoduleprogress = (modulo1 + modulo2) / 2;

            if (totalmoduleprogress !== 100) {
                lastbook_is_aproved = false;
            }

        }
        libros.push(<Libro modulos={book.modulos} lecciones={task.res} key={shortid.generate()} lastbook_is_aproved={lastbook_is_aproved} libroactual={(index + 1)} />)

    });

    let cantTask = 0
    let cantTaskUser = 0
    for (let i = 0; i < (mergeBooks.libros).length; i++) {
        cantTask = cantTask + parseFloat(mergeBooks.libros[i].totaltask)
        cantTaskUser = cantTaskUser + parseFloat(mergeBooks.libros[i].userprogress)
        console.log('cant libro user', parseFloat(mergeBooks.libros[i].userprogress)
        )
    }

    let calculo = (cantTaskUser * 100) / cantTask
    console.log('cant task', cantTaskUser)
    let porcentaje = parseFloat(calculo.toFixed(2))

    //cookies.set('progreso', porcentaje, { path: '/' });


    return { porcentaje, mergeBooks, libros }


}