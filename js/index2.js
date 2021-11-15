const input = document.getElementById('input');
const boton = document.getElementById('boton');

let llavesFactura = [];
let llavesProductos = [];
let detallesFactura = [];
let detallesProductos = [];
let productos = []

let selectedFile;

boton.addEventListener('click', () => {
    input.click();
});

input.addEventListener('change', (event) => {
    selectedFile = event.target.files[0];
    
    if(selectedFile.name.includes('xls') ||
        selectedFile.name.includes('csv')
    ){
        console.log(selectedFile.name);
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event) => {
            let data = event.target.result;
            let workbook = XLSX.read(data, {type: "binary"});
            workbook.SheetNames.forEach(sheet => {
                let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                console.log(rowObject);
            });
        };
    } else {
        alert('Error archivo con extensión incorrecta');
    }
});