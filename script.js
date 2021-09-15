const btn = document.querySelector("button");
const tableContainer = document.getElementsByClassName("table");
const resultSuma = document.getElementsByClassName("result-suma");
const resultSumaTxt = ["La suma del trapecio es ", "La suma de Simpson es "];
const result = document.getElementsByClassName("result");
const resultTxt = "La integral es:"
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
    anchoGeneral = (b - a) / n;
    createTable();
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
        xi = xi + anchoGeneral;
    }
    resultSuma[tableNumber].innerHTML += `${resultSumaTxt[tableNumber]}${Math.trunc(sumkFxi[tableNumber] * 10000) / 10000}`
    let formulaUsar = formula[tableNumber]
    result[tableNumber].innerHTML += `${resultTxt} ${Math.trunc(eval(formulaUsar) * sumkFxi[tableNumber] * 10000) / 10000}`
}
const createTable = () => {
    for (let i = 0; i < tableContainer.length; i++) {
        tableContainer[i].innerHTML = '';
        result[i].innerHTML = '';
        resultSuma[i].innerHTML = '';
        if(i ===0 || (i === 1 && (n % 2) === 0)){
            tableContainer[i].innerHTML += `
                <thead>
                    <th>i</th>
                    <th>xi</th>
                    <th>f(xi)</th>
                    <th>k</th>
                    <th>k*f(xi)</th>
                </thead>`;
            fillTable(i)
        }
    }
}
btn.addEventListener("click", e = () => {
    declare();
});