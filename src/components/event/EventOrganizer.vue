<script setup>
import { ref } from "vue";

import "swiper/css";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper";

import Icon from "@/components/Icon.vue";
import IconReputation from "@/components/icons/IconReputation.vue";
import IconUsers from "@/components/icons/IconUsers.vue";
import IconChevron from "@/components/icons/IconChevron.vue";
import IconChevronRight from "@/components/icons/IconChevronRight.vue";
import IconVerify from "@/components/icons/IconVerify.vue";
import IconK from "@/components/icons/IconK.vue";

import Avatar from "@/components/Avatar.vue";
import Button from "@/components/Button.vue";

const props = defineProps({
  organizers: {
    type: Array,
    required: true,
  },
  status: {
    type: String,
    default: "visible",
  },
});

const emit = defineEmits(["openOrganizers"]);

const currentOrganizer = ref(1);
const prevOrganizer = ref(null);
const nextOrganizer = ref(null);
</script>

<template>
  <div class="user-content">
    <h2 class="user-content__title text-h1">
      {{ $t("titles.organizer", organizers.length) }}
    </h2>
    <div v-if="organizers.length === 1">
      <div class="organizer" :class="status === 'blur' ? 'blur' : ''">
        <div class="organizer__avatar">
          <Avatar
            class="organizer__avatar--img"
            :class="{ 'organizer__avatar--rect': organizers[0].isImgRect }"
            :src="organizers[0].src"
            :rect="organizers[0].isImgRect"
            :alt="organizers[0].name"
          />
        </div>
        <div class="organizer__name">
          <span class="organizer__name--font">
            {{ organizers[0].name }}
          </span>
        </div>
        <div class="organizer__reputation">
          <div class="organizer__item">
            <span class="organizer__item--value">
              {{ organizers[0].reputation }}
            </span>
            <Icon class="organizer__reputation--icon" :name="IconReputation" />
          </div>
          <span class="organizer__item--name">
            {{ $t("event.reputation") }}
          </span>
        </div>
        <div class="organizer__members">
          <div class="organizer__item">
            <span class="organizer__item--value">
              {{ organizers[0].members }}
            </span>
            <Icon class="organizer__members--icon" :name="IconUsers" />
          </div>
          <div class="organizer__more">
            <span class="organizer__item--name">
              {{ $t("event.participants") }}
            </span>
            <div class="organizer__more--link">
              <span class="text-comment-small">{{ $t("button.details") }}</span>
              <Icon :name="IconChevronRight" :size="24" />
            </div>
          </div>
        </div>
      </div>
      <div class="user-content__more">
        <Button
          class="user-content__more--button"
          :text="$t('button.details')"
        />
      </div>
    </div>
    <div v-else-if="organizers.length > 1">
      <div class="organizers-wrapper" :class="status === 'blur' ? 'blur' : ''">
        <button class="organizers-button" ref="prevOrganizer">
          <Icon clas="organizers-button--icon" :name="IconChevron" :size="24" />
        </button>
        <swiper
          :slides-per-view="organizers.length < 2 ? organizers.length : 2"
          :modules="[Navigation]"
          :navigation="{
            prevEl: prevOrganizer,
            nextEl: nextOrganizer,
          }"
          :breakpoints="{
            767.98: {
              slidesPerView: organizers.length < 2 ? organizers.length : 2,
            },
          }"
          space-between="5"
          @slideChange="currentOrganizer = $event.realIndex + 1"
        >
          <swiper-slide v-for="item in organizers" :key="item.id">
            <div class="organizers-slide" @click="emit('openOrganizers')">
              <div class="organizers-slide__avatar">
                <Avatar
                  :src="item.src"
                  :alt="item.name"
                  :rect="item.isImgRect"
                  class="organizers-slide__avatar--img"
                  :class="{ 'organizers-slide__avatar--rect': item.isImgRect }"
                />
              </div>
              <div>
                <div class="organizers-slide__name">
                  <span class="organizers-slide__name--font">
                    {{ item.name }}
                  </span>
                  <Icon :name="IconVerify" :size="14" v-if="item.isVerified" />
                  <Icon :name="IconK" :size="12" v-if="item.isKonTXT" />
                </div>
                <div class="organizers-slide__desc text-comment-small">
                  {{ item.description }}
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
        <button class="organizers-button" ref="nextOrganizer">
          <Icon
            class="organizers-button--icon organizers-button--next"
            :name="IconChevron"
            :size="24"
          />
        </button>
      </div>

      <div class="organizers__more">
        <Button
          class="organizers__more--button"
          @click="emit('openOrganizers')"
          :text="$t('button.more')"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 20px;
  &__title {
    display: flex;
    align-items: center;
    white-space: nowrap;
    gap: 20px;
  }
  &__more {
    display: none;
    &--button {
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
    @include screen(767.98px) {
      display: flex;
    }
  }
}

