<template>
	<div class="locale">
		<button class="locale__button" :class="{'locale__button--active': currentLocale === 'ru'}" @click="switchLocale('ru')">RU</button>
		<hr class="locale__line">
		<button class="locale__button" :class="{'locale__button--active': currentLocale === 'en'}" @click="switchLocale('en')">EN</button>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'

const currentLocale = ref('ru')
const { locale } = useI18n()

if(localStorage.getItem('locale')) {
	currentLocale.value = localStorage.getItem('locale')
	locale.value = localStorage.getItem('locale')
	document.documentElement.setAttribute('lang', localStorage.getItem('locale'));
} 

const switchLocale = (lang) => {
	document.documentElement.setAttribute('lang', lang);
	localStorage.setItem('locale', lang);
	// $i18n.locale = locale;
	currentLocale.value = lang;
	locale.value = lang
}
</script>

<style scoped lang="scss">
.locale {
	display: flex;
	gap: 15px;
	&__line {
		height: 25px;
		width: 0;
		border-right: 1px solid var(--color-dynamic-gray);
	}
	&__button {
		transition: .3s ease;
		font-family: 'Montserrat';
		font-size: 14px;
		font-weight: 500;
		line-height: 17px;
		letter-spacing: 0.01em;
		cursor: pointer;
		color: var(--color-dynamic-gray);
		&--active {
			color: var(--color-dynamic-black);
		}
	}
	@include screen(1199.98px, max-width) {
		&__button {
			font-family: 'Inter';
			font-size: 16px;
			font-weight: 500;
			line-height: 19px;
			letter-spacing: 0.01em;
		}
	}
}
</style>