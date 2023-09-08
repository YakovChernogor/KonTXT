<template>
	<div class="karma" :class="{'karma--small': small, 'karma--slider': slider}">
		<div class="karma__header">
			<p class="karma__title" :class="{ 'karma__title--blur': status === 'blur' }">
				{{ status === 'blur' ? new Array(`${value}`.length).fill('0', 0, `${value}`.length).join('') : value }}
			</p>
			<Icon :name="IconKarma" :size="small ? 16 : 26" class="karma__icon"/>
		</div>
		<p class="karma__subtitle" v-if="!slider && !small">{{ $t('karma') }}</p>
	</div>
</template>

<script setup>
import Icon from './Icon.vue';
import IconKarma from './icons/IconKarma.vue';

defineProps({
	value: {
		type: Number,
	},
	slider: {
		type: Boolean,
		default: false,
	},
	small: {
		type: Boolean,
		default: false,
	},
	status: {
		type: String,
	}
});

</script>

<style scoped lang="scss">
.karma {
	display: flex;
	flex-direction: column;
	gap: 5px;
	&__header {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	&__title {
		font-size: 26px;
		font-weight: 600;
		color: var(--color-dynamic-black);
		&--blur {
			filter: blur(7px);
			user-select: none;
			pointer-events: none;
		}
	}
	&__subtitle {
		font-size: 14px;
		font-family: "Inter";
		font-weight: 500;
		color: var(--color-dynamic-black);
	}
	&--small & {
		&__title {
			font-size: 20px;
			font-weight: 500;
		}
	}
	&--slider & {
		&__title {
			font-weight: 500;
		}
	}
	@include screen('767.98px') {
		align-items: center;
		&__title {
			font-size: 24px;
		}
		&__subtitle {
			font-size: 14px;
		}
		&__icon {
			width: 24px !important;
			height: 24px !important;
			min-width: 24px !important;
			min-height: 24px !important;
			max-width: 24px !important;
			max-height: 24px !important;
		}
		&--small &__icon {
			width: 16px !important;
			height: 16px !important;
			min-width: 16px !important;
			min-height: 16px !important;
			max-width: 16px !important;
			max-height: 16px !important;
		}
	}
}
</style>