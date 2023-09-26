<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from '@nanostores/vue';
import { $cart, removeFromCart, $subtotal } from '../stores/cart';
import { formatCurrency } from '../utils';

const cart = useStore($cart);
const subtotal = useStore($subtotal);
const SHIPPING_COST = 0;
const total = computed(() => subtotal.value + SHIPPING_COST);

const isCartEmpty = computed(() => Object.values(cart.value).length === 0);
// remove undefined entries and cart items with quantity of 0 from cart
const cleanedCart = computed(() =>
	Object.values(cart.value).filter((entry) => entry && entry.quantity > 0)
);

const isCheckoutOpened = ref(false);
const toggleCheckout = () => (isCheckoutOpened.value = !isCheckoutOpened.value);
</script>

<template>
	<aside class="cart">
		<h2>Your Cart</h2>
		<div v-if="!isCartEmpty">
			<ul class="items">
				<li
					v-for="{ item, quantity } in cleanedCart"
					:key="item.id"
					class="item"
				>
					<span class="quantity">
						{{ quantity }}
					</span>
					<span class="name">
						{{ item.title }}
					</span>
					<span class="remove">
						<button title="remove item" @click="removeFromCart(item.id)">
							&times;
						</button>
					</span>
					<span class="price">
						{{ formatCurrency(item.price) }}
					</span>
				</li>
			</ul>
			<div class="details">
				<p class="subtotal">
					<span class="label">Subtotal</span>
					<span class="price">{{ formatCurrency(subtotal) }}</span>
				</p>
				<p class="shipping">
					<span class="label">Shipping</span>
					<del>$5.00</del>
					<ins>FREE</ins>
				</p>
				<p class="total">
					<span class="label">Total</span>
					<span class="price">{{ formatCurrency(total) }}</span>
				</p>

				<p class="checkout">
					<button class="big-link" @click="toggleCheckout">Checkout</button>
				</p>

				<p class="notice" v-if="isCheckoutOpened">
					Checkout is not implemented yet. This is just a demo.
				</p>
			</div>
		</div>
		<div v-else>
			<p class="icon">
				<span role="img" aria-label="hot dog"> 🌭 </span>
			</p>
			<p class="empty">
				Your cart is empty.
				<br />
				<span class="notice">Add some delicious sandwiches!</span>
			</p>
		</div>
	</aside>
</template>

<style scoped>
.cart {
	font-size: 0.875rem;
	margin: 2rem 0;
	position: sticky;
	top: 1rem;
}

.cart h2 {
	margin: 0;
}

.items {
	border-top: 1px solid var(--color-gray-100);
	list-style: none;
	padding: 0;
}

.item {
	border-bottom: 1px solid var(--color-gray-100);
	display: grid;
	font-variant: tabular-nums;
	grid-template-columns: 20px 1fr 20px 70px;
	padding: 0.625rem 0;
}

.quantity {
	color: var(--color-gray-600);
}

.name {
	color: var(--color-gray-900);
	font-weight: 500;
}

.remove button {
	background: none;
	border: 0;
	color: var(--color-gray-600);
	font-size: 1rem;
	font-weight: 900;
}

.price {
	color: var(--color-gray-600);
	text-align: right;
}

.subtotal,
.shipping,
.total {
	display: flex;
	justify-content: space-between;
	margin: 0.25rem 0 0;
}

.label {
	margin-inline-end: auto;
}

.shipping del {
	color: var(--color-gray-600);
	font-weight: 300;
	margin-inline: 0.25rem;
}

.shipping ins {
	color: var(--color-gray-900);
	font-weight: 500;
	text-decoration: none;
}

.checkout :global(.big-link) {
	font-size: 1rem;
}

.icon {
	font-size: 2rem;
	margin: 1rem 0 0.25rem;
	text-align: center;
}

.empty {
	color: var(--color-gray-600);
	margin: 0;
}

.notice {
	color: var(--color-gray-600);
	font-style: italic;
	text-align: center;
}
</style>
