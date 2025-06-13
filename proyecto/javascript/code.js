
function  obtenerMatriz() { 
    return[
    [parseFloat(document.getElementById("a1").value),parseFloat(document.getElementById("b1").value),parseFloat(document.getElementById("c1").value)],
    [parseFloat(document.getElementById("a2").value),parseFloat(document.getElementById("b2").value),parseFloat(document.getElementById("c2").value)],
    [parseFloat(document.getElementById("a3").value),parseFloat(document.getElementById("b3").value),parseFloat(document.getElementById("c3").value)]
];
}


function calcularDeterminante(matriz){

return determinante = matriz[0][0] * (matriz[1][1] * matriz[2][2] - matriz[1][2] * matriz[2][1]) -
                    matriz[0][1] * (matriz[1][0] * matriz[2][2] - matriz[1][2] * matriz[2][0]) +
                    matriz[0][2] * (matriz[1][0] * matriz[2][1] - matriz[1][1] * matriz[2][0]);
}

function valoresX(){


    let matrizOriginal = obtenerMatriz();
    let determinante = calcularDeterminante(matrizOriginal);

    let matrizX = JSON.parse(JSON.stringify(matrizOriginal));

        matrizX[0][0] = parseFloat(document.getElementById("d1").value);
        matrizX[1][0] = parseFloat(document.getElementById("d2").value);
        matrizX[2][0] = parseFloat(document.getElementById("d3").value);

    let determinanteX = calcularDeterminante(matrizX);

    
    return determinanteX / determinante;



}

function valoresY(){


    let matrizOriginal = obtenerMatriz();
    let determinante = calcularDeterminante(matrizOriginal);

    let matrizY = JSON.parse(JSON.stringify(matrizOriginal));

        matrizY[0][1] = parseFloat(document.getElementById("d1").value);
        matrizY[1][1] = parseFloat(document.getElementById("d2").value);
        matrizY[2][1] = parseFloat(document.getElementById("d3").value);

    let determinanteY = calcularDeterminante(matrizY);

    
    return determinanteY / determinante;



}
function valoresZ(){


    let matrizOriginal = obtenerMatriz();
    let determinante = calcularDeterminante(matrizOriginal);

    let matrizZ = JSON.parse(JSON.stringify(matrizOriginal));

        matrizZ[0][2] = parseFloat(document.getElementById("d1").value);
        matrizZ[1][2] = parseFloat(document.getElementById("d2").value);
        matrizZ[2][2] = parseFloat(document.getElementById("d3").value);

    let determinanteZ = calcularDeterminante(matrizZ);

    
    return determinanteZ / determinante;



}


function resolverSistema(){
//document.write("rancheritos")
    let x = valoresX();
    let y = valoresY();
    let z = valoresZ();

    if (isNaN(x) || isNaN(y) || isNaN(z)) {
        document.getElementById("resultado").innerHTML = "Error: Asegúrate de que todos los valores ingresados sean números.";
        return;
    }else{

        document.getElementById("resultado").innerHTML = "X: " + x.toFixed(2) + ", Y: " + y.toFixed(2) + ", Z: " + z.toFixed(2);

    }



    


}

function showSidebar(){
      const sidebar = document.querySelector('.sidebar')
      sidebar.style.display = 'flex'
    }

function hideSidebar(){
      const sidebar = document.querySelector('.sidebar')
      sidebar.style.display = 'none'
}

function mostrarProcedimiento() {
    let procedimientoDiv = document.getElementById("procedimiento");
    procedimientoDiv.innerHTML = ""; // Limpiar contenido previo

    let matrizOriginal = obtenerMatriz();
    let determinante = calcularDeterminante(matrizOriginal);

    if (determinante === 0) {
        procedimientoDiv.innerHTML = "<p>El determinante de la matriz es 0, por lo que el sistema no tiene solución única.</p>";
        return;
    }

    procedimientoDiv.innerHTML += `
        <div style="display: flex; gap: 20px;">
            <div id="procedimiento-texto" style="flex: 1; color: #fff;"></div>
            <div id="procedimiento-tablas" style="flex: 1;"></div>
        </div>
    `;

    let textoDiv = document.getElementById("procedimiento-texto");
    let tablasDiv = document.getElementById("procedimiento-tablas");

    textoDiv.innerHTML += `<h3>Paso 1: Matriz Original</h3><p>Determinamos la matriz original y calculamos su determinante:</p>`;
    tablasDiv.innerHTML += "<h3>Matriz Original</h3>" + generarTablaHTML(matrizOriginal);
    textoDiv.innerHTML += `<p>Determinante = ${determinante}</p>`;

    const terminosIndependientes = [
        parseFloat(document.getElementById("d1").value),
        parseFloat(document.getElementById("d2").value),
        parseFloat(document.getElementById("d3").value),
    ];

    // Validar entradas de términos independientes
    if (terminosIndependientes.some(isNaN)) {
        textoDiv.innerHTML += `<p>Error: Verifique los términos independientes. Algunos no son números válidos.</p>`;
        return;
    }

    const nombresColumnas = ["X", "Y", "Z"];
    const resultados = [];

    for (let i = 0; i < 3; i++) {
        const matrizModificada = JSON.parse(JSON.stringify(matrizOriginal));
        for (let j = 0; j < 3; j++) {
            matrizModificada[j][i] = terminosIndependientes[j]; // Reemplazo en la columna correcta
        }

        const determinanteColumna = calcularDeterminante(matrizModificada);
        textoDiv.innerHTML += `<h3>Paso ${i + 2}: Matriz ${nombresColumnas[i]}</h3>
                               <p>Reemplazamos la columna ${i + 1} con los términos independientes y calculamos su determinante:</p>`;
        tablasDiv.innerHTML += `<h3>Matriz ${nombresColumnas[i]}</h3>${generarTablaHTML(matrizModificada)}`;
        textoDiv.innerHTML += `<p>Determinante ${nombresColumnas[i]} = ${determinanteColumna}</p>`;
        resultados.push(determinanteColumna);
    }

    const [detX, detY, detZ] = resultados;
    const soluciones = {
        X: detX / determinante,
        Y: detY / determinante,
        Z: detZ / determinante,
    };

    textoDiv.innerHTML += `<h3>Paso 5: Soluciones</h3>
                           <p>Calculamos las soluciones utilizando el método de Cramer:</p>
                           <p>X = ${detX} / ${determinante} = ${soluciones.X.toFixed(2)}</p>
                           <p>Y = ${detY} / ${determinante} = ${soluciones.Y.toFixed(2)}</p>
                           <p>Z = ${detZ} / ${determinante} = ${soluciones.Z.toFixed(2)}</p>`;
}




function generarTablaHTML(matriz) {
    let tablaHTML = "<table border='1' style='border-collapse: collapse; text-align: center; width: 100%; color: #fff; background: #222;'>";
    matriz.forEach(fila => {
        tablaHTML += "<tr>";
        fila.forEach(valor => {
            tablaHTML += `<td style="padding: 10px;">${valor}</td>`;
        });
        tablaHTML += "</tr>";
    });
    tablaHTML += "</table>";
    return tablaHTML;
}





