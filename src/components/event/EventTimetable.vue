<script setup>
import { ref } from "vue";
import Icon from "@/components/Icon.vue";
import IconDownload from "@/components/icons/IconDownload.vue";

import Button from "@/components/Button.vue";

const props = defineProps({
  timetable: {
    type: Array,
    required: true,
  },
  status: {
    type: String,
    default: "visible",
  },
});

const emit = defineEmits(["openTimetable"]);

const moreButton = ref(true);
const viewTable = ref(props.timetable.slice(0, 5));

const windowWidth = ref(window.innerWidth);
window.addEventListener("resize", () => {
  windowWidth.value = window.innerWidth;
});

const expandTimetable = () => {
  if (windowWidth.value > 767.98) {
    viewTable.value = props.timetable;
    moreButton.value = false;
  } else {
    emit("openTimetable");
  }
};
</script>

<template>
  <div class="main">
    <div class="user-content">
      <h2 class="user-content__title text-h1">
        {{ $t("titles.timetable") }}
      </h2>
      <button class="user-content__button">
        <Icon :name="IconDownload" :size="24" />
      </button>
    </div>

    <TransitionGroup
      name="fade-slide-down"
      tag="ul"
      class="timetable-wrapper"
      :class="status === 'blur' ? 'blur' : ''"
    >
      <li class="timetable-body" v-for="item in viewTable" :key="item.id">
        <div class="timetable-body__date">
          <span class="timetable-body__date--month-font">
            {{ $d(item.date.start, "month_day") }}
          </span>
          <time class="timetable-body__date--time-font">
            {{
              `${$d(item.date.start, "hour_minute")} - ${$d(
                item.date.end,
                "hour_minute"
              )}`
            }}
          </time>
        </div>
        <span class="timetable-body__title text-main">
          <h3 class="text-main-2">
            {{ item.title }}
          </h3>
        </span>
        <article class="timetable-body__text">
          <p class="timetable-body__text--font">
            {{ item.text }}
          </p>
        </article>
      </li>
    </TransitionGroup>
    <Button
      v-if="moreButton && timetable.length > 5"
      @click="expandTimetable"
      :text="$t('button.more')"
      class="user-content__more"
    />
  </div>
</template>

<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}
.timetable-wrapper {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  row-gap: 30px;
}
.timetable-body {
  list-style-type: none;
  display: grid;
  grid-template-columns: 120px 1fr;
  column-gap: 50px;
  row-gap: 5px;
  &__date {
    grid-row: span 2;
    grid-column: 1 / 2;
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    &--month-font {
      color: var(--color-dynamic-gray);
      font-family: Montserrat;
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
    &--time-font {
      color: var(--color-dynamic-black);
      font-family: Montserrat;
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
  }
  &__title {
    grid-column: 2 / 2;
    display: flex;
    align-self: stretch;
  }
  &__text {
    grid-column: 2 / 2;
    &--font {
      color: var(--color-dynamic-gray);
      font-family: Montserrat;
      font-size: 10px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  }
  @include screen(767.98px) {
    grid-template-columns: 1fr 120px;
    row-gap: 10px;
    &__date {
      grid-column: 2 / 2;
      align-items: end;
    }
    &__title {
      grid-column: 1 / 2;
      grid-row: 1 / 2;
    }
    &__text {
      grid-column: span 2;
    }
  }
}
.user-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  row-gap: 20px;
  &__title {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  &__button {
    cursor: pointer;
    width: 24px;
    height: 24px;
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

.fade-slide-down-enter-active,
.fade-slide-down-leave-active {
  transition: all 0.5s ease-out;
}
.fade-slide-down-enter-from {
  opacity: 0;
  transform: translate(0%, -50%);
}
.fade-slide-down-leave-to {
  opacity: 1;
  transform: translate(0%, 50%);
}
</style>
