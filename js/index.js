const input = document.getElementById('input');
const boton = document.getElementById('boton');

let llavesFactura = [];
let llavesProductos = [];
let detallesFactura = [];
let detallesProductos = [];
let productos = []

boton.addEventListener('click', () => {
    input.click();
});

input.addEventListener('change', () => {
    //para archivos xlsx
    readXlsxFile(input.files[0]).then((rows) => {
        rows.map((row, index) => {
            if(index === 0) {
                llavesFactura = row;
                llavesProductos = llavesFactura.splice(7,5);
                llavesFactura = llavesFactura.splice(0,7);
            }
            if(index === 1) {
                detallesFactura = row;
                detallesFactura.splice(7,5);
            }
            if(index > 1) {
                detallesProductos = row;
                detallesProductos.splice(0,7);
                productos[index - 2] = detallesProductos;
            }
        });
        console.log(llavesFactura);
        const json = {};
        llavesFactura.forEach((element,index) => {
            json[element] = detallesFactura[index];
        });
        json.detalles = [];
        productos.forEach((element, index) => {
            const detalle = element;
            const jsonDetalle = {};
            llavesProductos.forEach((element, index) => {
                jsonDetalle[element] = detalle[index];
            });
            json.detalles[index] = jsonDetalle;
        });
        console.log(json);
    });
});