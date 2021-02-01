var totalPay;

class Product {
    constructor(name, price, quantity, totalValue){
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.totalValue = totalValue;
    }
}

class Interface {

    addProduct(product){
        const productList = document.getElementById ("listaProductos");
        const element = document.createElement("div");
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Nombre</strong>: ${product.name} - 
                    <strong>Precio</strong>: ${product.price} - 
                    <strong>Cantidad</strong>: ${product.quantity} - 
                    <strong>Valor total</strong>: ${product.totalValue}   
                    <a href="#" class="btn btn-danger" name="eliminar">Eliminar</a>
                </div>
            </div>
        `;
        productList.appendChild(element);
    }

    clearForm(){
        document.getElementById("formularioProductos").reset();
    }

    deleteProduct(element){
        if(element.name === "eliminar"){
            console.log(element.parentElement.parentElement.parentElement.remove());
            this.showMessage("Producto eliminado", "info");
        }
    }

    showMessage(message, cssClass){
        const divv = document.createElement("div");
        divv.className = `alert alert-${cssClass} mt-2`;
        divv.appendChild(document.createTextNode(message));
        
        // Mostrar en el DOM
        const contenedor = document.querySelector(".container");
        const app = document.querySelector("#App");
        contenedor.insertBefore(divv, app);
        setTimeout(function (){
            document.querySelector(".alert").remove();
        },2000)
    }
}

//DOM Eventos
document.getElementById("formularioProductos").addEventListener("submit", function(e){
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const quantity = document.getElementById("quantity").value;
    const totalValue = price * quantity;
    

    const product = new Product(name, price, quantity, totalValue);
    const ui = new Interface();

    if (name === "" || price === "" || quantity === ""){
        return ui.showMessage("Elementos obligatorios", "danger")
    }
    ui.addProduct(product);
    ui.clearForm();
    ui.showMessage("Agregado exitosamente", "success");
    
    // Con este evento del formulario voy a evitar que la pagina se recargue
    e.preventDefault();
})


document.getElementById("listaProductos").addEventListener("click", function(e){

    const ui = new Interface();
    ui.deleteProduct(e.target);

});

