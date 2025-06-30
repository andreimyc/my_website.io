// Добавляем константы для часто используемых значений
const STORAGE_KEY = 'cart';
const NOTIFICATION_DURATION = 5000;

// Создаем класс для управления корзиной
class CartManager {
    constructor() {
        this.cart = [];
        this.products = [
            { id: 1, name: 'Розетка', price: 1000, image: 'images/socket.png' },
            { id: 2, name: 'Выключатель', price: 2000, image: 'images/switch.jpg' }
        ];
        this.init();
    }

    init() {
        this.loadCart();
        this.displayCart();
        this.updateCartCounter();
    }

    loadCart() {
        this.cart = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    }

    saveCart() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cart));
    }

    addToCart(productId) {
        this.cart.push(productId);
        this.saveCart();
        this.showNotification('Товар добавлен в корзину');
        this.updateCartCounter();
    }

    removeFromCart(index) {
        this.cart.splice(index, 1);
        this.saveCart();
        this.showNotification('Товар удален из корзины');
        this.displayCart();
        this.updateCartCounter();
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartCounter();
        this.displayCart();
        this.showNotification('Корзина очищена');
    }

    // ... остальные методы класса
}

// Инициализация при загрузке страницы
const cartManager = new CartManager();
document.addEventListener('DOMContentLoaded', () => cartManager.init());
