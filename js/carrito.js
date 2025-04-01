

// Variables
let carrito = [];

// Cargar carrito desde localStorage al inicio
document.addEventListener("DOMContentLoaded", () => {
    cargarCarrito();
});

// Agregar producto al carrito
document.querySelectorAll(".agregar-carrito").forEach(boton => {
    boton.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        agregarAlCarrito(id);
    });
});

function agregarAlCarrito(id) {
    const producto = { id, cantidad: 1 };

    const productoEnCarrito = carrito.find(p => p.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push(producto);
    }

    guardarCarrito();
    actualizarCarrito();
}

// Guardar carrito en localStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Cargar carrito desde localStorage
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
}

// Actualizar la vista del carrito
function actualizarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    listaCarrito.innerHTML = "";

    carrito.forEach(producto => {
        const li = document.createElement("li");
        li.textContent = `Producto ${producto.id} - Cantidad: ${producto.cantidad}`;
        listaCarrito.appendChild(li);
    });
}

// Vaciar carrito
document.getElementById("vaciar-carrito").addEventListener("click", () => {
    carrito = [];
    guardarCarrito();
    actualizarCarrito();
});

import { productos } from "./productos.js"; // Importar productos

document.addEventListener("DOMContentLoaded", () => {
    const contenedorProductos = document.querySelector(".row"); // Selecciona el contenedor donde están los productos

    productos.forEach(producto => {
        const productoHTML = `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-3">
                <div class="card">
                    <img src="${producto.img}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body text-center">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text text-success fw-bold">$${producto.precio.toLocaleString()}</p>
                        <button class="btn btn-primary agregar-carrito" data-id="${producto.id}">Agregar</button>
                    </div>
                </div>
            </div>
        `;
        contenedorProductos.innerHTML += productoHTML;
    });
});
