<template>
	<label class="note">
		<textarea class="note__input text-main" ref="textarea" :disabled="disabled" @input="$emit('update:value', $event.target.value)" placeholder="Создать заметку">{{ value }}</textarea>
		<Icon :name="IconEdit" @click="disabled = false; textarea.focus()" class="note__icon"/>
	</label>
</template>

<script setup>
import { ref } from 'vue';
import Icon from './Icon.vue';
import IconEdit from './icons/IconEdit.vue';

const disabled = ref(true);
const textarea = ref(null);
defineProps({
	value: {
		type: String,
	}
})

defineEmits(['update:value'])

</script>

<style scoped lang="scss">
.note {
	padding: 30px 100px 30px 30px;
	display: flex;
	gap: 48px;
	border-radius: 20px;
	align-items: center;
	border: 1px solid var(--color-dynamic-black);
	position: relative;
	height: auto;
	&__input {
		width: 100%;
		max-width: 100%;
		resize: none;
		min-width: 100%;
		max-height: 160px;
		&::-webkit-scrollbar {
			display: none;
		}
	}
	&__icon {
		position: absolute;
		right: 30px;
		top: 30px;
		cursor: pointer;
	}
}
</style>