<template>
	<div class="interests-list">
		<Interes v-for="interest in interests" :text="interest" :status="status"/>
	</div>
</template>

<script setup>
import Interes from './Interes.vue';

defineProps({
	interests: {
		type: Array,
		required: true
	},
	status: {
		type: String,
	}
});

</script>

<style scoped lang="scss">
.interests-list {
	display: flex;
	flex-wrap: wrap;
	gap: 7px 10px;
}
</style>