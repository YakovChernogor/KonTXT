<script setup>
import Modal from "@/components/Modal.vue";
import ActionModalBar from "@/components/ActionModalBar.vue";

defineProps({
  modelValue: Boolean,
  timetable: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <Modal :open="modelValue" @close="emit('update:modelValue', false)">
    <div class="modal__header">
      <p class="modal__header--font">
        {{ $t("titles.timetable") }}
      </p>
      <ActionModalBar search />
    </div>
    <div class="modal__content">
      <ul class="timetable-wrapper">
        <li class="timetable-body" v-for="item in timetable" :key="item.id">
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
            <span class="text-main-2">
              {{ item.title }}
            </span>
          </span>
          <div class="timetable-body__text">
            <p class="timetable-body__text--font">
              {{ item.text }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </Modal>
</template>

<style scoped lang="scss">
.timetable-wrapper {
  display: flex;
  flex-direction: column;
  row-gap: 30px;
}
.timetable-body {
  list-style-type: none;
  display: grid;
  grid-template-columns: 1fr 120px;
  column-gap: 50px;
  row-gap: 10px;
  &__date {
    grid-row: span 2;
    grid-column: 2 / 2;
    display: flex;
    flex-direction: column;
    align-items: end;
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
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    display: flex;
    align-self: stretch;
  }
  &__text {
    grid-column: span 2;
    &--font {
      color: var(--color-dynamic-gray);
      font-family: Montserrat;
      font-size: 10px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  }
}
.modal {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    padding-bottom: 8px;
    position: relative;
    z-index: 1;
    background: var(--color-dynamic-white);
    &--font {
      color: var(--color-dynamic-black);
      font-family: Inter;
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      letter-spacing: 0.2px;
      @include screen(767.98px) {
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;
      }
    }
  }
  &__content {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: start;
    column-gap: 30px;
    row-gap: 40px;
    overflow: auto;
    // height: calc(100% - 67px);
    &::-webkit-scrollbar {
      display: none;
      opacity: 0;
      width: 0;
      height: 0;
    }
  }
  @include screen(767.98px) {
    &__content {
      display: flex;
      flex-direction: column;
      row-gap: 30px;
    }
  }
}
</style>
