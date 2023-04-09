import {menuArray} from './data.js'

const loginModal = document.getElementById('modal')
const loginForm = document.getElementById('form-data')
const checkoutSection = document.getElementById('checkout-section')
let products = [] 

render()

    //  Función para arrancar la aplicación
function render(){
    const items = document.getElementById('items')
    let menu = ''
    menuArray.forEach(function(foodItem){
        menu += `<div class="item">
                    <img class="item-graphic" src=${foodItem.image} alt="icon">
                    <div class="descriptive-container">
                        <h6 class="item-title"> ${foodItem.name} </h6>
                        <p class="item-description">${foodItem.ingredients}</p>
                        <h6 class="item-price">$ ${foodItem.price}</h6>
                    </div>
                    <button class="add-btn" id="add-btn" data-item=${foodItem.id}> + </button>
                </div>`
    })
    items.innerHTML = menu
}
 
    // Funcion para generar la orden
    //     Presionar el boton + que añade un producto (saber que producto seleccione)
document.addEventListener('click', function(e){
    if(e.target.dataset.item){
        addProduct(e.target.dataset.item)
    }
    else if(e.target.id === 'remove-btn'){
        let idRemove = e.target.dataset.remove
        products.splice(products.findIndex(product => product.id == idRemove),1)
            render()
            renderCheckout()
    }
    else if(e.target.id === 'order-btn'){
        loginModal.style.display = 'block'
    }
    else if(e.target.id === 'pay-btn'){
        e.preventDefault()
        loginModal.style.display = 'none'
        render()
        renderThanks()
        products = []
    }

})
    //     Cojo el producto que seleccione con + de la lista de productos  (buscar con un filtro y sacar ese producto y guardarlo como objeto en un arreglo)
function addProduct(itemNumber){
    let product = menuArray.filter(function(item){
        return item.id == itemNumber
    })[0]
    products.push(product)
    renderCheckout()
}       
    //     Poner el nombre del producto y el precio en la lista (coger el objeto que guarde en el arrego el imprimirlo. Debo generar un arreglo general de lo que el cliente añada para imprimirlo despues)
    
function renderCheckout(){    
    let listOfProducts = ''
    let totalPrice = 0
    products.forEach(function(itemProduct){
        totalPrice += itemProduct.price //   Suma los valores de los prodcutos
        listOfProducts += `
            <div class="order-list">
                <h6 class="order-name">${itemProduct.name}</h6>
                <button id="remove-btn" data-remove=${itemProduct.id}>Remove</button>
                <h6 class="item-price order-price">$${itemProduct.price}</h6>
            </div>
        `
    })
        //     Imprimir la seccion de total
    checkoutSection.innerHTML = `
            <h6 class="order-title">Your Order</h6> 
            ${listOfProducts}
            <div class="separator"></div>
            <div class="order-list total-section">
                <h6 class="order-name">Total price:</h6>
                <h6 class="item-price">$${totalPrice}</h6>
            </div>
            <button id="order-btn">Complete order</button>
            `  
}
    //  Imprimir las gracias despues de realizar el pedido
function renderThanks(){
    const clientDataForm = new FormData(loginForm)
    const clientName = clientDataForm.get('client-name')
    checkoutSection.innerHTML = `
        <div class="thanks-container">
            <p>Thanks ${clientName}! Your order is on its way!</p>
        </div>
        `
}



