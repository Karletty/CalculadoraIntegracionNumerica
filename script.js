const btn = document.querySelector("button");
const tableContainer = document.getElementsByClassName("table");
const resultSuma = document.getElementsByClassName("result-suma");
const resultSumaTxt = ["La suma del trapecio es ", "La suma de Simpson es "];
const anchoGeneralTxt = document.querySelector(".ancho-general");
const result = document.getElementsByClassName("result");
const resultTxt = "La integral es: ";
const reglaTxt = ["REGLA DEL TRAPECIO", "REGLA DE SIMPSON"]
const formula = ["(b-a)/(2*n)", "(b-a)/(3*n)"];
let fx, a, b, n, anchoGeneral, xi, fxi, k, kFxi = [], x, sumkFxi = [0, 0];
const evalueFunction = () => {
    return eval(fx);
}
const declare = () => {
    fx = document.querySelector(".function").value;
    a = parseFloat(document.querySelector(".a").value);
    b = parseFloat(document.querySelector(".b").value);
    n = parseFloat(document.querySelector(".n").value);
    if(n>=3){
        anchoGeneral = (b - a) / n;
        createTable();
    }
    else{
        anchoGeneralTxt.textContent = `Intente con más particiones`
    }
}
const getKValue = (tableNumber, i) => {
    if (tableNumber === 0) {
        return i === 0 ? 1 : i === n ? 1 : 2;
    }
    else {
        return i === 0 ? 1 : i === n ? 1 : (i % 2) === 0 ? 2 : 4;
    }
}
const fillTable = tableNumber => {
    xi = a;
    for (let i = 0; i <= n; i++) {
        x = xi;
        fxi = Math.trunc(evalueFunction() * 10000) / 10000;
        anchoGeneralTxt.textContent = `El ancho general es de ${Math.trunc(anchoGeneral*10000)/10000}`;
        k = getKValue(tableNumber, i);
        kFxi[i] = fxi * k;
        sumkFxi[tableNumber] += parseFloat(kFxi[i].toFixed(4));
        tableContainer[tableNumber].innerHTML += `
        <tr>
            <td>${i}</td>
            <td>${xi}</td>
            <td>${fxi}</td>
            <td>${k}</td>
            <td>${Math.trunc(kFxi[i] * 100000) / 100000}</td>
        </tr>`
        xi = parseFloat((xi + anchoGeneral).toFixed(4))
    }
    resultSuma[tableNumber].innerHTML += `${resultSumaTxt[tableNumber]}${Math.trunc(sumkFxi[tableNumber] * 10000) / 10000}`
    let formulaUsar = formula[tableNumber]
    result[tableNumber].innerHTML += `${resultTxt} ${Math.trunc(eval(formulaUsar) * sumkFxi[tableNumber] * 10000) / 10000}`
}
const createTable = () => {
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
            fillTable(i)
        }
    }
}
const clear = () => {
    sumkFxi = [0, 0];
    for (let j = 0; j < tableContainer.length; j++) {
        tableContainer[j].innerHTML = '';
        result[j].innerHTML = '';
        resultSuma[j].innerHTML = '';
    }
}
btn.addEventListener("click", e = () => {
    clear()
    declare();
});