const inputFx = document.querySelector('.function');
const inputA = document.querySelector('.a');
const inputB = document.querySelector('.b');
const radioN = document.querySelector('.radio-n');
const inputN = document.querySelector('.n');
const radioE = document.querySelector('.radio-e');
const inputE = document.querySelector('.e');
const calcBtn = document.querySelector('.btn');
const resultSuma = document.getElementsByClassName("result-suma");
const tableContainer = document.getElementsByClassName('table-suma');
const result = document.getElementsByClassName("result");

const errorTxt = document.querySelector('.error-txt');
const valErroresTxt = document.getElementsByClassName("val-errores");
const errorDerivadaTxt = document.getElementsByClassName("error");
const derivadasTxt = document.querySelector('.derivadas');
const anchoGralTxt = document.querySelector(".ancho-general");
let anchoGral, radioChecked, derivadas = [], fx, a, b, n, e, xi, fxi, k, kFxi = [], x, sumKFxi = [0, 0], errores = [], erroresDerivada = [], max = [];
const formula = ["(b-a)/(2*n)", "(b-a)/(3*n)"];

const resultSumaTxt = ["La suma del trapecio es ", "La suma de Simpson es "];
const resultTxt = "La integral es: ";
const reglaTxt = ["REGLA DEL TRAPECIO", "REGLA DE SIMPSON"]

const enable = (input, bool) => {
    input.disabled = !bool;
    input.value = '';
}
const verifyChecked = () => {
    return radioN.checked ? 1 : radioE.checked ? 2 : false;
}
const getMax = value =>{    
    if (value === 0) {
        errores[0] = Math.abs(math.evaluate(derivadas[2].replaceAll('x',a)));
        errores[1] =  Math.abs(math.evaluate(derivadas[2].replaceAll('x',b)));
    }
    if(value === 1 && ((radioN.checked && (n % 2) === 0) || (radioE.checked))){
        errores[0] = Math.abs(math.evaluate(derivadas[4].replaceAll('x',a)));
        errores[1] =  Math.abs(math.evaluate(derivadas[4].replaceAll('x',b)));
    }
    max[value] = errores[0] > errores[1] ? errores[0] : errores[1];
    valErroresTxt[value].textContent = `Los dos valores con valor absoluto evaluados en las derivadas son: ${Math.trunc(errores[0]*1000000000)/1000000000} y  ${Math.trunc(errores[1]*1000000000)/1000000000}; el que fue tomado fue ${Math.trunc(max[value]*1000000000)/1000000000}`
}
const calcError = () => {
    for (let i = 0; i < tableContainer.length; i++) {
        getMax(i);
        if (i === 0) {
            erroresDerivada[i] = Math.pow((b - a), 3) / (12 * Math.pow(n, 2)) * max[i];
        }
        else {
            erroresDerivada[i] =  Math.pow((b - a), 5) / (180 * Math.pow(n, 4)) * max[i];
        }
        errorDerivadaTxt[i].textContent = `El error es de: ${erroresDerivada[i]}`;
    }
}
const calcParticiones = () => {
    let particiones = [];
    fx = inputFx.value;
    a = parseFloat(inputA.value);
    b = parseFloat(inputB.value);
    e = parseFloat(inputE.value);
    getMax(0);
    getMax(1);
    particiones[0] = Math.sqrt(Math.pow((b-a),3) / (12 * e) * max[0]);
    particiones[1] = Math.pow((Math.pow((b-a),5) / (180 * e) * max[1]),(1/4));
    for (let i = 0; i < errorDerivadaTxt.length; i++) {
        errorDerivadaTxt[i].textContent = `La cantidad de particiones debe ser mayor o igual a ${particiones[i]}`;        
    }
}
const calcDerivadas = () => {
    derivadas[0] = inputFx.value;
    for (let i = 0; i < 4; i++) {
        derivadas[i + 1] = math.format(math.derivative(derivadas[i], 'x'), 14)
    }
    derivadasTxt.innerHTML += `<thead>
            <th>N° derivada</th>
            <th>Valor derivada</th>
        </thead>`;
    for (let j = 1; j < derivadas.length; j++) {
        derivadasTxt.innerHTML += `<tr>
            <td>${j}</td>
            <td>${derivadas[j]}</td>
        </tr>`;
    }
}
const calcAnchoGral = () => {
    fx = inputFx.value;
    a = parseFloat(inputA.value);
    b = parseFloat(inputB.value);
    n = parseFloat(inputN.value);
    anchoGral = (b - a) / n;
    anchoGralTxt.textContent = `El ancho general es de ${Math.trunc(anchoGral * 10000) / 10000}`
}
const evalueFunction = () =>{
    return math.evaluate(fx.replaceAll('x', x));
}
const getValueK = (tableNumber, i) => {
    if (tableNumber === 0) {
        return i === 0 ? 1 : i === n ? 1 : 2;
    }
    else {
        return i === 0 ? 1 : i === n ? 1 : (i % 2) === 0 ? 2 : 4;
    }
}
const fillTable = (tableNumber) =>{xi = a;
    for (let i = 0; i <= n; i++) {
        x = xi;
        fxi = Math.trunc(evalueFunction() * 10000) / 10000;
        k = getValueK(tableNumber, i);
        kFxi[i] = fxi * k;
        sumkFxi[tableNumber] += Math.trunc(kFxi[i] * 10000) / 10000;
        tableContainer[tableNumber].innerHTML += `
        <tr>
            <td>${i}</td>
            <td>${xi}</td>
            <td>${fxi}</td>
            <td>${k}</td>
            <td>${Math.trunc(kFxi[i] * 100000) / 100000}</td>
        </tr>`
        xi = Math.trunc((xi + anchoGral) * 10000) / 10000
    }
    resultSuma[tableNumber].innerHTML += `${resultSumaTxt[tableNumber]}${Math.trunc(sumkFxi[tableNumber] * 10000) / 10000}`
    let formulaUsar = formula[tableNumber]
    result[tableNumber].innerHTML += `${resultTxt} ${Math.trunc(eval(formulaUsar) * sumkFxi[tableNumber] * 10000) / 10000}`
}
const createTables = () => {
    for (let i = 0; i < tableContainer.length; i++) {
        if (i === 0 || (i === 1 && (n % 2) === 0)) {
            tableContainer[i].innerHTML += `
                <thead>
                    <th colspan="5">${reglaTxt[i]}</th>
                </thead>
                <tr>
                    <th>i</th>
                    <th>xi</th>
                    <th>f(xi)</th>
                    <th>k</th>
                    <th>k*f(xi)</th>
                </tr>`;
            fillTable(i);
        }
    }
}
const clear = () => {
    sumkFxi = [0, 0];
    errorTxt.textContent = '';
    derivadas = [];
    errores = [];
    erroresDerivada = [];
    max = []
    for (let j = 0; j < tableContainer.length; j++) {
        valErroresTxt[j].textContent = '';
        errorDerivadaTxt[j].textContent  = '';
        derivadasTxt.textContent = '';
        resultSuma[j].textContent = '';
        tableContainer[j].innerHTML = '';
        result[j].innerHTML = '';
        resultSuma[j].innerHTML = '';
    }
}

