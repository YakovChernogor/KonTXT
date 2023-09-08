<template>
	<p class="interes text-main" :class="{'interes--blur': status === 'blur'}">
		{{ status === 'blur' ? new Array(text.length).fill('A', 0, text.length).join('') : text }}
	</p>
</template>

<script setup>
defineProps({
	text: {
		type: String,
		required: true
	},
	status: {
		type: String,
	}
})
</script>

<style scoped lang="scss">
.interes {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 0 10px;
	border-radius: 100px;
	border: 1px solid var(--color-dynamic-gray);
	box-sizing: content-box;
	height: 28px;
	&--blur {
		cursor: default;
		user-select: none;
		filter: blur(7px);
	}
}
</style>