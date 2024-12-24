// Каталог доступных продуктов
const products = [
    { id: 1, name: 'Розетка', price: 1000, image: 'images/socket.png' },
    { id: 2, name: 'Выключатель', price: 2000, image: 'images/switch.jpg' }
];

// Инициализация корзины
let cart = [];

/**
 * Добавление товара в корзину
 * @param {number} productId - ID товара
 */
function addToCart(productId) {
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    showNotification('Товар добавлен в корзину');
}

/**
 * Удаление товара из корзины
 * @param {number} index - Индекс товара в корзине
 */
function removeFromCart(index) {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    showNotification('Товар удален из корзины');
    displayCart();
}

/**
 * Показ уведомления с таймером
 * @param {string} message - Текст уведомления
 */
function showNotification(message) {
    // Удаляем предыдущее уведомление, если оно есть
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Создаем новое уведомление
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    // Добавляем текст уведомления
    const messageSpan = document.createElement('span');
    messageSpan.textContent = message;
    notification.appendChild(messageSpan);
    
    // Добавляем таймер
    const timerSpan = document.createElement('span');
    timerSpan.className = 'notification-timer';
    notification.appendChild(timerSpan);
    
    // Добавляем возможность закрыть по клику
    notification.addEventListener('click', () => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    });
    
    document.body.appendChild(notification);

    // Запускаем таймер обратного отсчета
    let timeLeft = 5;
    const timerInterval = setInterval(() => {
        timeLeft--;
        timerSpan.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }
    }, 1000);

    timerSpan.textContent = timeLeft;
}

/**
 * Отображение содержимого корзины
 */
function displayCart() {
    const cartContainer = document.getElementById('cart-items');
    if (!cartContainer) return;

    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cartItems;
    
    // Отображение пустой корзины
    if (cartItems.length === 0) {
        cartContainer.innerHTML = `
            <div class="cart-layout">
                <div class="cart-left">
                    <div class="empty-cart">
                        <p>Корзина пуста</p>
                        <a href="index.html" class="btn">Перейти к покупкам</a>
                    </div>
                </div>
                <div class="cart-right">
                    <div class="checkout-placeholder">
                        <h2>Оформление заказа</h2>
                        <p>Добавьте товары в корзину для оформления заказа</p>
                    </div>
                </div>
            </div>`;
        return;
    }

    // Отображение товаров в корзине
    let totalPrice = 0;
    let cartHTML = `
    <div class="cart-layout">
        <div class="cart-left">
            <div class="cart-items-container">`;
    
    // Формируем список товаров
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
    
    // Добавляем итоговую сумму и форму оформления
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
                <button type="submit" class="btn btn-success">Оформить заказ</button>
            </form>
        </div>
    </div>`;
    
    cartContainer.innerHTML = cartHTML;
    
    // Добавляем обработчик отправки формы
    const form = document.getElementById('checkout-form');
    if (form) {
        form.addEventListener('submit', handleCheckout);
    }
}

/**
 * Обработка отправки формы заказа
 * @param {Event} e - Событие отправки формы
 */
function handleCheckout(e) {
    e.preventDefault();
    alert('Заказ оформлен!');
    localStorage.removeItem('cart');
    cart = [];
    displayCart();
}

// Инициализация корзины при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    displayCart();
});
