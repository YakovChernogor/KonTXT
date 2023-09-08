<template>
  <Teleport to="body">
    <Transition :name="mobile ? 'mobile' : 'fade'">
      <div class="modal-wrapper" v-if="open" @click.self="$emit('close')">
        <div
          class="modal"
          :class="{
            'modal--small': small,
            'modal--mobile': mobile,
            'modal--login': login,
            'modal--share': share,
            'modal--review': review,
          }"
        >
          <Icon
            class="modal__close"
            :name="IconCross"
            @click="$emit('close')"
          />
          <div class="modal__container" v-bind="$attrs">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { watch } from "vue";
import Icon from "./Icon.vue";
import IconCross from "./icons/IconCross.vue";

const props = defineProps({
  open: {
    type: Boolean,
  },
  small: {
    type: Boolean,
    default: false,
  },
  mobile: {
    type: Boolean,
    default: false,
  },
  login: {
    type: Boolean,
    default: false,
  },
  share: {
    type: Boolean,
    default: false,
  },
  review: {
    type: Boolean,
    default: false,
  },
});

watch(props, () => {
  if (props.open) {
    document.body.classList.add("scroll-lock");
  } else {
    document.body.classList.remove("scroll-lock");
  }
});

defineEmits(["close"]);
</script>

<style scoped lang="scss">
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 3;
  backdrop-filter: blur(10px);
  background-color: var(--color-dynamic-black-alpha);
}

.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 80vh;
  transform: translate(-50%, -50%);
  max-width: calc(663px + 134px);
  width: 100vw;
  padding: 50px 67px;
  background-color: var(--color-dynamic-white);
  border-radius: 30px;
  &__container {
    overflow-x: hidden;
    overflow-y: auto;
    height: 100%;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  &__close {
    position: absolute;
    right: -32px;
    top: -32px;
    cursor: pointer;
  }
  &--small {
    box-sizing: border-box;
    padding: 50px 24px;
    align-items: center;
    max-width: calc(457px + 48px);
    max-height: 515px;
    height: auto;
    // overflow: auto;
    .modal__header {
      top: -3px;
    }
  }
  &--review {
    box-sizing: border-box;
    padding: 50px 55px;
    align-items: center;
    max-height: 415px;
    height: auto;
  }
  &--login {
    height: auto;
  }
  &--mobile {
    max-width: 100vw;
    height: auto;
    box-sizing: border-box;
    width: 100%;
    transform: translate(0);
    left: 0;
    top: 0;
    padding: 16px 0 36px;
    border-radius: 0 0 30px 30px;
    .modal {
      &__close {
        display: none;
      }
      &__container {
        max-width: 673px;
        width: 100%;
        padding: 0px 20px;
        margin: 0 auto;
      }
    }
    @include screen(767.98px, min-width) {
      max-width: 350px;
      padding: 20px 20px 30px 30px;
      top: 14px;
      right: 20px;
      left: auto;
      border-radius: 30px;
      .modal {
        &__container {
          padding: 0;
        }
      }
    }
  }
  &--share {
    max-width: 362px;
    height: auto;
    max-height: 241px;
    padding: 0;
  }
  @include screen(767.98px) {
    padding: 20px 30px;
    border-radius: 15px;
    &:not(:is(&--login, &--mobile, &--share, &--small, &--review)) {
      height: 100%;
      max-height: 80vh;
    }
    &:not(
        :is(&--share, &--login, &--mobile, &--small, &--review)
      ).modal__container {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    &__close {
      right: 20px;
      top: unset;
      bottom: calc(100% + 20px);
      width: 24px !important;
      height: 24px !important;
      min-width: 24px !important;
      min-height: 24px !important;
      max-width: 24px !important;
      max-height: 24px !important;
    }
    &--mobile {
      border-radius: 0 0 30px 30px;
      padding: 16px 0 36px;
    }
    &--share {
      max-width: 362px;
      height: auto;
      max-height: 241px;
      padding: 0;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
  .modal {
    transition: all 0.3s ease;
  }
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  .modal {
    transform: translate(-50%, -50%) scale(0.8);
  }
}

.mobile-enter-active,
.mobile-leave-active {
  transition: all 0.3s ease;
  .modal {
    transition: all 0.3s ease;
  }
}
.mobile-enter-from,
.mobile-leave-to {
  opacity: 0;
  .modal {
    transform: translateY(-100%);
  }
  @include screen(767.98px, min-width) {
    .modal {
      transform: translateX(100%);
    }
  }
}
</style>
