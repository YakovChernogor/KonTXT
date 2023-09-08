<script setup>
import Icon from "@/components/Icon.vue";
import IconReputation from "@/components/icons/IconReputation.vue";

defineProps({
  reputation: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="user-content">
    <div class="user-content__title">
      <span class="text-h1">
        {{ $t("reputation") }}
      </span>
    </div>
    <div class="user-content__reputation">
      <span
        class="user-content__reputation--text"
        :class="reputation.status === 'blur' ? 'blur' : ''"
      >
        {{ reputation.value }}
      </span>
      <Icon
        :name="IconReputation"
        :size="36"
        :class="reputation.status === 'blur' ? 'blur' : ''"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-content {
  display: flex;
  flex-direction: column;
  row-gap: 6px;
  &__title {
    display: flex;
    align-items: end;
    row-gap: 10px;
    column-gap: 10px;
    white-space: nowrap;
    &--people {
      margin-bottom: 2px;
    }
  }
  &__reputation {
    display: flex;
    align-items: center;
    column-gap: 8px;
    &--text {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 500;
      font-size: 42px;
      line-height: 51px;
      color: var(--color-dynamic-black);
    }
  }
}
</style>
