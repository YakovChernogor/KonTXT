<template>
	<component :style="`min-width: ${size}; min-height: ${size}; max-width: ${size}; max-height: ${size}`" :is="name" class="icon" :width="size" :height="size"></component>
</template>

<script setup>
defineProps({
	name: {
		type: Object,
		required: true
	},
	size: {
		type: Number,
		default: 32
	}
})
</script>

<style scoped lang="scss">
.icon {
	:deep(path[fill]),
	:deep(ellipse[fill]),
	:deep(circle[fill]),
	:deep(line[fill]),
	:deep(polygon[fill]),
	:deep(rect[fill]) {
		fill: var(--color-dynamic-black);
	}
	:deep(path[fill="white"]),
	:deep(ellipse[fill="white"]),
	:deep(circle[fill="white"]),
	:deep(line[fill="white"]),
	:deep(polygon[fill="white"]),
	:deep(rect[fill="white"]) {
		fill: var(--color-dynamic-white);
	}
	:deep(path[stroke]),
	:deep(ellipse[stroke]),
	:deep(circle[stroke]),
	:deep(line[stroke]),
	:deep(polygon[stroke]),
	:deep(rect[stroke]) {
		stroke: var(--color-dynamic-black);
	}
	:deep(path[stroke="white"]),
	:deep(ellipse[stroke="white"]),
	:deep(circle[stroke="white"]),
	:deep(line[stroke="white"]),
	:deep(polygon[stroke="white"]),
	:deep(rect[stroke="white"]) {
		stroke: var(--color-dynamic-white);
	}
}
</style>