// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const overdueAssetsBox = document.querySelector(".autocom-box");
const contactForm = document.querySelector('.contact-form');
const messageInp = contactForm.querySelector('textarea');
const icon = searchWrapper.querySelector(".icon");
const headers = ['Name', 'Category', 'Date'];
const URL = ""
let overdueAssets = [
    ['Name1', 'Category1', 'Date1'],
    ['Name2', 'Category2', 'Date2'],
    ['Name3', 'Category3', 'Date3'],
    ['Name4', 'Category4', 'Date4']];

// Fetch overdueAssets from server by passing query
const setoverdueAssets = async(value) =>{
	let response = await fetch(`${URL}/${value}`, {
		method: "GET",
		headers: {'content-type': 'application/json'},
	});   
	if(response.ok){
		overdueAssets = await response.json();
        
		if(overdueAssets.length == 0){
			overdueAssets = undefined
		}
	} else{
		overdueAssets = undefined
	}
}

// Generate table body
const genTable = (rows) => {
    // Set table header
    if(rows){
        let tbl = document.createElement("table");
        let tblHead = document.createElement("thead");
        let th = document.createElement("th");
        for (let i=0; i<headers.length; i++){
            let cell = document.createElement("td");
            let cellText = document.createTextNode(headers[i]);
            cell.appendChild(cellText);
            th.appendChild(cell)
        }
        tblHead.appendChild(th);
        let tblBody = document.createElement("tbody");
        // Set table body
        for (let i=0; i<rows.length; i++){
            let tr = document.createElement("tr");
            for (let j=0; j<rows[i].length; j++){
                let cell = document.createElement("td");
                let cellText = document.createTextNode(rows[i][j]);
                cell.appendChild(cellText);
                tr.appendChild(cell)
            }
            tblBody.appendChild(tr);
        }
        tbl.appendChild(tblHead);
        tbl.appendChild(tblBody);
        searchWrapper.classList.add("active");
        return tbl;
    }else{
        overdueAssetsBox.innerHTML = "";
        searchWrapper.classList.remove("active");
    }
}

// if user press any key and release
inputBox.onkeyup = (e)=>{
    // setoverdueAssets(inputBox.value)
    overdueAssetsBox.innerHTML = '';
    overdueAssetsBox.appendChild(genTable(overdueAssets));
    if (overdueAssets) {addRowHandlers();}
}

const addRowHandlers = () => {
    let table = overdueAssetsBox.querySelector("table");
    let rows = table.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
        let currentRow = table.rows[i];
        let createClickHandler = (row) => {
            return function() {
                let message = [];
                let data = row.getElementsByTagName("td");
                for (let j = 0; j < data.length; j++) {
                    message.push(data[j].innerHTML);
                };
                messageInp.value = message.join();
            };
        }
        currentRow.onclick = createClickHandler(currentRow);
    }   
}