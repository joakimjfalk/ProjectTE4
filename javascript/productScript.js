// Hämta varukorgen från LocalStorage
function getCart() {
    return JSON.parse(localStorage.getItem('shoppingCart')) || [];
}

// Spara varukorgen till LocalStorage
function saveCart(cart) {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

// Uppdatera badgen med antalet produkter i varukorgen
function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').innerText = totalItems;
}

// Visa varukorgen i tabellen
function displayCart() {
    const cart = getCart();
    const cartBody = document.getElementById('cart-body');
    cartBody.innerHTML = '';  // Töm tabellen
    let totalCost = 0;

    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        const itemTotal = item.price * item.quantity;
        totalCost += itemTotal;

        row.innerHTML = `
            <td>${item.name}</td>
            <td>
                <button class="decrease-quantity">−</button>
                <span class="item-quantity">${item.quantity}</span>
                <button class="increase-quantity">+</button>
            </td>
            <td>${item.price} SEK</td>
            <td>${itemTotal} SEK</td>
            <td><button class="remove-btn" data-index="${index}">Ta bort</button></td>
        `;
        cartBody.appendChild(row);
    });

    document.getElementById('total-cost').innerText = totalCost;
}

// Hantera klick på plus- och minusknappar för att uppdatera antal
document.addEventListener('click', function(event) {
    const cart = getCart();
    const target = event.target;

    if (target.classList.contains('increase-quantity')) {
        const index = [...target.closest('tr').children].indexOf(target.closest('td'));
        cart[index].quantity += 1;
        saveCart(cart);
        displayCart();
        updateCartCount();
    }

    if (target.classList.contains('decrease-quantity')) {
        const index = [...target.closest('tr').children].indexOf(target.closest('td'));
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
            saveCart(cart);
            displayCart();
            updateCartCount();
        }
    }

    // Hantera borttagning av produkt
    if (target.classList.contains('remove-btn')) {
        const index = target.getAttribute('data-index');
        cart.splice(index, 1);  // Ta bort produkten från varukorgen
        saveCart(cart);
        displayCart();
        updateCartCount();
    }
});

// Ladda varukorgen vid sidladdning
window.onload = function() {
    displayCart();
    updateCartCount();
};
