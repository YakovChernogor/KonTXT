<script setup>
import Icon from "@/components/Icon.vue";
import IconRoundKonTXT from "@/components/icons/IconRoundKonTXT.vue";

import Avatar from "@/components/Avatar.vue";

import Modal from "@/components/Modal.vue";
import ActionModalBar from "@/components/ActionModalBar.vue";

defineProps({
  modelValue: Boolean,
  speakers: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <Modal :open="modelValue" @close="emit('update:modelValue', false)">
    <div class="modal__header">
      <p class="modal__header--font">
        {{ $t("titles.speakers") }}
      </p>
      <ActionModalBar search filter />
    </div>
    <div class="modal__content">
      <div class="speaker" v-for="item in speakers" :key="item.id">
        <Avatar
          :src="item.src"
          :alt="item.name"
          :size="180"
          class="speaker__avatar"
        />
        <div class="speaker__info">
          <div class="speaker__name">
            <span class="speaker__name--font">
              {{ item.name }}
            </span>
            <Icon
              class="speaker__name--icon"
              :name="IconRoundKonTXT"
              v-if="item.isKonTXT"
            />
          </div>
          <p class="speaker__profession speaker__profession--font">
            {{ item.profession }}
          </p>
        </div>
      </div>
    </div>
  </Modal>
</template>

<style scoped lang="scss">
.speaker {
  flex-grow: 0;
  flex-basis: calc(100% / 2 - 30px);
  display: flex;
  flex-direction: column;
  align-items: center;
  &__info {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  &__avatar {
    width: 180px;
    height: 180px;
    min-width: 180px;
    min-height: 180px;
    max-height: 180px;
    max-width: 180px;
  }
  &__name {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    column-gap: 10px;
    &--icon {
      width: 20px;
      height: 20px;
      width: 20px !important;
      height: 20px !important;
      min-width: 20px !important;
      min-height: 20px !important;
      max-width: 20px !important;

      @include screen(767.98px) {
        width: 24px;
        height: 24px;
        width: 24px !important;
        height: 24px !important;
        min-width: 24px !important;
        min-height: 24px !important;
        max-width: 24px !important;
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
  &__profession {
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
  @include screen(767.98px) {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: start;
    column-gap: 20px;
    &__info {
      text-align: left;
      justify-self: start;
    }
    &__avatar {
      width: 94px !important;
      height: 94px !important;
      min-width: 94px !important;
      min-height: 94px !important;
      max-height: 94px !important;
      max-width: 94px !important;
    }
    &__name {
      margin-top: 0px;
      justify-content: start;
    }
    &__job {
      margin-top: 10px;
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
    // height: calc(100% - 67px);
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
