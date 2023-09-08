<script setup>
import Users from "@/database/users.js";

import Modal from "@/components/Modal.vue";
import ActionModalBar from "@/components/ActionModalBar.vue";
import Review from "@/components/Review.vue";

const props = defineProps({
  modelValue: Boolean,
  reviews: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <Modal :open="modelValue" @close="emit('update:modelValue', false)">
    <div class="modal__header">
      <p class="user-content__title text-h1">
        {{ $t("titles.reviews") }}
      </p>
      <ActionModalBar search filter />
    </div>
    <div class="modal__content user-content__projects">
      <template v-for="{ text, id } in reviews" :key="id">
        <Review :review="Users[id]" :text="text" full />
      </template>
    </div>
  </Modal>
</template>

<style scoped lang="scss">
.user-content {
  &__title {
    display: flex;
    align-items: center;
    white-space: nowrap;
    gap: 20px;
  }
  &__projects {
    display: flex;
    flex-direction: column;
    gap: 35px;
  }
}
.modal {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    padding-bottom: 8px;
    position: relative;
    z-index: 1;
    background: var(--color-dynamic-white);
  }
  &__content {
    overflow: auto;
    height: calc(100% - 67px);
    &::-webkit-scrollbar {
      display: none;
      opacity: 0;
      width: 0;
      height: 0;
    }
    & > * {
      position: relative;
      padding-bottom: 40px;
      &::after {
        content: "";
        position: absolute;
        width: 82%;
        height: 1px;
        background-color: var(--color-dynamic-gray);
        bottom: 0;
        left: 50%;
        transform: translate(-50%);
      }
    }
  }
  @include screen(767.98px) {
    &__content {
      & > * {
        padding-bottom: 20px;
        &::after {
          display: none;
        }
      }
    }
  }
}
</style>
