<script setup>
import Icon from "@/components/Icon.vue";
import IconClock from "@/components/icons/IconClock.vue";
import IconClockBack from "@/components/icons/IconClockBack.vue";
import IconClockForward from "@/components/icons/IconClockForward.vue";
import IconFile from "@/components/icons/IconFile.vue";
import IconCalendar from "@/components/icons/IconCalendar.vue";
import IconMap from "@/components/icons/IconMap.vue";
import IconDollar from "@/components/icons/IconDollar.vue";
import IconLocked from "@/components/icons/IconLocked.vue";
import IconUnLocked from "@/components/icons/IconUnLocked.vue";
import IconWeb from "@/components/icons/IconWeb.vue";

import Button from "@/components/Button.vue";

defineProps({
  description: {
    type: Object,
    required: true,
  },
  bookmarked: {
    type: Boolean,
    default: false,
  },
});

const getStatusIcon = (status) => {
  switch (status) {
    case "active":
      return IconClock;
    case "past":
      return IconClockBack;
    case "planned":
      return IconClockForward;
  }
};

const getTypeIcon = (type) => {
  switch (type) {
    case "open":
      return IconUnLocked;
    case "private":
      return IconLocked;
    case "paid":
      return IconDollar;
  }
};

const emit = defineEmits(["bookmarkEvent"]);

const openInNewTab = (url) => {
  window.open(url, "_blank").focus();
};
</script>

<template>
  <div>
    <div class="description-wrapper">
      <div class="section">
        <Icon :name="getStatusIcon(description.status.value)" :size="24" />
        <div class="section__item">
          <span class="text-comment-small">{{ $t("event.eventStatus") }}</span>
          <span
            class="text-button"
            :class="description.status.status === 'blur' ? 'blur' : ''"
          >
            {{ $t(`event.status.${description.status.value}`) }}
          </span>
        </div>
      </div>
      <div class="section">
        <Icon :name="IconFile" :size="24" />
        <div class="section__item">
          <span class="text-comment-small">{{ $t("event.eventFormat") }}</span>
          <span
            class="text-button"
            :class="description.format.status === 'blur' ? 'blur' : ''"
          >
            {{ description.format.value }}
          </span>
        </div>
      </div>
      <div class="section">
        <Icon :name="IconCalendar" :size="24" />
        <div class="section__item">
          <span class="text-comment-small">{{ $t("event.eventDate") }}</span>
          <time
            class="text-button"
            :class="description.date.status === 'blur' ? 'blur' : ''"
          >
            {{ $d(description.date.value.start, "short") }}
          </time>
          <time
            class="text-button"
            :class="description.date.status === 'blur' ? 'blur' : ''"
          >
            {{ $d(description.date.value.end, "short") }}
          </time>
        </div>
      </div>
      <div class="section location">
        <Icon :name="IconMap" :size="24" />
        <div class="section__item">
          <span class="text-comment-small">
            {{ $t("event.eventLocation") }}
          </span>
          <address
            class="location--font text-button"
            :class="description.location.status === 'blur' ? 'blur' : ''"
          >
            {{ description.location.value.address }}
          </address>
        </div>
      </div>
      <div class="section">
        <Icon :name="getTypeIcon(description.type.value)" :size="24" />
        <div class="section__item">
          <span class="text-comment-small">{{ $t("event.eventType") }}</span>
          <span
            class="text-button"
            :class="description.type.status === 'blur' ? 'blur' : ''"
          >
            {{ $t(`event.type.${description.type.value}`) }}
          </span>
        </div>
      </div>
      <div
        class="section website"
        @click="openInNewTab(description.website.value)"
      >
        <Icon :name="IconWeb" :size="24" />
        <div class="section__item">
          <span class="text-comment-small">
            {{ $t("event.website") }}
          </span>
          <a
            :href="description.website.value"
            target="_blank"
            class="section__item--link text-button"
            :class="description.website.status === 'blur' ? 'blur' : ''"
          >
            {{ description.website.value }}
          </a>
        </div>
      </div>
    </div>
    <div class="description-wrapper__actions">
      <Button
        class="description-wrapper__actions--button"
        type="primary"
        :text="bookmarked ? $t('event.unbookmark') : $t('event.bookmark')"
        @click="emit('bookmarkEvent')"
      />
      <Button
        class="description-wrapper__actions--button"
        type="secondary"
        :text="$t('event.register')"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.description-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: start;
  row-gap: 20px;
  &__actions {
    margin-top: 50px;
    padding: 0 27px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &--button {
      width: 210px;
      text-align: center;
    }
  }
  @include screen(767.98px) {
    &__actions {
      padding: 0;
      flex-direction: column;
      row-gap: 20px;
      &--button {
        width: 100%;
        text-align: center;
      }
    }
  }
}
.section {
  flex-basis: 50%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: start;
  column-gap: 10px;
  &__item {
    display: flex;
    flex-direction: column;
    gap: 5px;
    &--link {
      text-decoration: none;
    }
  }
  @include screen(767.98px) {
    flex-basis: 100%;
  }
}
.location {
  &--font {
    text-decoration: none;
    font-style: normal;
  }
}
.website {
  cursor: pointer;
}
</style>
