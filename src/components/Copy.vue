<template>
<button class="button">
	<Transition name="fade-slide-up">
		<div class="tooltip" v-if="copied">{{ $t('copy') }}</div>
	</Transition>
	<Icon :name="IconCopy" :size="24" @click="copy()"/>
</button>
</template>

<script setup>
import { ref, computed } from 'vue';
import Icon from './Icon.vue';
import IconCopy from './icons/IconCopy.vue';

const url = computed(() => {return window.location.href})

const copied = ref(false)

const copy = () => {
	navigator.clipboard.writeText(url.value)
	copied.value = true
	setTimeout(() => {
		copied.value = false
	}, 1000)
}

</script>

<style scoped lang="scss">
.button {
	cursor: pointer;
	position: relative;
	display: block;
	width: 24px;
	height: 24px;
}

.tooltip {
	padding: 10px 20px;
	background-color: var(--color-dynamic-white);
	border-radius: 20px 20px 30px 0px;
	border: 1px solid rgba(var(--color-dynamic-gray), 0.1);
	box-shadow: 0px 12px 10px 0px rgba(0, 0, 0, 0.04);
	font-size: 12px;
	font-family: "Inter";
	font-weight: 500;
	letter-spacing: 0.12px;
	color: var(--color-dynamic-gray);
	position: absolute;
	padding: 4px 8px;
	z-index: 1;
	left: 50%;
	transform: translate(-50%, -120%);
}

.fade-slide-up-enter-active,
.fade-slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.fade-slide-up-enter-from {
  opacity: 0;
  transform: translate(-50%, 0%);
}

.fade-slide-up-leave-to {
  opacity: 0;
  transform: translate(-50%, 0%);
}
</style>