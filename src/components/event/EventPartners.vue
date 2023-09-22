<script setup>
import { ref } from "vue";

import "swiper/css";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper";

import Icon from "@/components/Icon.vue";
import IconChevron from "@/components/icons/IconChevron.vue";
import IconVerify from "@/components/icons/IconVerify.vue";
import IconK from "@/components/icons/IconK.vue";

import Avatar from "@/components/Avatar.vue";
import Button from "@/components/Button.vue";

defineProps({
  partners: {
    type: Array,
    required: true,
  },
  status: {
    type: String,
    default: "visible",
  },
});

const emit = defineEmits(["openPartners"]);

const currentPartner = ref(1);
const prevPartner = ref(null);
const nextPartner = ref(null);
</script>

<template>
  <div class="user-content">
    <h2 class="user-content__title text-h1">
      {{ $t("titles.partners") }}
    </h2>
    <div class="partners-wrapper" :class="status === 'blur' ? 'blur' : ''">
      <button class="partners-button" ref="prevPartner">
        <Icon :name="IconChevron" :size="24" />
      </button>
      <swiper
        :slides-per-view="partners.length < 2 ? partners.length : 2"
        :modules="[Navigation]"
        :navigation="{
          prevEl: prevPartner,
          nextEl: nextPartner,
        }"
        :breakpoints="{
          767.98: {
            slidesPerView: partners.length < 2 ? partners.length : 2,
          },
        }"
        space-between="5"
        @slideChange="currentPartner = $event.realIndex + 1"
      >
        <swiper-slide v-for="item in partners" :key="item.id">
          <div class="partners-slide" @click="emit('openPartners')">
            <div class="partners-slide__avatar">
              <Avatar
                :src="item.src"
                :alt="item.name"
                :rect="item.isImgRect"
                class="partners-slide__avatar--img"
                :class="{ 'partners-slide__avatar--rect': item.isImgRect }"
              />
            </div>
            <div>
              <div class="partners-slide__name">
                <span class="partners-slide__name--font">
                  {{ item.name }}
                </span>
                <Icon :name="IconVerify" :size="14" v-if="item.isVerified" />
                <Icon :name="IconK" :size="12" v-if="item.isKonTXT" />
              </div>
              <div class="partners-slide__desc text-comment-small">
                {{ item.description }}
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
      <button class="partners-button partners-button--next" ref="nextPartner">
        <Icon :name="IconChevron" :size="24" />
      </button>
    </div>
    <Button
      :text="$t('button.more')"
      @click="emit('openPartners')"
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
    align-items: center;
    white-space: nowrap;
    gap: 20px;
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

.partners-wrapper {
  display: flex;
  align-items: start;
  gap: 12px;
  @include screen(767.98px) {
    gap: 16px;
  }
}
.partners-slide {
  height: 185px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @include screen(767.98px) {
    height: 160px;
  }
  &__avatar {
    height: 120px;
    display: flex;
    align-items: center;
    &--img {
      width: 120px !important;
      height: 120px !important;
      min-width: 120px !important;
      min-height: 120px !important;
      max-height: 120px !important;
      max-width: 120px !important;
    }
    &--rect {
      width: 170px !important;
      height: 70px !important;
      min-width: 170px !important;
      min-height: 70px !important;
    }
    @include screen(767.98px) {
      &--img {
        width: 105px !important;
        height: 105px !important;
        min-width: 105px !important;
        min-height: 105px !important;
        max-height: 105px !important;
        max-width: 105px !important;
      }
      &--rect {
        width: 105px !important;
        height: 50px !important;
        min-width: 105px !important;
        min-height: 50px !important;
      }
    }
  }
  &__name {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    column-gap: 5px;
    text-align: center;
    &--font {
      color: var(--color-dynamic-black);
      font-family: Inter;
      font-size: 12px;
      font-weight: 600;
      line-height: 16px;
      letter-spacing: 0em;
      text-align: center;
    }
  }
  &__desc {
    margin-top: 5px;
    height: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    text-align: center;
  }
}
.partners-button {
  margin-bottom: 30px;
  align-self: center;
  justify-self: center;
  &--icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
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
