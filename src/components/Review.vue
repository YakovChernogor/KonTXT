<template>
  <div class="review" :class="{ 'review--full': full }">
    <p class="text-main review__text">
      {{
        status === "blur"
          ? text
              .split(" ")
              .map((e) => new Array(e.length).fill("A", 0, e.length).join(""))
              .join(" ")
          : text
      }}
    </p>
    <div class="review__info">
      <div class="review__aside">
        <Avatar :src="review.src" :size="full ? 88 : 50" :alt="review.name" />
        <div class="review__karma review__karma--mobile" v-if="full">
          <Karma :value="review.karma" small />
          <Reputation :value="review.karma" small />
        </div>
      </div>
      <div class="review__name">
        <p class="text-main review__title">
          {{ review.name }}
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
        <p class="text-main review__text review__text--mobile" v-if="full">
          {{ text }}
        </p>
      </div>
      <div class="review__karma" v-if="full">
        <Karma :value="review.karma" small />
        <Reputation :value="review.karma" small />
      </div>
    </div>
  </div>
</template>

<script setup>
import Avatar from "./Avatar.vue";
import Icon from "./Icon.vue";
import IconVerify from "./icons/IconVerify.vue";
import Karma from "./Karma.vue";
import Reputation from "./Reputation.vue";

defineProps({
  review: {
    type: Object,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  full: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
  },
});
</script>

<style scoped lang="scss">
.review {
  display: flex;
  flex-direction: column;
  gap: 12px;
  &__info {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  &__name {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  &__karma {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-left: auto;
    &--mobile {
      display: none;
    }
  }
  &__text {
    &--mobile {
      display: none;
    }
  }
  &--full {
    display: flex;
    flex-direction: column-reverse;
    gap: 0px;
    .review {
      &__name {
        text-align: left;
      }
      &__info {
        align-items: flex-start;
        gap: 21px;
      }
      &__title {
        font-size: 18px;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 18px;
        margin-bottom: 10px;
      }
      &__text {
        padding-left: calc(88px + 21px);
      }
    }
  }
  @include screen(767.98px) {
    gap: 10px;
    &__info {
      justify-content: center;
    }
    &__karma {
      display: none;
      &--mobile {
        display: flex;
        flex-direction: column;
        gap: 5px;
        margin-left: 0;
      }
    }
    &__aside {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
    }
    &--full {
      .review {
        &__title {
          font-size: 14px;
        }
        &__text {
          display: none;
          &--mobile {
            display: flex;
            padding-left: 0;
            margin-top: 20px;
          }
        }
      }
    }
  }
}
</style>
