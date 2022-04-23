//now we will define our storage
let sheetDB = [];
for(let i = 0; i < row; i++){
    let sheetRow = [];
    for(let j = 0; j < col; j++){
        //object to store the properties of cell
        let cellProp = {
            bold: false,
            italic: false,
            underline: false,
            alignment: "left",
            fontFamily: "Monospace",
            fontSize: "14",
            fontColor: "#000000",
            Bgcolor: "#000000",
            value: "",
            formula: "",
            children: []
        }
        sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
}

//selectors for our cell properties
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
let fontColor = document.querySelector(".font-color-prop");
let Bgcolor = document.querySelector(".Bg-color-prop");
let alignment = document.querySelectorAll(".alignment");
let leftAlign =  alignment[0];
let centerAlign =  alignment[1];
let rightAlign =  alignment[2];

let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ecf0f1";

//now we are going to attach the properties listeners
//to access the active cell decode the address bar value (rid,cid) then select that
//through rid and cid we will access the cell
//two way binding-> data  & UI both modified
//application of 2 way binding
bold.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activecell(address); // getting the cell and its storage
    // modification on text by clicking bold
    cellProp.bold = !cellProp.bold; //if false make it true on clicking and vice versa
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal"; //if bold property of cell object is true make it bold otherwise normal
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp; // changing the color on clicking
})

italic.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activecell(address); // getting the cell and its storage
    // modification on text by clicking italic
    cellProp.italic = !cellProp.italic; //if false make it true on clicking and vice versa
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal"; //if italic property of cell object is true make it italic otherwise normal
    italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp; // changing the color on clicking
})

underline.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activecell(address); // getting the cell and its storage
    // modification on text by clicking underline
    cellProp.underline = !cellProp.underline; //if false make it true on clicking and vice versa
    cell.style.textDecoration = cellProp.underline ? "underline" : "none"; //if underline property of cell object is true make it underline otherwise none
    underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp; // changing the color on clicking
})

fontSize.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activecell(address);

    cellProp.fontSize = fontSize.value;
    cell.style.fontSize = cellProp.fontSize + "px";
    fontSize.value = cellProp.fontSize;
})

fontFamily.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activecell(address);

    cellProp.fontFamily = fontFamily.value;
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamily.value = cellProp.fontFamily;
})

fontColor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activecell(address);

    cellProp.fontColor = fontColor.value;
    cell.style.color = cellProp.fontColor;
    fontColor.value = cellProp.fontColor;
})

Bgcolor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activecell(address);

    cellProp.Bgcolor = Bgcolor.value;
    cell.style.backgroundColor = cellProp.Bgcolor;
    Bgcolor.value = cellProp.Bgcolor;
})

alignment.forEach((alignElem) => {
    alignElem.addEventListener("click", (e) =>{
        let address = addressBar.value;
        let [cell, cellProp] = activecell(address);

        let alignValue = e.target.classList[0]; // event.target will give t the property which is triggered we will
        cellProp.alignment = alignValue;  //data change
        cell.style.textAlign = cellProp.alignment; //ui change
        switch(alignValue){ // ui change part 2, highlighting that icon which is being clicked
            case 'left':
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case 'center':
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case 'right':
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;
        }
        let formularBar = document.querySelector(".formular-bar");
        formularBar.value = cellProp.formula;
        cell.value = cellProp.value;
        
    })
})

//getting access of all cells
let allCells = document.querySelectorAll(".cell");
for(let i = 0; i < allCells.length; i++){
    addListenerToAttachCellProperties(allCells[i]);
}
function addListenerToAttachCellProperties(cell){
    cell.addEventListener("click", (e) =>{
        let address = addressBar.value;
        let [rid,cid] = decoder_rid_cid(address);
        let cellProp = sheetDB[rid][cid];
        //apply all cell properties
        cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
        cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
        cell.style.textDecoration = cellProp.underline ? "underline" : "none";
        cell.style.fontSize = cellProp.fontSize + "px";
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.color = cellProp.fontColor;
        cell.style.backgroundColor = cellProp.Bgcolor === "#000000" ? "transparent" : cellProp.Bgcolor;
        cell.style.textAlign = cellProp.alignment;

        //apply properties ui container
        bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp; 
        italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp; 
        underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
        fontColor.value = cellProp.fontColor;
        Bgcolor.value = cellProp.Bgcolor;
        fontSize.value = cellProp.fontSize;
        fontFamily.value = cellProp.fontFamily;
        switch(cellProp.alignment){ // ui change part 2, highlighting that icon which is being clicked
            case 'left':
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case 'center':
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case 'right':
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;
        }
    })
}
function decoder_rid_cid(address){
    console.log(address);
    let rid = Number(address.slice(1))-1;   // "1" -> 0 since we have taken the row in grid as i+1
    let cid = Number(address.charCodeAt(0)) - 65; // taking a as 0 
    return [rid, cid];
}

function getCellAndCellProp(address){
    let [rid, cid] = decoder_rid_cid(address); // accessing the rid and cid using destructuring of array
    //acess cell and storage object
    console.log(rid,cid);
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellProp = sheetDB[rid][cid];
    return [cell, cellProp];
}