.organizer {
  display: grid;
  grid-template-columns: 180px 20px 100px 200px;
  align-items: stretch;
  // column-gap: 20px;
  row-gap: 10px;
  @include screen(767.98px) {
    grid-template-columns: 1fr 0 1fr 200px;
    column-gap: 20px;
  }
  &__avatar {
    grid-row: span 2;
    grid-column: 1;
    align-self: center;
    justify-self: center;
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
        width: 88px !important;
        height: 88px !important;
        min-width: 88px !important;
        min-height: 88px !important;
        max-height: 88px !important;
        max-width: 88px !important;
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
    grid-column: span 2 / 5;
    &--font {
      color: var(--color-dynamic-black);
      font-family: Inter;
      font-size: 22px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      letter-spacing: 0.22px;
      @include screen(767.98px) {
        color: var(--color-dynamic-black);
        font-family: "Inter";
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 22px;
        letter-spacing: 0.01em;
      }
    }
  }
  &__item {
    display: flex;
    align-items: center;
    column-gap: 5px;
    &--value {
      color: var(--color-dynamic-black);
      font-family: Montserrat;
      font-size: 28px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      @include screen(767.98px) {
        font-family: Montserrat;
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
      }
    }
    &--name {
      display: flex;
      column-gap: 40px;
      color: var(--color-dynamic-black);
      font-family: Inter;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: 0.12px;
    }
  }
  &__reputation {
    grid-column: 3;
    grid-row: 2;
    display: flex;
    flex-direction: column;
    &--icon {
      width: 24px !important;
      height: 24px !important;
      min-width: 24px !important;
      min-height: 24px !important;
      max-width: 24px !important;
      max-height: 24px !important;
      @include screen(767.98px) {
        width: 16px !important;
        height: 16px !important;
        min-width: 16px !important;
        min-height: 16px !important;
        max-width: 16px !important;
        max-height: 16px !important;
      }
    }
  }
  &__members {
    grid-column: 4;
    grid-row: 2;
    display: flex;
    flex-direction: column;
    &--icon {
      width: 24px !important;
      height: 24px !important;
      min-width: 24px !important;
      min-height: 24px !important;
      max-width: 24px !important;
      max-height: 24px !important;
      @include screen(767.98px) {
        width: 18px !important;
        height: 18px !important;
        min-width: 18px !important;
        min-height: 18px !important;
        max-width: 18px !important;
        max-height: 18px !important;
      }
    }
  }

  &__more {
    display: flex;
    column-gap: 40px;
    &--link {
      position: relative;
      bottom: 5px;
      display: flex;
      align-items: center;
      cursor: pointer;
      :deep(path[stroke]) {
        stroke: var(--color-dynamic-gray) !important;
      }
    }
    @include screen(767.98px) {
      &--link {
        display: none;
      }
    }
  }
}
.organizers-wrapper {
  display: flex;
  align-items: start;
  gap: 12px;
  @include screen(767.98px) {
    gap: 16px;
  }
}
.organizers {
  &__more {
    display: flex;
    flex-direction: column;

    &--button {
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
}
.organizers-slide {
  height: 185px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @include screen(767.98px) {
    height: 160px;
    // justify-content: stretch;
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
      font-style: normal;
      font-weight: 600;
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
.organizers-button {
  margin-bottom: 30px;
  align-self: center;
  justify-self: center;
  cursor: pointer;
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
