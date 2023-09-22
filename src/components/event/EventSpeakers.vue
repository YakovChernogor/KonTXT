<script setup>
import { ref } from "vue";

import "swiper/css";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper";

import Icon from "@/components/Icon.vue";
import IconChevron from "@/components/icons/IconChevron.vue";

import Avatar from "@/components/Avatar.vue";
import Button from "@/components/Button.vue";

defineProps({
  speakers: {
    type: Array,
    required: true,
  },
  status: {
    type: String,
    default: "visible",
  },
});

const emit = defineEmits(["openSpakers"]);

const currentSpeaker = ref(1);
const prevSpeaker = ref(null);
const nextSpeaker = ref(null);
</script>

<template>
  <div class="user-content" v-if="speakers.length > 0">
    <h2 class="user-content__title text-h1">
      {{ $t("titles.speakers") }}
      <span class="user-content__title--count text-comment-small">
        {{ currentSpeaker + " / " + speakers.length }}
      </span>
    </h2>
    <div class="speakers-wrapper" :class="status === 'blur' ? 'blur' : ''">
      <button class="speakers-button" ref="prevSpeaker">
        <Icon :name="IconChevron" :size="24" />
      </button>
      <swiper
        :slides-per-view="speakers.length < 2 ? speakers.length : 2"
        :modules="[Navigation]"
        :navigation="{
          prevEl: prevSpeaker,
          nextEl: nextSpeaker,
        }"
        :breakpoints="{
          767.98: {
            slidesPerView: speakers.length < 3 ? speakers.length : 3,
          },
        }"
        space-between="30"
        @slideChange="currentSpeaker = $event.realIndex + 1"
      >
        <swiper-slide v-for="item in speakers" :key="item.id">
          <div class="speakers-slide" @click="emit('openSpakers')">
            <Avatar
              :src="item.src"
              :alt="item.name"
              :size="130"
              class="speakers-slide__avatar"
            />
            <span class="speakers-slide__name text-main">
              {{ item.name }}
            </span>
            <span class="speakers-slide__job text-comment-small">
              {{ item.job }}
            </span>
          </div>
        </swiper-slide>
      </swiper>
      <button class="speakers-button speakers-button--next" ref="nextSpeaker">
        <Icon :name="IconChevron" :size="24" />
      </button>
    </div>
    <Button
      :text="$t('button.more')"
      @click="emit('openSpakers')"
      class="user-content__more"
    />
  </div>
</template>

<style scoped lang="scss">
.user-content {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  &__title {
    display: flex;
    align-items: end;
    white-space: nowrap;
    column-gap: 20px;
    gap: 20px;
    &--count {
      position: relative;
      bottom: 3px;
    }
  }
  &__more {
    border-color: var(--color-dynamic-gray);
    color: var(--color-dynamic-gray);
    margin: 20px auto 0;
    font-size: 12px;
    height: 24px;
    font-family: "Inter";
    box-sizing: content-box;
    display: inline-flex;
    align-items: center;
    padding: 0 40px;
    width: auto;
    font-size: 10px;
    font-weight: 500;
    line-height: 12px;
    letter-spacing: 0.01em;
    @include ui-mouse {
      &:hover {
        color: var(--color-dynamic-gray);
        background-color: transparent;
      }
    }
  }
}
.speakers-wrapper {
  display: flex;
  gap: 12px;
  align-items: start;
  @include screen(767.98px) {
    gap: 16px;
  }
}
.speakers-slide {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  &__name {
    margin-top: 10px;
  }
  &__job {
    margin-top: 5px;
    word-wrap: break-word;
  }
  @include screen(767.98px) {
    &__avatar {
      width: 105px !important;
      height: 105px !important;
      min-width: 105px !important;
      min-height: 105px !important;
      max-height: 105px !important;
      max-width: 105px !important;
    }
  }
}
.speakers-button {
  margin-top: 62px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  &--next {
    transform: rotate(180deg);
  }
  @include screen(767.98px) {
    width: 24px;
    height: 24px;
    :deep(svg) {
      width: 24px !important;
      height: 24px !important;
      min-width: 24px !important;
      min-height: 24px !important;
      max-width: 24px !important;
      max-height: 24px !important;
    }
  }
}
</style>
