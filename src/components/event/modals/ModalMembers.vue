<script setup>
import Users from "@/database/users.js";
import Donar from "@/components/Donar.vue";

import Modal from "@/components/Modal.vue";
import ActionModalBar from "@/components/ActionModalBar.vue";

const props = defineProps({
  modelValue: Boolean,
  members: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <Modal :open="modelValue" @close="emit('update:modelValue', false)">
    <div class="modal__header">
      <p class="user-content__title text-h1">{{ $t("members") }}</p>
      <ActionModalBar search filter />
    </div>
    <div class="modal__content user-content__projects">
      <template v-for="id in members" :key="id">
        <Donar :value="Users[id]" :id="id" />
      </template>
    </div>
  </Modal>
</template>

<style scoped lang="scss">
.donars {
  display: flex;
  gap: 10px;
  &--blur {
    filter: blur(7px);
    user-select: none;
    pointer-events: none;
  }
  &__more {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 50%;
    width: 58px;
    height: 58px;
    min-width: 58px;
    min-height: 58px;
    border: 1px solid var(--color-dynamic-black);
    position: relative;
    box-sizing: border-box;
    background-color: var(--color-dynamic-white);
    &::after,
    &::before {
      content: "";
      position: absolute;
      display: block;
      width: calc(100% + 2px);
      height: calc(100% + 2px);
      min-width: calc(100% + 2px);
      min-height: calc(100% + 2px);
      border-radius: 50%;
      background-color: var(--color-dynamic-white);
      border: 1px solid var(--color-dynamic-gray);
      right: -8px;
      z-index: -1;
      top: -1px;
      box-sizing: border-box;
    }
    &::after {
      right: -16px;
      z-index: -2;
      border-color: #c8c8c8;
    }
  }
  &--projects {
    gap: 4px;
  }
  .dark & {
    .donars__more {
      &::after {
        border-color: #565656;
      }
    }
  }

  @include screen(1199.98px) {
    &:not(.donars--projects) {
      gap: 10px;
      .donars__more {
        margin-left: 2px;
        width: 58px;
        height: 58px;
        min-width: 58px !important;
        min-height: 58px !important;
        &::before {
          right: -19px;
        }
        &::after {
          right: -35px;
        }
      }
      .donar {
        :deep(.avatar) {
          max-width: 58px !important;
          max-height: 58px !important;
          min-width: 58px !important;
          min-height: 58px !important;
          width: 58px;
          height: 58px;
        }
      }
    }
  }
  @include screen(767.98px) {
    &:not(.donars--projects) {
      .donars__more {
        margin-left: 10px;
      }
    }
  }

  &__text {
    margin-top: 15px;
    font-family: Montserrat;
    font-size: 10px;
    font-weight: 500;
    line-height: 14px;
    letter-spacing: 0em;
    color: var(--color-dynamic-gray);
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

.user-content {
  &__title {
    display: flex;
    align-items: center;
    white-space: nowrap;
    gap: 20px;
  }
}
</style>
