<script setup>
import Icon from "@/components/Icon.vue";
import IconVerify from "@/components/icons/IconVerify.vue";
import IconK from "@/components/icons/IconK.vue";

import Avatar from "@/components/Avatar.vue";
import Modal from "@/components/Modal.vue";
import ActionModalBar from "@/components/ActionModalBar.vue";

defineProps({
  modelValue: Boolean,
  partners: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <Modal :open="modelValue" @close="emit('update:modelValue', false)">
    <div class="modal__header">
      <p class="modal__header--font">
        {{ title }}
      </p>
      <ActionModalBar search filter />
    </div>
    <div class="modal__content">
      <div class="partners" v-for="item in partners" :key="item.id">
        <div class="partners__avatar">
          <Avatar
            :src="item.src"
            :alt="item.name"
            :rect="item.isImgRect"
            class="partners__avatar__img"
            :class="{ 'partners__avatar__img--rect': item.isImgRect }"
          />
        </div>
        <div class="partners__info">
          <div class="partners__name">
            <span class="partners__name--font">
              {{ item.name }}
            </span>
            <Icon
              class="partners__name--verify-icon"
              :name="IconVerify"
              v-if="item.isVerified"
            />
            <Icon
              class="partners__name--k-icon"
              :name="IconK"
              v-if="item.isKonTXT"
            />
          </div>
          <p class="partners__description partners__description--font">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </Modal>
</template>

<style scoped lang="scss">
.partners {
  flex-basis: calc(100% / 2 - 30px);
  display: flex;
  flex-direction: column;
  align-items: center;
  @include screen(767.98px) {
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    column-gap: 30px;
  }
  &__info {
    flex-grow: 1;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    text-align: center;
    @include screen(767.98px) {
      margin-top: 0;
      text-align: left;
      justify-self: start;
      flex-basis: 180px;
    }
  }
  &__avatar {
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    &__img {
      width: 180px !important;
      height: 180px !important;
      min-width: 180px !important;
      min-height: 180px !important;
      max-height: 180px !important;
      max-width: 180px !important;
      &--rect {
        width: 250px !important;
        height: 100px !important;
        min-width: 250px !important;
        min-height: 100px !important;
      }
      @include screen(767.98px) {
        width: 94px !important;
        height: 94px !important;
        min-width: 94px !important;
        min-height: 94px !important;
        max-height: 94px !important;
        max-width: 94px !important;
        &--rect {
          width: 114px !important;
          height: 54px !important;
          min-width: 114px !important;
          min-height: 54px !important;
        }
      }
    }
    @include screen(767.98px) {
      width: 114px;
      height: 94px;
    }
  }
  &__name {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    column-gap: 10px;
    @include screen(767.98px) {
      margin-top: 0px;
      justify-content: start;
    }
    &--verify-icon {
      width: 16px !important;
      height: 16px !important;
      width: 16px !important;
      height: 16px !important;
      min-width: 16px !important;
      min-height: 16px !important;
      max-width: 16px !important;

      @include screen(767.98px) {
        width: 24px !important;
        height: 24px !important;
        width: 24px !important;
        height: 24px !important;
        min-width: 24px !important;
        min-height: 24px !important;
        max-width: 24px !important;
      }
    }
    &--k-icon {
      width: 14px !important;
      height: 14px !important;
      width: 14px !important;
      height: 14px !important;
      min-width: 14px !important;
      min-height: 14px !important;
      max-width: 14px !important;

      @include screen(767.98px) {
        width: 20px !important;
        height: 20px !important;
        width: 20px !important;
        height: 20px !important;
        min-width: 20px !important;
        min-height: 20px !important;
        max-width: 20px !important;
      }
    }
    &--font {
      color: var(--color-dynamic-black);
      font-family: Montserrat;
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      @include screen(767.98px) {
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
      }
    }
  }
  &__description {
    margin-top: 10px;
    &--font {
      color: var(--color-dynamic-gray);
      font-family: Montserrat;
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      @include screen(767.98px) {
        font-size: 10px;
        line-height: 12px;
      }
    }
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
    &--font {
      color: var(--color-dynamic-black);
      font-family: Inter;
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      letter-spacing: 0.2px;
      @include screen(767.98px) {
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;
      }
    }
  }
  &__content {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: start;
    column-gap: 30px;
    row-gap: 40px;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
      opacity: 0;
      width: 0;
      height: 0;
    }
  }
  @include screen(767.98px) {
    &__content {
      display: flex;
      flex-direction: column;
      row-gap: 30px;
    }
  }
}
</style>
