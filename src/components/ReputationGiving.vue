<template>
	<div class="reputation" :class="{'reputation--small': small}">
		<div class="reputation__header">
			<Icon :name="IconArrow" :size="12"/>
			<p class="reputation__title">
				{{ value }}
			</p>
			<Icon :name="IconGivingReputation" :size="small ? 16 : 25"/>
		</div>
		<p class="reputation__subtitle" v-if="!subtitleHide && !small">{{ $t('reputation') }}</p>
	</div>
</template>

<script setup>
import Icon from './Icon.vue';
import IconArrow from './icons/IconArrow.vue';
import IconGivingReputation from './icons/IconGivingReputation.vue';

defineProps({
	value: {
		type: Number,
	},
	subtitleHide: {
		type: Boolean,
		default: false,
	},
	small: {
		type: Boolean,
		default: false,
	}
});

</script>

<style scoped lang="scss">
.reputation {
	display: flex;
	flex-direction: column;
	gap: 5px;
	&__header {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	&__title {
		font-size: 32px;
		font-weight: 600;
		color: var(--color-dynamic-black);
	}
	&__subtitle {
		font-size: 16px;
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
}
</style>