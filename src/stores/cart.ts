import { computed, map } from 'nanostores';

export const $cart = map<Record<number, CartItem>>({});

export function addToCart(item: ShopItem) {
	const cart = $cart.get();
	const count = cart[item.id]?.quantity || 0;
	$cart.setKey(item.id, {
		item,
		quantity: count + 1,
	});
}

export function removeFromCart(itemId: number) {
	// @ts-ignore
	$cart.setKey(itemId, undefined);
}

export const $subtotal = computed($cart, (entries) => {
	return Object.values(entries).reduce((sum, { item, quantity }) => {
		if (!item) return sum;
		return sum + item.price * quantity;
	}, 0);
});
