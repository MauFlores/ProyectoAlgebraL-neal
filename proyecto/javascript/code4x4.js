
function  obtenerMatriz() { 
    return[
    [parseFloat(document.getElementById("a1").value),parseFloat(document.getElementById("b1").value),parseFloat(document.getElementById("c1").value),parseFloat(document.getElementById("d1").value)],
    [parseFloat(document.getElementById("a2").value),parseFloat(document.getElementById("b2").value),parseFloat(document.getElementById("c2").value),parseFloat(document.getElementById("d2").value)],
    [parseFloat(document.getElementById("a3").value),parseFloat(document.getElementById("b3").value),parseFloat(document.getElementById("c3").value),parseFloat(document.getElementById("d3").value)],
    [parseFloat(document.getElementById("a4").value),parseFloat(document.getElementById("b4").value),parseFloat(document.getElementById("c4").value),parseFloat(document.getElementById("d4").value)]
];
}

function calcularDeterminante(matriz){

return determinante = matriz[0][0] * (matriz[1][1] * (matriz[2][2] * matriz[3][3] - matriz[2][3] * matriz[3][2]) - matriz[1][2] * (matriz[2][1] * matriz[3][3] - matriz[2][3] * matriz[3][1]) + matriz[1][3] * (matriz[2][1] * matriz[3][2] - matriz[2][2] * matriz[3][1])) -
                      matriz[0][1] * (matriz[1][0] * (matriz[2][2] * matriz[3][3] - matriz[2][3] * matriz[3][2]) - matriz[1][2] * (matriz[2][0] * matriz[3][3] - matriz[2][3] * matriz[3][0]) + matriz[1][3] * (matriz[2][0] * matriz[3][2] - matriz[2][2] * matriz[3][0])) +
                      matriz[0][2] * (matriz[1][0] * (matriz[2][1] * matriz[3][3] - matriz[2][3] * matriz[3][1]) - matriz[1][1] * (matriz[2][0] * matriz[3][3] - matriz[2][3] * matriz[3][0]) + matriz[1][3] * (matriz[2][0] * matriz[3][1] - matriz[2][1] * matriz[3][0])) -
                      matriz[0][3] * (matriz[1][0] * (matriz[2][1] * matriz[3][2] - matriz[2][2] * matriz[3][1]) - matriz[1][1] * (matriz[2][0] * matriz[3][2] - matriz[2][2] * matriz[3][0]) + matriz[1][2] * (matriz[2][0] * matriz[3][1]-  matriz [2][1]* matriz [3][0]));
}

function valoresX(){
    let matrizOriginal = obtenerMatriz();
    let determinante = calcularDeterminante(matrizOriginal);

    let matrizX = JSON.parse(JSON.stringify(matrizOriginal));

        matrizX[0][0] = parseFloat(document.getElementById("r1").value)
        matrizX[1][0] = parseFloat(document.getElementById("r2").value)
        matrizX[2][0] = parseFloat(document.getElementById("r3").value)
        matrizX[3][0] = parseFloat(document.getElementById("r4").value)

    let determinanteX = calcularDeterminante(matrizX);

    return determinanteX / determinante;
}
function valoresY(){
let matrizOriginal = obtenerMatriz();
    let determinante = calcularDeterminante(matrizOriginal);

    let matrizY = JSON.parse(JSON.stringify(matrizOriginal));

        matrizY[0][1] = parseFloat(document.getElementById("r1").value)
        matrizY[1][1] = parseFloat(document.getElementById("r2").value)
        matrizY[2][1] = parseFloat(document.getElementById("r3").value)
        matrizY[3][1] = parseFloat(document.getElementById("r4").value)

    let determinanteY = calcularDeterminante(matrizY)

    return determinanteY / determinante


}

function valoresZ(){
let matrizOriginal = obtenerMatriz();
    let determinante = calcularDeterminante(matrizOriginal)

    let matrizZ = JSON.parse(JSON.stringify(matrizOriginal))

        matrizZ[0][2] = parseFloat(document.getElementById("r1").value)
        matrizZ[1][2] = parseFloat(document.getElementById("r2").value)
        matrizZ[2][2] = parseFloat(document.getElementById("r3").value)
        matrizZ[3][2] = parseFloat(document.getElementById("r4").value)

    let determinanteZ = calcularDeterminante(matrizZ)

    return determinanteZ / determinante

}

function valoresW(){
let matrizOriginal = obtenerMatriz();
    let determinante = calcularDeterminante(matrizOriginal);

    let matrizW = JSON.parse(JSON.stringify(matrizOriginal));

        matrizW[0][3] = parseFloat(document.getElementById("r1").value);
        matrizW[1][3] = parseFloat(document.getElementById("r2").value);
        matrizW[2][3] = parseFloat(document.getElementById("r3").value);
        matrizW[3][3] = parseFloat(document.getElementById("r4").value);

    let determinanteW = calcularDeterminante(matrizW);

    return determinanteW / determinante;
}

