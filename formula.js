//focus event is fired when an element has gained focus.
//blur event is fired when an element has lost focus.
//the main difference between this event and focusout is that focusout bubbles while blur does not.
//we can't use click otherwise previous address will be lost blur work before click listener
// In formula.js what we wanna do is that we wanna give formula bar meaning 
//like if A1 = 10, A2 = 20 and if for B1 we write A1 + A2 in formula bar then it should show us 30
//and also if we change value of any one then value of resultant should also change

for(let i = 0; i < row; i++){
    for(let j = 0; j < col; j++){
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        cellsCont.addEventListener("blur", (e) =>{
            let address = addressBar.value;
            let[activecell, cellProp] = getCellAndCellProp(address);
            let enteredData = activecell.innerText;

            if(enteredData === cellProp.value) return;

            cellProp.value = enteredData;
            //if data modifies remove P-c relation, formula empty and update children with new value
            removeChildFromParent(cellProp.formula);
            cellProp.formula = "";
            updateChildrenCells(address);
        });
    }
}
//accessing the formula bar
let formulaBar = document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown", (e) =>{
    let inputFormula = formulaBar.value;
    if(e.key == "Enter" && formulaBar.value){
        //if change in formula bar then remove P-c relation, formula empty and update children with new value
        let address = addressBar.value;
        console.log(address);
        let [cell, cellProp] = getCellAndCellProp(address);
        console.log(cellProp);
        if(inputFormula !== cellProp.formula); removeChildFromParent(cellProp.formula);
        let evaluatedValue = evaluateFormula(inputFormula);
        //for updating the cell UI and cellprop in db
        setCellUIAndCellProp(evaluatedValue,inputFormula, address);
        addChildToParent(inputFormula);
    }
})

function evaluateFormula(formula){
    let encodedFormula = formula.split(" ");
    for(let i = 0; i < encodedFormula.length; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <= 90){
            let [cell, cellProp] = getCellAndCellProp(encodedFormula[i]);
            encodedFormula[i] = cellProp.value;
        }
    }
    //eval function is used to evaluate the formula in js
    let decodedformula = encodedFormula.join(" ");
    return eval(decodedformula);
}

function setCellUIAndCellProp(value,formula,address){
    let[cell, cellProp] = getCellAndCellProp(address);
    //updating the cell UI
    cell.innerText = value;
    //db update
    cellProp.value = value;
    cellProp.formula = formula;
}

function addChildToParent(formula){
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    for(let i = 0; i < encodedFormula.length; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <= 90){
            let [parentCell, parentCellProp] = getCellAndCellProp(encodedFormula[i]);
            parentCellProp.children.push(childAddress);
        }
    }
}

function removeChildFromParent(formula){
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    for(let i = 0; i < encodedFormula.length; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <= 90){
            let [parentCell, parentCellProp] = getCellAndCellProp(encodedFormula[i]);
            parentCellProp.children.splice(parentCellProp.children.indexOf(childAddress),1);
        }
    }
}

function updateChildrenCells(parentAddress){
    let [parentCell, parentCellProp] = getCellAndCellProp(parentAddress);
    let children = parentCellProp.children;
    for(let i = 0; i < children.length; i++){
        let childAddress = children[i];
        let [childrenCell, childCellProp] = getCellAndCellProp(childAddress);
        let childFormula = childCellProp.formula;
        let evaluatedValue = evaluateFormula(childFormula);
        setCellUIAndCellProp(evaluatedValue,childFormula, childAddress);
        updateChildrenCells(childrenAddress);
    }
}
