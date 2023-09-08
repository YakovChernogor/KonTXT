<template>
	<div class="karma-container">
		<div class="karma-slider__value-container">
			<Karma 
				:value="Number(x)" 
				slider 
				class="karma-slider__value"
				:style="`transform: translateX(-50%); left: calc(${(Number(x) / 10 + 5) * stopsGap}px + 9px + ${(Number(x) / 10 + 5) * 2}px);`"
			/>
		</div>
		<div class="karma-slider" ref="slider">
			<input type="range" min="-50" max="50" step="10" class="karma-slider__range" v-model="x" @touchend="x = valueBuffer" @mousemove="x = valueBuffer" @mouseup="x = valueBuffer">
			<div 
				class="karma-slider__thumb" 
				:style="`transform: translateY(-50%); left: calc(${(Number(x) / 10 + 5) * stopsGap}px + 9px + ${(Number(x) / 10 + 5) * 2}px);`" 
			></div>
			<div class="karma-slider__stops" ref="stops" :style="`width: ${stopsWidth}; gap: ${stopsGap}px`">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>
		<div class="karma-slider__values" :style="`width: calc(${stopsWidth} + 18px);`">
			<!-- <p class="text-comment-small">-50</p>
			<p class="text-comment-small">0</p>
			<p class="text-comment-small">50</p> -->
		</div>
	</div>

</template>

<script setup>
import { computed, ref, watch } from 'vue';
import Karma from './Karma.vue';

const props = defineProps({
	value: {
		type: Number,
		default: 0
	}
})

const stops = ref(null)
const stopsGap = ref(null)
const stopsWidth = ref(null)

watch(stops, () => {
	let width = stops.value.clientWidth
	stopsGap.value = Math.floor((width - 22) / 10)
	stopsWidth.value = Math.floor(10 * stopsGap.value + 22) + 'px'
})

// watch(stopsWidth.value, () => {
// 	console.log(stopsWidth.value, stopsGap.value)
// 	stopsGap = computed(() => {
// 		let width = stops.value !== null ? stops.value.clientWidth : 0
// 		return Math.floor(width / 10)
// 	})
// })

const emits = defineEmits(['tested'])

const slider = ref(null);
const valueBuffer = ref(props.value);
const x = ref(Number(props.value))

watch(x, () => {
	emits('tested', Number(x.value))
})
</script>

<style scoped lang="scss">
.karma-container {
	display: flex;
	width: 100%;
	flex-direction: column;
	justify-content: center;
	gap: 5px;
}
.karma-slider {
	position: relative;
	width: 100%;
	margin: -30px 0;
	height: calc(21px + 60px);
	user-select: none;
	&__value-container {
		position: relative;
		height: 34px;
	}
	&__range {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0px;
		opacity: 0;
		cursor: pointer;
	}
	&__value {
		position: absolute;
		transform: translateX(-50%);
		transition: .3s ease;
	}
	&__values {
		width: 100%;
		display: flex;
		justify-content: space-between;
		user-select: none;
	}
	&__stops {
		display: flex;
		// justify-content: space-between;
		align-items: center;
		width: calc(100% - 18px);
		// width: 100%;
		height: 100%;
		margin: 0px 9px;
		// gap: 32px;
		cursor: pointer;
		span {
			min-width: 2px;
			max-width: 2px;
			width: 2px;
			height: 14px;
			background: linear-gradient(180deg, var(--color-dynamic-black) 0%, rgba(20, 24, 31, 0.00) 100%);
			display: flex;
			border-radius: 2px;
			position: relative;
			&:first-child, &:nth-child(6), &:last-child {
				&::after {
					content: '-50';
					position: absolute;
					font-family: 'Inter';
					font-size: 10px;
					font-weight: 500;
					color: var(--color-dynamic-gray);
					top: 100%;
					left: 50%;
					transform: translate(-50%, 100%);
				}
			}
			&:nth-child(6)::after {
				content: '0';
			}
			&:last-child::after {
				content: '50';
			}
		}
	}
	&__thumb {
		position: absolute;
		transform: translate(0, 0);
		width: 2px;
		border-radius: 2px;
		top: 50%;
		height: 21px;
		background-color: var(--color-dynamic-black);
		cursor: pointer;
		transition: .3s ease;
		&::before {
			content: '';
			position: absolute;
			display: block;
			width: 22px;
			height: 2px;
			border-radius: 2px;
			transform: translate(-50%, -50%);
			top: 0;
			left: 50%;
			background-color: var(--color-dynamic-black);
		}
	}
}
</style>