function imprimirMatrizEnPagina(matriz) {
    let contenedor = document.getElementById("matrizOutput");
    if (!contenedor) {
        // Si no existe, crea el contenedor y lo agrega al body o a main
        contenedor = document.createElement("div");
        contenedor.id = "matrizOutput";
        document.body.appendChild(contenedor);
    }

    let html = "<table border='1' cellpadding='5' cellspacing='0' style='border-collapse: collapse; text-align: center;'>";
    for (let i = 0; i < matriz.length; i++) {
        html += "<tr>";
        for (let j = 0; j < matriz[i].length; j++) {
            html += `<td>${matriz[i][j]}</td>`;
        }
        html += "</tr>";
    }
    html += "</table>";

    contenedor.innerHTML = html;
}




function resolverSistema(){
    let x = valoresX();
    let y = valoresY();
    let z = valoresZ();
    let w = valoresW();

    if(isNaN(x) || isNaN(y) || isNaN(z) || isNaN(w)) {
        document.getElementById("resultado").innerHTML = "Error: Asegúrate de que todos los valores de la matriz sean números válidos.";
        return;
    }else{

        document.getElementById("resultado").innerHTML = `X: ${x.toFixed(2)}, Y: ${y.toFixed(2)}, Z: ${z.toFixed(2)}, W: ${w.toFixed(2)}`;

    }
    
   

}

function mostrarProcedimiento() {
    let procedimientoDiv = document.getElementById("procedimiento");
    procedimientoDiv.innerHTML = ""; // Limpiar contenido previo

    let matrizOriginal = obtenerMatriz(); // Asegúrate de que obtenerMatriz devuelva una matriz 4x4
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
        parseFloat(document.getElementById("r1").value),
        parseFloat(document.getElementById("r2").value),
        parseFloat(document.getElementById("r3").value),
        parseFloat(document.getElementById("r4").value),
    ];

    if (terminosIndependientes.some(isNaN)) {
        textoDiv.innerHTML += `<p>Error: Verifique los términos independientes. Algunos no son números válidos.</p>`;
        return;
    }

    const nombresColumnas = ["X", "Y", "Z", "W"];
    const resultados = [];

    for (let i = 0; i < 4; i++) {
        const matrizModificada = JSON.parse(JSON.stringify(matrizOriginal));
        for (let j = 0; j < 4; j++) {
            matrizModificada[j][i] = terminosIndependientes[j]; // Reemplazo en la columna correcta
        }

        const determinanteColumna = calcularDeterminante(matrizModificada);
        textoDiv.innerHTML += `<h3>Paso ${i + 2}: Matriz ${nombresColumnas[i]}</h3>
                               <p>Reemplazamos la columna ${i + 1} con los términos independientes y calculamos su determinante:</p>`;
        tablasDiv.innerHTML += `<h3>Matriz ${nombresColumnas[i]}</h3>${generarTablaHTML(matrizModificada)}`;
        textoDiv.innerHTML += `<p>Determinante ${nombresColumnas[i]} = ${determinateColumna}</p>`;
        resultados.push(determinanteColumna);
    }

    const soluciones = resultados.map((det, index) => ({
        variable: nombresColumnas[index],
        valor: det / determinante,
    }));

    textoDiv.innerHTML += `<h3>Paso 6: Soluciones</h3>
                           <p>Calculamos las soluciones utilizando el método de Cramer:</p>`;
    soluciones.forEach(sol => {
        textoDiv.innerHTML += `<p>${sol.variable} = ${sol.valor.toFixed(2)}</p>`;
    });
}






function mostrarSolucion(){
    let matriz = obtenerMatriz();
imprimirMatrizEnPagina(matriz);

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
    procedimientoDiv.innerHTML = "";

    let matrizOriginal = obtenerMatriz();
    let determinante = calcularDeterminante(matrizOriginal);
    
    if (determinante === 0) {
        procedimientoDiv.innerHTML = "<p>El determinante de la matriz es 0, por lo que el sistema no tiene solución única.</p>";
        return;
    }

    procedimientoDiv.innerHTML += `<h3>Paso 1: Matriz Original</h3><p>Determinamos la matriz original y calculamos su determinante:</p>`;
    procedimientoDiv.innerHTML += generarTablaHTML(matrizOriginal);
    procedimientoDiv.innerHTML += `<p>Determinante = ${determinante}</p>`;

    const variables = ["X", "Y", "Z", "W"];
    variables.forEach((variable, i) => {
        let matrizVariable = JSON.parse(JSON.stringify(matrizOriginal));
        for (let j = 0; j < 4; j++) {
            matrizVariable[j][i] = parseFloat(document.getElementById(`d${j + 1}`).value);
        }
        let determinanteVariable = calcularDeterminante(matrizVariable);
        procedimientoDiv.innerHTML += `<h3>Paso ${i + 2}: Matriz ${variable}</h3><p>Reemplazamos la columna ${i + 1} con los términos independientes y calculamos su determinante:</p>`;
        procedimientoDiv.innerHTML += generarTablaHTML(matrizVariable);
        procedimientoDiv.innerHTML += `<p>Determinante ${variable} = ${determinanteVariable}</p>`;
    });
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
//