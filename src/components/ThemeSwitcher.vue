<template>
	<Transition name="fade-slide-up" mode="out-in">
		<button class="theme" v-if="isDark" @click="switchTheme()">
			<Icon :name="IconLightTheme" :size="24"/>
		</button>
		<button class="theme" v-else @click="switchTheme()">
			<Icon :name="IconDarkTheme" :size="24"/>
		</button>
	</Transition>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Icon from '@/components/Icon.vue';
import IconLightTheme from './icons/IconLightTheme.vue';
import IconDarkTheme from './icons/IconDarkTheme.vue';

const isDark = ref(false)

onMounted(() => {
	isDark.value = localStorage.getItem('theme') === 'dark'
	if(isDark.value) {
		document.body.classList.add('dark')
	} else {
		document.body.classList.remove('dark')
	}
})

const switchTheme = () => {
	isDark.value = !isDark.value;
	localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
	if(isDark.value) {
		document.body.classList.add('dark')
	} else {
		document.body.classList.remove('dark')
	}
}

</script>

<style scoped lang="scss">
.theme {
	cursor: pointer;
	height: 24px;
}

.fade-slide-up-enter-active,
.fade-slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.fade-slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.fade-slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

</style>

