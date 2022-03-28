//focus event is fired when an element has gained focus.
//blur event is fired when an element has lost focus.
//the main difference between this event and focusout is that focusout bubbles while blur does not.
//we can't use click otherwise previous address will be lost blur work before click listener
// In formula.js what we wanna do is that we wanna give formula bar meaning 
//like if A1 = 10, A2 = 20 and if for B1 we write A1 + A2 in formula bar then it should show us 30
//and also if we change value of any one then value of resultant should also change

for(let i = 0; i < row; i++){
    for(let j = 0; j < col; j++){
        let cell =
        cellsCont.addEventListener("blur", (e) =>{
            let address = address.value;
            let[activecell, cellProp] = activecell(address);
            let enteredData = activecell.innerText;
            cellProp.value = enteredData;
        });
    }
}
//accessing the formula bar
let formulaBar = document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown", (e) =>{
    let inputFormula = formulaBar.value;
    if(e.key == "Enter" && formulaBar.value){
        let evaluatedValue = evaluateFormula(inputFormula);
        //for updating the cell UI and cellprop in db
        setCellUIAndCellProp(evaluatedValue,inputFormula);
    }
})

function evaluateFormula(formula){
    let encodedFormula = formula.split(" ");
    for(let i = 0; i < encodedFormula.length; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <= 90){
            let [cell, cellProp] = activecell(encodedFormula[i]);
            encodedFormula[i] = cellProp.value;
        }
    }
    //eval function is used to evaluate the formula in js
    return eval(encodedFormula.join(" "));
}

function setCellUIAndCellProp(value,formula){
    let address = addressBar.value;
    let[cell, cellProp] = activecell(address);
    //updating the cell UI
    cell.innerText = value;
    //db update
    cellProp.value = value;
    cellProp.formula = formula;
}
