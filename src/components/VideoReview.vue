<template>
  <div class="review-video">
    <div
      class="review-video__info"
      :class="{
        'review-video__info--full': full,
        'review-video__info--active': active,
        'review-video__info--round': round,
      }"
    >
      <div
        class="review-video__preview"
        :class="{
          'review-video__preview--active': active,
          'review-video__preview--round': round,
        }"
        @click="
          () => {
            if (full) videoPlay();
          }
        "
      >
        <Avatar
          :src="review.src"
          :size="full ? 180 : 130"
          :alt="review.name"
          v-show="!active"
          class="review-video__avatar"
        />
        <video
          ref="videoItem"
          :src="src"
          muted
          controls
          class="review-video__video"
          v-show="active"
        ></video>
        <Transition name="fade">
          <Icon
            :name="IconPlayMedia"
            v-if="full && !active"
            class="review-video__play"
          />
        </Transition>
      </div>
      <div class="review-video__name">
        <div class="review-video__col">
          <p class="text-main review-video__title">
            <span>{{ review.name }} </span>
            <Icon
              :name="IconVerify"
              :size="24"
              v-if="review.isVerified && full"
            />
          </p>
          <p class="text-comment-small">
            {{ review.profession }}, {{ review.address.value }}
          </p>
          <p class="text-comment-small" v-if="full">
            {{ review.job }}, {{ review.company }}
          </p>
        </div>
        <div class="review-video__karma" v-if="full">
          <Karma :value="review.karma" small />
          <Reputation :value="review.karma" small />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Avatar from "./Avatar.vue";
import Icon from "./Icon.vue";
import Karma from "./Karma.vue";
import Reputation from "./Reputation.vue";
import IconVerify from "./icons/IconVerify.vue";
import IconPlayMedia from "./icons/IconPlayMedia.vue";
import { onMounted, ref } from "vue";

defineProps({
  review: {
    type: Object,
    required: true,
  },
  src: {
    type: String,
    required: true,
  },
  round: {
    type: Boolean,
    default: false,
  },
  full: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["openOnly"]);

const active = ref(false);
const videoItem = ref(null);

const videoPlay = () => {
  if (!active.value) {
    active.value = !active.value;
    videoItem.value.play();
  }
};

onMounted(() => {
  videoItem.value.addEventListener("ended", () => {
    active.value = false;
  });

  videoItem.value.addEventListener("pause", () => {
    if (videoItem.value.mozCancelFullScreen) {
      videoItem.value.mozCancelFullScreen();
    } else {
      videoItem.value.webkitExitFullscreen();
    }
    active.value = false;
  });
});
</script>

<style scoped lang="scss">
.review-video {
  &__col {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  &__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 486px;
    justify-content: space-between;
    &--full {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-left: 60px;
      gap: 86px;
      .review-video {
        &__name {
          text-align: left;
        }
        &__title {
          font-size: 18px;
          font-weight: 600;
          display: inline-flex;
          justify-content: flex-start;
          align-items: center;
          margin-bottom: 10px;
          line-height: 22px;
          span {
            display: inline;
            width: auto;
          }
          svg {
            margin-left: 10px;
          }
        }
        &__preview {
          min-height: 180px;
          height: 180px;
          min-width: 180px;
          width: 180px;
        }
      }
    }
    &--active:not(.review-video__info--round) {
      gap: 30px;
    }
  }
  &__video {
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
  }
  &__name {
    display: flex;
    flex-direction: column;
    gap: 2px;
    text-align: center;
    margin-top: 10px;
    width: 100%;
  }
  &__karma {
    margin-top: 20px;
    display: flex;
    gap: 36px;
  }
  &__preview {
    position: relative;
    // transition: .3s ease;
    overflow: hidden;
    border-radius: 20px;

    &::before {
      content: "";
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: rgba(#14181f, 0.25);
      position: absolute;
      transition: 0.3s opacity;
    }
    &--round {
      border-radius: 50%;
    }
    &--active {
      min-height: 180px;
      height: 180px;
      min-width: 180px;
      width: 180px;
      &::before {
        opacity: 0;
      }
      &:not(.review-video__preview--round) {
        min-height: 180px;
        height: 180px;
        min-width: 266px;
        width: 266px;
        margin-left: -30px;
        &::before {
          border-radius: 20px;
          opacity: 0;
        }
      }
    }
  }
  &__play {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    box-sizing: content-box;
    padding: 8px;
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
    &__info {
      &--full {
        flex-direction: row;
        gap: 20px;
        margin-left: 0;
        .review-video {
          &__preview {
            width: 98px !important;
            height: 98px !important;
            min-width: 98px !important;
            min-height: 98px !important;
            max-height: 98px !important;
            max-width: 98px !important;
            &--active.review-video__preview--round {
              width: 180px !important;
              height: 180px !important;
              min-width: 180px !important;
              min-height: 180px !important;
              max-height: 180px !important;
              max-width: 180px !important;
            }
            &--active:not(.review-video__preview--round) {
              margin-left: 0;
              height: 180px !important;
              width: 100% !important;
              min-height: 180px !important;
              min-width: 100% !important;
              max-height: 180px !important;
              max-width: 100% !important;
            }
          }
          &__avatar {
            width: 98px !important;
            height: 98px !important;
            min-width: 98px !important;
            min-height: 98px !important;
            max-height: 98px !important;
            max-width: 98px !important;
          }
          &__title {
            font-size: 14px;
          }
          &__name {
            width: 100%;
          }
        }
      }
      &--active {
        flex-direction: column;
        .review-video {
          &__name {
            flex-direction: row;
            justify-content: space-between;
          }
          &__karma {
            margin-top: 0;
            flex-direction: column;
            gap: 10px;
          }
        }
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
