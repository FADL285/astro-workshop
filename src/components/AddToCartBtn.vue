<script setup lang="ts">
import { defineProps } from 'vue';
import { addToCart } from '../stores/cart';

defineProps<{
	item: ShopItem;
}>();
</script>

<template>
	<button @click="addToCart(item)" class="big-link">Add To Cart 🛒</button>
</template>

<style scoped></style>
