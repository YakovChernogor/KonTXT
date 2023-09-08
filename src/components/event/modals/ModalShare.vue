<script setup>
import { computed, ref } from "vue";

import Icon from "@/components/Icon.vue";
import IconTelegram from "@/components/icons/IconTelegram.vue";
import IconLinkedIn from "@/components/icons/IconLinkedIn.vue";
import IconFacebook from "@/components/icons/IconFacebook.vue";
import IconVK from "@/components/icons/IconVK.vue";
import IconTwitter from "@/components/icons/IconTwitter.vue";
import IconEnvelop from "@/components/icons/IconEnvelop.vue";

import Copy from "@/components/Copy.vue";
import Modal from "@/components/Modal.vue";

defineProps({
  modelValue: Boolean,
  eventId: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <Modal :open="modelValue" @close="emit('update:modelValue', false)" small>
    <div class="modal__content share">
      <div class="share__qr">
        <img
          class="share__qr--image"
          draggable="false"
          src="@/assets/images/qr-event.png"
          alt="qr-event"
        />
      </div>
      <div class="share__input">
        <p class="text-comment">kontxt.me/event/{{ eventId }}</p>
        <Copy />
      </div>
      <div class="share__links">
        <a
          :href="`https://t.me/share/url?url=${url}`"
          class="share__link"
          target="_blank"
        >
          <Icon :name="IconTelegram" :size="24" />
        </a>
        <a
          :href="`https://www.linkedin.com/sharing/share-offsite/?url=${url}`"
          class="share__link"
          target="_blank"
        >
          <Icon :name="IconLinkedIn" :size="24" />
        </a>
        <a
          :href="`https://www.facebook.com/sharer/sharer.php?u=${url}`"
          class="share__link"
          target="_blank"
        >
          <Icon :name="IconFacebook" :size="24" />
        </a>
        <a
          :href="`https://vk.com/share.php?url=${url}`"
          class="share__link"
          target="_blank"
        >
          <Icon :name="IconVK" :size="24" />
        </a>
        <a
          :href="`https://twitter.com/intent/tweet?text=${url}`"
          class="share__link"
          target="_blank"
        >
          <Icon :name="IconTwitter" :size="24" />
        </a>
        <a
          :href="`mailto:?subject=${url}&body=${url}`"
          class="share__link"
          target="_blank"
        >
          <Icon :name="IconEnvelop" :size="24" />
        </a>
      </div>
    </div>
  </Modal>
</template>

<style scoped lang="scss">
.modal {
  &__header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 32px;
    padding-bottom: 8px;
    position: sticky;
    top: -1px;
    z-index: 1;
    background: var(--color-dynamic-white);
  }
}
.share {
  display: flex;
  row-gap: 30px;
  align-items: center;
  flex-direction: column;
  &__qr {
    object-fit: contain;
    &--image {
      height: 242px;
      width: 242px;
    }
  }
  &__input {
    width: 282px;
    max-width: 282px;
    display: flex;
    border: 1px solid var(--color-dynamic-gray);
    border-radius: 1000px;
    align-items: center;
    padding: 10px 20px;
    width: 100%;
    justify-content: space-between;
    p {
      font-size: 16px;
    }
    :deep(path[fill]) {
      fill: var(--color-dynamic-gray);
    }
  }
  &__links {
    display: flex;
    align-items: center;
    column-gap: 26px;
    margin: 0 auto;
  }
}
</style>
