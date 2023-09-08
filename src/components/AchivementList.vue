<template>
	<div class="achivement-list">
		<Popper 
			v-for="achivement in achivements" 
			class="achivement"
			:class="status === 'blur' ? 'achivement--blur' : ''" 
			:content="$t(`achivements.${achivementList[achivement].text}`)" 
			placement="top-start" 
			hover 
			offsetSkid="24"
			offsetDistance="-10"
		>
			<Icon :name="achivementList[achivement].icon" :size="24"/>
		</Popper>
	</div>
</template>

<script setup>
import Icon from './Icon.vue'
import IconAchivementMagnet from './icons/IconAchivementMagnet.vue'
import IconAchivementTarget from './icons/IconAchivementTarget.vue'
import IconAchivementCrown from './icons/IconAchivementCrown.vue'

defineProps({
	achivements: {
		type: Array,
	},
	status: {
		type: String,
	}
})

const achivementList = {
	"magnet": {
		icon: IconAchivementMagnet,
		text: 'magnet'
	},
	"target": {
		icon: IconAchivementTarget,
		text: 'target',
	},
	"crown": {
		icon: IconAchivementCrown,
		text: 'crown'
	}

}
</script>

<style scoped lang="scss">
.achivement-list {
	display: flex;
	gap: 14px;
}
.achivement {
	width: 24px;
	height: 24px;
	&--blur {
		filter: blur(7px);
		user-select: none;
		pointer-events: none;
	}
}
</style>