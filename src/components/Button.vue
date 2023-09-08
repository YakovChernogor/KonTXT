<template>
	<button :class="`button button--${type} text-button`">
		{{ text }}
	</button>
</template>

<script setup>
defineProps({
	type: {
		type: String,
		default: 'primary',
	},
	text: {
		type: String,
		required: true
	}
})
</script>

<style scoped lang="scss">
.button {
	padding: 0 20px;
	width: 100%;
	border: 1px;
	height: 30px;
	border-radius: 100px;
	border: 1px solid var(--color-dynamic-black);
	text-align: center;
	transition: .3s ease;
	cursor: pointer;
	&--secondary {
		background-color: var(--color-dynamic-black);
		color: var(--color-dynamic-white);
	}
	
	@include ui-mouse {
		&:hover {
			background: var(--color-dynamic-black);
			color: var(--color-dynamic-white);
		}
		&--secondary:hover {
			background-color: var(--color-dynamic-white);
			color: var(--color-dynamic-black);
		}
	}

	@include screen(1199.98px, max-width) {
		height: auto;
		padding-top: 10px;
		padding-bottom: 10px;
	}
	@include screen(767.98px, max-width) {
		height: 37px;
		padding: 0;
	}
}
</style>