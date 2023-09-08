<template>
	<Popper 
		class="info" 
		:content="text" 
		placement="top-start" 
		hover 
		offsetSkid="24"
		offsetDistance="-3"
	>
		<Icon :name="IconInfo" :size="24" class="info__icon"/> 
	</Popper>
</template>

<script setup>
import Icon from './Icon.vue';
import IconInfo from './icons/IconInfo.vue';

defineProps({
	text: {
		type: String,
	}
})
</script>

<style lang="scss">
.popper {
	max-width: 244px;
	width: 100%;
	padding: 10px 20px !important;
	background-color: var(--color-dynamic-white) !important;
	border-radius: 20px 20px 30px 0px !important;
	border: 1px solid rgba(var(--color-dynamic-gray), 0.1) !important;
	box-shadow: 0px 12px 10px 0px rgba(0, 0, 0, 0.04) !important;
	font-size: 12px;
	font-family: "Inter";
	font-weight: 500;
	letter-spacing: 0.12px;
	color: var(--color-dynamic-gray) !important;
}
</style>

<style scoped lang="scss">
.info {
	width: 24px;
	height: 24px;
	box-sizing: content-box;
	&__icon {
		:deep(
			path[stroke]
		) {
			stroke: var(--color-dynamic-gray);
		}
		:deep(
			path[fill]
		) {
			fill: var(--color-dynamic-gray);
		}
	}
	// &__popup {
	// 	position: absolute;
	// 	max-width: 244px;
	// 	width: 100%;
	// 	min-width: 244px;
	// 	padding: 10px 20px;
	// 	z-index: 2;
	// 	background-color: color(--color-dynamic-white);
	// 	border-radius: 20px 20px 30px 0px;
	// 	border: 1px solid rgba(var(--color-dynamic-gray), 0.1);
	// 	box-shadow: 0px 12px 10px 0px rgba(0, 0, 0, 0.04);
	// 	bottom: 100%;
	// }
}
</style>