enable(inputE, false);
enable(inputN, false);

radioN.addEventListener("click", () => {
    enable(inputE, false);
    enable(inputN, true);
    radioE.checked = false;
});
radioE.addEventListener("click", () => {
    enable(inputN, false);
    enable(inputE, true);
    radioN.checked = false;
});
calcBtn.addEventListener("click", () => {
    clear();
    radioChecked = verifyChecked();
    if ((radioChecked && (inputN.value || inputE.value) && inputFx.value && inputA.value && inputB.value)) {
        if (radioChecked === 1) {
            if (inputN.value < 3) {
                errorTxt.textContent = `Ingrese un valor mayor para las particiones`
            }
            else {
                errorTxt.textContent = ``;
                calcDerivadas();
                calcAnchoGral();
                createTables();
                calcError();
            }
        }
        else {
            calcDerivadas();
            calcParticiones();
        }
    }
    else {
        if (!inputFx.value) {
            errorTxt.textContent = `Ingrese una función`
        }
        else if (!inputA.value) {
            errorTxt.textContent = `Ingrese un valor para el límite A`
        }
        else if (!inputB.value) {
            errorTxt.textContent = `Ingrese un valor para el límite B`
        }
        else if (radioChecked === 1 && !inputN.value) {
            errorTxt.textContent = `Ingrese un valor para particiones`
        }
        else if (radioChecked === 2 && !inputE.value) {
            errorTxt.textContent = `Ingrese un valor para el error`
        }
        else {
            errorTxt.textContent = `Debe ingresar las particiones o el error`
        }
    }
});