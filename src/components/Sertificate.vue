<template>
	<div class="sertificate">
		<img class="sertificate__img" :src="getSrc(sertificate.src)" :alt="sertificate.title"/>
		<div class="sertificate__info" v-if="!grid">
			<p class="sertificate__title text-main">{{ sertificate.title }}</p>
			<p class="sertificate__organisation text-main-small">{{ $t('sertificates.company') }}: {{ sertificate.company }}</p>
			<p class="sertificate__date text-comment-small">{{ sertificate.date }}</p>
		</div>
		<div class="sertificate__info sertificate__info--hover" v-if="grid">
			<p class="sertificate__title text-main">{{ sertificate.title }}</p>
			<div class="sertificate__row">
				<p class="sertificate__organisation text-main-small">{{ $t('sertificates.company') }}: {{ sertificate.company }}</p>
				<p class="sertificate__date text-comment-small">{{ sertificate.date }}</p>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	sertificate: {
		type: Object,
		required: true
	},
	grid: Boolean
})

// const getSrc = (src) => {
// 	let formattedSrc =`./../assets/images/${src}`
// 	return new URL(formattedSrc, import.meta.url).href
// }
const getSrc = (src) => new URL(`/src/assets/images/${src}`, import.meta.url).href
</script>

<style scoped lang="scss">
.sertificate {
	display: flex;
	flex-direction: column;
	gap: 10px;
	position: relative;
	&__img {
		border-radius: 10px;
		border: 1px solid #e7e7e7;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top;
		.dark & {
			border-color: #333333;
		}
	}
	&__info {
		display: flex;
		flex-direction: column;
		gap: 5px;
		&--hover {
			position: absolute;
			padding: 10px;
			width: 100%;
			height: 100%;
			border-radius: 10px;
			justify-content: flex-end;
			background-color: rgba(#161718, 0.4);
			gap: 10px;
			opacity: 0;
			transition: 0.3s;
			.dark & {
				background-color: rgba(#161718, 0.6);
			}
			.sertificate {
				&__row {
					display: flex;
					justify-content: space-between;
				}
				&__title {
					color: var(--color-white);
					font-size: 10px;
					font-weight: 500;
					line-height: 12px;
				}
				&__organisation {
					color: var(--color-white);
					font-family: 'Inter';
					font-size: 8px;
					font-weight: 500;
					line-height: 10px;
					letter-spacing: 0.01em;
					display: inline-block;
					width: calc(100% - 20px);
				}
				&__date {
					color: var(--color-white);
					font-family: Montserrat;
					font-size: 8px;
					font-weight: 500;
					line-height: 10px;
					letter-spacing: 0em;
					text-align: right;
					display: inline-block;
					width: 20px;
				}
			}
		}
	}
	
	@include ui-mouse {
		&:hover &__info--hover {
			opacity: 1;
		}
	}
	@include screen(767.98px) {
		&__organisation {
			font-size: 12px;
		}
	}
}
</style>