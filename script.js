// Массив продуктов
const products = [
    { id: 1, name: 'Розетка', price: 1000, image: 'images/socket.png' },
    { id: 2, name: 'Выключатель', price: 2000, image: 'images/switch.jpg' }
];

// Корзина
let cart = [];

// Добавление товара в корзину
function addToCart(productId) {
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    showNotification('Товар добавлен в корзину');
}

// Добавим новую функцию для отображения уведомления
function showNotification(message) {
    // Удаляем предыдущее уведомление, если оно есть
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Создаем новое уведомление
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Удаляем уведомление после анимации
    setTimeout(() => {
        notification.remove();
    }, 2500); // 2.5 секунды (2с на отображение + 0.5с на исчезновение)
}

// Удаление товара из корзины
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Отображение товаров в корзине
function displayCart() {
    if (document.getElementById('cart-items')) {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const cartContainer = document.getElementById('cart-items');
        const checkoutForm = document.getElementById('checkout-form');
        
        if (cartItems.length === 0) {
            cartContainer.innerHTML = `
                <div class="cart-layout">
                    <div class="cart-left">
                        <div class="empty-cart">
                            <p>Корзина пуста</p>
                            <a href="index.html">Перейти к покупкам</a>
                        </div>
                    </div>
                    <div class="cart-right">
                        <div class="checkout-placeholder">
                            <h2>Оформление заказа</h2>
                            <p>Добавьте товары в корзину для оформления заказа</p>
                        </div>
                    </div>
                </div>`;
            if (checkoutForm) {
                checkoutForm.style.display = 'none';
            }
            return;
        }

        // Показываем форму оформления заказа
        if (checkoutForm) {
            checkoutForm.style.display = 'flex';
        }

        let totalPrice = 0;
        let cartHTML = `
        <div class="cart-layout">
            <div class="cart-left">
                <div class="cart-items-container">`;
        
        cartItems.forEach((productId, index) => {
            const product = products.find(p => p.id === productId);
            if (product) {
                totalPrice += product.price;
                cartHTML += `
                    <div class="cart-item">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="cart-item-info">
                            <h3>${product.name}</h3>
                            <p>Цена: ${product.price} ₽</p>
                        </div>
                        <button onclick="removeFromCart(${index})" class="remove-btn">Удалить</button>
                    </div>
                `;
            }
        });
        
        cartHTML += `
                    <div class="cart-total">
                        <h3>Итого: ${totalPrice} ₽</h3>
                    </div>
                </div>
            </div>
            <div class="cart-right">
                <form id="checkout-form">
                    <h2>Оформление заказа</h2>
                    <input type="text" placeholder="Имя" required>
                    <input type="email" placeholder="Email" required>
                    <input type="tel" placeholder="Телефон" required>
                    <button type="submit">Оформить заказ</button>
                </form>
            </div>
        </div>`;
        
        cartContainer.innerHTML = cartHTML;
    }
}

// Обработка формы оформления заказа
if (document.getElementById('checkout-form')) {
    document.getElementById('checkout-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Заказ оформлен!');
        localStorage.removeItem('cart');
        cart = [];
        displayCart();
    });
}

// Инициализация корзины при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    displayCart();
});
