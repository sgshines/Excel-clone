let row = 100, col = 26;
let AddressColCont = document.querySelector(".address-col-cont")
let cellsCont = document.querySelector(".cells-cont");
let addressBar = document.querySelector(".address-bar");
/* Create a new div element for each address column and then set the class attribute .
 After that, set the innerText of that div element . Then finally append it to its parent element which is the address column container */
for(let i = 0; i < row; i++){
    let addressCol = document.createElement("div");
    addressCol.setAttribute("class","address-col");
    addressCol.innerText = i+1;
    AddressColCont.appendChild(addressCol);
}
let AddressRowCont = document.querySelector(".address-row-cont")
for(let i = 0; i < col; i++){
    let addressRow = document.createElement("div");
    addressRow.setAttribute("class", "address-row");
    addressRow.innerText = String.fromCharCode(65+i);
    AddressRowCont.appendChild(addressRow);
}
//running two loops to make the inner grid because it will be like 2d matrix
for(let i = 0; i < row; i++){
    let rowCont = document.createElement("div");
    rowCont.setAttribute("class", "row-cont");
    for(let j = 0; j < col; j++){
        let cell = document.createElement("div");
        cell.setAttribute("class","cell");
        cell.setAttribute("contenteditable", "true"); //making the cells editable
        cell.setAttribute("spellcheck", false);
        //attributes for cell and storage identification -> rid & cid
        cell.setAttribute("rid", i);
        cell.setAttribute("cid", j);
        addListenerforAddressBarDisplay(cell, i, j);
        rowCont.appendChild(cell);
    }
    cellsCont.appendChild(rowCont);
}
//using the addListenerforAddressBarDisplay function we will show the user on which cell he is currently on

function addListenerforAddressBarDisplay(cell, i, j){
    cell.addEventListener("click", (e) =>{
    let rowid = i + 1;
    let colid = String.fromCharCode(65+j);
    addressBar.value = `${colid}${rowid}`;
    })
}
//we are defining the default cell which will be already clicked whenever we reload the page

let firstcell = document.querySelector(".cell");
firstcell.click();