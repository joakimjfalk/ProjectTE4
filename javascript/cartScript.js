// Visa varukorgen
function displayCart() {
    const cart = getCart();
    const cartBody = document.getElementById('cart-body');
    let totalCost = 0;

    cartBody.innerHTML = '';  // Töm tabellen först

    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.price} SEK</td>
            <td>${item.price * item.quantity} SEK</td>
        `;
        cartBody.appendChild(row);
        totalCost += item.price * item.quantity;
    });

    document.getElementById('total-cost').innerText = totalCost;
}

// Ladda varukorgen när sidan laddas
window.onload = displayCart;

// Töm varukorgen
document.getElementById('clear-cart').addEventListener('click', () => {
    localStorage.removeItem('shoppingCart');
    displayCart();  // Uppdatera visningen
});
