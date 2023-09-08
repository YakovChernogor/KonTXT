<template>
<Modal :open="open" @close="$emit('close')" login>
	<div class="login-modal__content">
		<p class="login-modal__title text-h1">{{ $t('titles.logIn') }}</p>
		<div class="login-modal__row">
			<div class="login-modal__col">
				<p class="login-modal__col-title text-uppart">{{ $t('titles.download') }}</p>
				<Icon :name="IconMobile" :size="182" />
				<Button class="login-modal__button" type="secondary" @click="login = false" :text="$t('button.download')"/>
			</div>
			<div class="login-modal__col">
				<p class="login-modal__col-title text-uppart">{{ $t('titles.browser') }}</p>
				<Icon :name="IconWeb" :size="182" />
				<Button class="login-modal__button" type="secondary" @click="login = false" :text="$t('button.logIn')"/>
			</div>
		</div>
	</div>
</Modal>
</template>

<script setup>

import Modal from './Modal.vue';
import Icon from './Icon.vue';
import IconWeb from './icons/IconWeb.vue';
import IconMobile from './icons/IconMobile.vue';
import Button from './Button.vue';

defineProps({
	open: {
		type: Boolean,
		default: false
	}
})

defineEmits(['close'])

</script>

<style scoped lang="scss">
.login-modal {
	&__col-title {
		max-width: 240px;
	}
	&__row {
		display: flex;
		gap: 54px;
		margin-top: 62px;
		flex-wrap: wrap;
	}
	&__col {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 15px;
		flex-grow: 1;
		min-width: 182px;
	}
}
</style>