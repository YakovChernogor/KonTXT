<template>
  <div class="donar">
    <Avatar
      :size="150"
      :alt="value.name"
      :src="value.src"
      class="donar__avatar"
    />
    <div class="donar__info">
      <p class="text-h1 donar__title">
        {{ value.name }}
        <Icon :name="IconVerify" :size="24" v-if="value.isVerified" />
      </p>
      <p class="text-comment-small">
        {{ value.profession }}, {{ value.address.value }}
      </p>
      <p class="text-comment-small">{{ value.job }}, {{ value.company }}</p>
      <div v-if="id" class="donar__karma">
        <Karma :value="value.karma" small />
        <Reputation :value="value.karma" small />
        <ReputationGiving
          v-if="giving && value?.givingReputation?.[id]"
          class="donar__giving"
          :value="value.givingReputation[id]"
          small
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import Avatar from "./Avatar.vue";
import Icon from "./Icon.vue";
import IconVerify from "./icons/IconVerify.vue";
import Karma from "./Karma.vue";
import Reputation from "./Reputation.vue";
import ReputationGiving from "./ReputationGiving.vue";

defineProps({
  value: {
    type: Object,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  giving: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
.donar {
  display: flex;
  gap: 48px;
  &:not(:first-child) {
    padding-top: 40px;
  }
  &__info {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 327px;
  }
  &__title {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }
  &__karma {
    display: flex;
    gap: 42px;
    margin-top: 30px;
  }
  &__giving {
    margin-left: auto;
  }
  @include screen(767.98px) {
    gap: 20px;
    padding: 0;
    &__avatar {
      width: 90px !important;
      height: 90px !important;
      min-width: 90px !important;
      min-height: 90px !important;
      max-width: 90px !important;
      max-height: 90px !important;
    }
    &__title {
      font-size: 14px;
    }
    &__karma {
      gap: 14px;
      margin-top: 20px;
    }
    &:not(:first-child) {
      padding-top: 20px;
    }
  }
}
</style>
