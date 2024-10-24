// Hämtar varukorgen från localStorage
const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// Funktion för att räkna ut totalsumma
function calculateTotal() {
    let subtotal = 0;
    cartItems.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    const vat = subtotal * 0.25;  // 25% moms
    const total = subtotal + vat;

    document.getElementById('subtotal').textContent = `${subtotal.toFixed(2)} kr`;
    document.getElementById('vat').textContent = `${vat.toFixed(2)} kr`;
    document.getElementById('total').textContent = `${total.toFixed(2)} kr`;
}

// Funktion för att generera varukorgsobjekten i tabellen
function renderCart() {
    const cartTable = document.getElementById('cart-items');
    cartTable.innerHTML = '';

    cartItems.forEach((item, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td class="product-details">
                <img src="${item.image}" alt="Produktbild">
                <div>
                    <h3>${item.name}</h3>
                    <p>Art nr: ${item.sku}</p>
                    <p>Märke: ${item.brand}</p>
                </div>
            </td>
            <td>${item.price.toFixed(2)} kr</td>
            <td class="quantity">
                <button onclick="updateQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${index}, 1)">+</button>
            </td>
            <td>${(item.price * item.quantity).toFixed(2)} kr</td>
            <td>
                <button class="delete-btn" onclick="removeItem(${index})">&#128465;</button>
            </td>
        `;
        cartTable.appendChild(row);
    });

    calculateTotal();
}

// Funktion för att uppdatera kvantiteten
function updateQuantity(index, change) {
    cartItems[index].quantity += change;
    if (cartItems[index].quantity <= 0) {
        removeItem(index);
    } else {
        localStorage.setItem('cart', JSON.stringify(cartItems));
        renderCart();
    }
}

// Funktion för att ta bort en produkt från varukorgen
function removeItem(index) {
    cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    renderCart();
}

// Rendera varukorgen när sidan laddas
document.addEventListener('DOMContentLoaded', renderCart);
