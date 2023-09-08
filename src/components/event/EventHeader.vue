<script setup>
import { ref, computed, watch } from "vue";

import Icon from "@/components/Icon.vue";
import IconChevron from "@/components/icons/IconChevron.vue";
import IconShare from "@/components/icons/IconShare.vue";
import IconCalendar from "@/components/icons/IconCalendar.vue";
import IconBookmark from "@/components/icons/IconBookmark.vue";
import IconFilledBookmark from "@/components/icons/IconFilledBookmark.vue";

const props = defineProps({
  name: {
    type: Object,
    required: true,
  },
  image: {
    type: Object,
    required: true,
  },
  bookmarked: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["openShare", "bookmarkEvent"]);

const bookmarkTooltip = ref(false);

const getSrc = (src) =>
  new URL(`/src/assets/images/${src}`, import.meta.url).href;

const canShare = computed(() => {
  if (Navigator.share) return true;
  else return false;
});

watch(
  () => props.bookmarked,
  async (bookmarked) => {
    if (bookmarked) {
      bookmarkTooltip.value = true;
      await new Promise((resolve) => setTimeout(resolve, 1500));
      bookmarkTooltip.value = false;
    }
  }
);
</script>

<template>
  <div class="event-header">
    <div class="event-header__back">
      <button class="event-header__back--button">
        <Icon class="event-header__back--icon" :name="IconChevron" />
      </button>
    </div>
    <div class="event-header__title">
      <span class="text-comment-small">{{ $t("event.event") }}</span>
    </div>
    <div class="event-header__name">
      <h1
        class="event-header__name--font"
        :class="name.status === 'blur' ? 'blur' : ''"
      >
        {{ name.value }}
      </h1>
    </div>

    <div class="event-header__actions">
      <button
        class="event-header__actions--button"
        :class="name.status === 'blur' ? 'blur' : ''"
      >
        <Icon :name="IconCalendar" :size="24" />
      </button>
      <button
        class="event-header__actions--button"
        :class="name.status === 'blur' ? 'blur' : ''"
        @click="canShare ? Navigator.share({ url: url }) : emit('openShare')"
      >
        <Icon :name="IconShare" :size="24" />
      </button>

      <Transition
        name="mode-fade"
        mode="out-in"
        :class="name.status === 'blur' ? 'blur' : ''"
      >
        <button
          v-if="bookmarked"
          class="event-header__actions--button"
          @click="emit('bookmarkEvent')"
        >
          <Icon :name="IconFilledBookmark" :size="24" />
        </button>
        <button
          v-else
          class="event-header__actions--button"
          @click="emit('bookmarkEvent')"
        >
          <Icon :name="IconBookmark" :size="24" />
        </button>
      </Transition>
    </div>
  </div>
  <div class="event-info">
    <div class="event-info__image">
      <img
        class="event-info__image--img"
        :class="image.status === 'blur' ? 'blur' : ''"
        :src="getSrc(image.value)"
        draggable="false"
      />
    </div>
    <Transition name="fade-slide-up">
      <div class="tooltip" v-if="bookmarkTooltip">
        <span class="text-comment-small">
          {{ $t("event.bookmarked") }}
        </span>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.event-header {
  display: grid;
  grid-template-columns: 36px 1fr 120px;
  align-items: stretch;
  justify-items: stretch;
  justify-content: space-between;
  row-gap: 20px;
  position: relative;
  &__title {
    grid-column: span 2;
    display: flex;
    align-items: center;
    column-gap: 10px;
  }
  &__back {
    display: flex;
    position: absolute;
    top: 75%;
    left: -5%;
    transform: translate(-50%, -50%);
    :deep(rect[stroke]),
    :deep(path[stroke]) {
      stroke: var(--color-dynamic-gray);
    }
    &--button {
      cursor: pointer;
    }
    &--icon {
      width: 32px !important;
      height: 32px !important;
      min-width: 32px !important;
      min-height: 32px !important;
      max-width: 32px !important;
      max-height: 32px !important;
    }
  }
  &__name {
    grid-row: 2;
    grid-column: span 2 / 3;
    &--font {
      color: var(--color-dynamic-black);
      font-family: "Inter";
      font-style: normal;
      font-weight: 700;
      font-size: 30px;
      line-height: 36px;
      @include screen(767.98px) {
        font-weight: 600;
        font-size: 28px;
        line-height: 34px;
      }
    }
  }
  &__actions {
    grid-row: 2;
    grid-column: 3 / 3;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 20px;
    &--button {
      cursor: pointer;
    }
  }
  @include screen(767.98px) {
    &__title {
      position: relative;
      bottom: 2px;
      grid-row: 1;
      grid-column: 2 / 3;
      align-self: center;
    }
    &__back {
      position: static;
      transform: none;
      grid-row: 1;
      grid-column: 1 / 3;
      &--icon {
        width: 24px !important;
        height: 24px !important;
        min-width: 24px !important;
        min-height: 24px !important;
        max-width: 24px !important;
        max-height: 24px !important;
      }
    }
    &__name {
      grid-column: 3 span;
      justify-self: center;
      &--font {
        color: var(--color-dynamic-black);
        font-family: Inter;
        font-style: normal;
        font-weight: 600;
        font-size: 28px;
        line-height: 34px;
      }
    }
    &__actions {
      grid-row: 1;
      grid-column: 3 / 3;
    }
  }
}
.event-info {
  margin-top: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  &__image {
    width: 100%;
    &--img {
      border-radius: 30px;
      object-fit: cover;
      width: 100%;
      height: 186px;
    }
  }
  @include screen(767.98px) {
    margin-top: 20px;
    &__image {
      width: 225px !important;
      height: 225px !important;
      &--img {
        border-radius: 50%;
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
  }
}

.tooltip {
  display: inline-flex;
  padding: 10px 20px;
  align-items: flex-start;
  gap: 10px;
  background-color: var(--color-dynamic-white);
  // box-shadow: 0px 1px 1px 0px var(--color-gray-alpha);
  // box-shadow: 0px 12px 10px 0px #00000009;
  // border: 1px solid var(--color-gray-alpha);
  // border-radius: 20px 30px 30px 0px;
  position: absolute;
  z-index: 1;
  right: 10px;
  top: -65px;
  transform: translate(100%, -100%);
  @include screen(767.98px) {
    display: none;
  }
}
.mode-fade-enter-active,
.mode-fade-leave-active {
  transition: opacity 0.25s ease;
}
.mode-fade-enter-from,
.mode-fade-leave-to {
  opacity: 0.5;
}

.fade-slide-up-enter-active,
.fade-slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.fade-slide-up-enter-from {
  opacity: 0;
  transform: translate(50%, -100%);
}

.fade-slide-up-leave-to {
  opacity: 0;
  transform: translate(100%, -100%);
}
</style>
