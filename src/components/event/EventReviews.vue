<script setup>
import { ref } from "vue";

import "swiper/css";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper";

import Users from "@/database/users.js";

import Icon from "@/components/Icon.vue";
import IconChevron from "@/components/icons/IconChevron.vue";

import Button from "@/components/Button.vue";
import Review from "@/components/Review.vue";

defineProps({
  reviews: {
    type: Array,
    required: true,
  },
  status: {
    type: String,
    default: "visible",
  },
});

const emit = defineEmits(["openReviews"]);

const currentReview = ref(1);
const prevReview = ref(null);
const nextReview = ref(null);
</script>

<template>
  <div class="user-content" v-if="reviews.length > 0">
    <h2 class="user-content__title text-h1">
      {{ $t("titles.reviews") }}
      <span class="user-content__title--count text-comment-small">
        {{ currentReview + " / " + reviews.length }}
      </span>
    </h2>
    <div class="review-wrapper" :class="status === 'blur' ? 'blur' : ''">
      <button class="review__button" ref="prevReview">
        <Icon :name="IconChevron" :size="24" />
      </button>
      <swiper
        :slides-per-view="1"
        loop
        :modules="[Navigation]"
        :navigation="{
          prevEl: prevReview,
          nextEl: nextReview,
        }"
        space-between="16"
        @slideChange="currentReview = $event.realIndex + 1"
      >
        <swiper-slide v-for="item in reviews" :key="item.id">
          <Review :review="Users[item.id]" :text="item.text" />
        </swiper-slide>
      </swiper>
      <button class="review__button review__button--next" ref="nextReview">
        <Icon :name="IconChevron" :size="24" />
      </button>
    </div>
    <Button
      @click="emit('openReviews')"
      :text="$t('button.more')"
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
    &--count {
      position: relative;
      bottom: 3px;
    }
  }
  &__more {
    border-color: var(--color-dynamic-gray);
    color: var(--color-dynamic-gray);
    margin: 0 auto;
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
.review-wrapper {
  display: flex;
  gap: 46px;
  align-items: start;
  &--video {
    gap: 12px;
  }
  &--blur {
    .swiper {
      filter: blur(7px);
      pointer-events: none;
      user-select: none;
    }
  }
  @include screen(767.98px) {
    gap: 20px;
    &--video {
      gap: 16px;
    }
  }
}

.review {
  &__button {
    margin-top: 10px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    &--next {
      transform: rotate(180deg);
    }
    &--video {
      margin-top: 52px;
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
      &--video {
        margin-top: 41px;
      }
    }
  }
}
</style>
