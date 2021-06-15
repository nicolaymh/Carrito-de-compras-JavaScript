//Variables
const carrito = document.querySelector(`#imagen-carrito`);
const listaCarrito = document.querySelector(`.contenedor-carrito`);
const agregarCarrito = document.querySelector(`.contenido-articulos`);
const listaDispositivosCarrito = document.querySelector(`#lista-carrito tbody`);
const vaciarCarrito = document.querySelector(`#vaciar-carrito`);
const totalPagar = document.querySelector(`h5 span`);
let datosCarrito = [];

//Events
funcionEventos();
function funcionEventos(){
    carrito.addEventListener(`click`, mostrarOcultarCarrito);    
    agregarCarrito.addEventListener(`click`, agregarDispositivo);
    listaDispositivosCarrito.addEventListener(`click`, quitarDispositivoCarrito);
    vaciarCarrito.addEventListener(`click`, limpiarCarrito);    
}

//Functions
//Show and hide cart
function mostrarOcultarCarrito(e){
    if(e.target.getAttribute(`id`) === `imagen-carrito`){
        if(listaCarrito.classList.contains(`ocultar`)){            
            listaCarrito.classList.remove(`ocultar`);            
        }
        else{
            listaCarrito.classList.add(`ocultar`);
        }
    }
}

//Add Device
function agregarDispositivo(e){
    e.preventDefault();
    if(e.target.classList.contains(`boton`)){
        const agregandoDispositivo = e.target.parentElement.parentElement;
        LeerDispositivo(agregandoDispositivo);        
        calcularTotal();
        console.log(datosCarrito);
    }     
}

//Read Device
function LeerDispositivo(dispositivo){    
    const datosDispositivo = {
        imagen: dispositivo.querySelector(`img`).src,
        nombre: dispositivo.querySelector(`h3`).textContent,
        precio: dispositivo.querySelector(`.contenido p+p span`).textContent,
        id: dispositivo.querySelector(`a`).getAttribute(`id`),
        cantidad: 1,    
    }
    if(datosCarrito.some( datos => datos.id === datosDispositivo.id)){
        const dispositivo = datosCarrito.map( datos => {
            if(datos.id === datosDispositivo.id){
                datos.cantidad++;
                return datos;
            }else{
                return datos;
            }            
        })
        datosCarrito = [...dispositivo];
    }
    else{
        datosCarrito = [...datosCarrito, datosDispositivo];
    }    
    CrearListaCarritoHTML()
}

//Adding the list to the shopping cart
function CrearListaCarritoHTML(){
    LimpiarCarritoHTML()

    datosCarrito.forEach(datos => {
        const row = document.createElement(`tr`);
        const { imagen, nombre, precio, cantidad, id } = datos
        row.innerHTML = `
            <td>
                <img src="${imagen}" width=100>
            </td>
            <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="quitar-dispositivo" id="${id}">X</a>
            </td>
        `;
        listaDispositivosCarrito.appendChild(row); 
    })
    // console.log(datosCarrito)       
}

//Clear cart list in the HTML document
function LimpiarCarritoHTML(){
    while(listaDispositivosCarrito.firstChild){
        listaDispositivosCarrito.removeChild(listaDispositivosCarrito.firstChild);
    }
}

function quitarDispositivoCarrito(e){
    e.preventDefault();
    if(e.target.classList.contains(`quitar-dispositivo`)){        
        const idDispositivo = e.target.getAttribute(`id`);
        const nuevaLista = datosCarrito.filter( datos => datos.id !== idDispositivo);
        // datosCarrito = [];
        datosCarrito = [...nuevaLista];
        CrearListaCarritoHTML();
        calcularTotal();
    }
}

function limpiarCarrito(e){
    e.preventDefault();
    LimpiarCarritoHTML();
    datosCarrito = [];
    calcularTotal();
    // console.log(datosCarrito);
}

//Calculate the total
function calcularTotal(){
    if(datosCarrito.length !== 0){
        const total = datosCarrito.reduce((accumulator, currentValue) => accumulator + currentValue.precio  * currentValue.cantidad, 0);
        totalPagar.textContent = total;
        // console.log(total);
    }
    else{
        totalPagar.textContent = 0;
    }
}

