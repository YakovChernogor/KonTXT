<script setup>
import { computed, ref } from "vue";

import Users from "@/database/users.js";

import Avatar from "@/components/Avatar.vue";
import AvatarPlaceholder from "@/components/event/AvatarPlaceholder.vue";

const props = defineProps({
  members: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["openMembers"]);

const windowWidth = ref(window.innerWidth);
window.addEventListener("resize", (el) => {
  windowWidth.value = el.target.innerWidth;
});

const avatars = computed(() =>
  windowWidth.value < 767
    ? props.members.value.slice(0, 2)
    : props.members.value.slice(0, 3)
);

const placeholders = computed(() => {
  if (props.members.value.length > 0) return windowWidth.value < 767 ? 1 : 3;
  return 1;
});

const placeholderText = computed(() =>
  props.members.value.length > 0
    ? `+${props.members.value.length - avatars.value.length}`
    : 0
);
</script>

<template>
  <div class="user-content">
    <div class="user-content__title">
      <span class="text-h1">
        {{ $t("members") }}
      </span>
      <span
        class="user-content__title--people text-comment-small"
        :class="members.status === 'blur' ? 'blur' : ''"
      >
        {{ $t("event.people", { count: members.value.length }) }}
      </span>
    </div>
    <div class="members__avatars">
      <RouterLink
        :to="`/user/${id}/cutaway`"
        class="members__avatars__list"
        :class="members.status === 'blur' ? 'blur' : ''"
        v-for="id in avatars"
      >
        <Avatar
          :key="id"
          :src="Users[id].src"
          :size="50"
          :alt="Users[id].name"
          class="members__avatars__list--avatar"
        />
      </RouterLink>

      <div class="members__avatars__placeholder" @click="emit('openMembers')">
        <AvatarPlaceholder
          v-for="_ in placeholders"
          :size="50"
          :text="placeholderText"
          class="members__avatars__placeholder--avatar"
          :class="members.status === 'blur' ? 'blur' : ''"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-content {
  display: flex;
  flex-direction: column;
  row-gap: 6px;
  &__title {
    display: flex;
    align-items: end;
    row-gap: 10px;
    column-gap: 10px;
    white-space: nowrap;
    &--people {
      margin-bottom: 2px;
    }
    @include screen(767.98px) {
      &--people {
        display: none;
      }
    }
  }
}
.members {
  display: flex;
  align-items: center;
  gap: 10px;
  &__avatars {
    display: flex;
    flex-direction: row;
    align-items: center;
    &__list {
      display: flex;
      flex-direction: row-reverse;
      justify-content: flex-end;
      &--avatar {
        margin-right: -15px;
      }
    }
    &__placeholder {
      margin-left: -10px;
      display: flex;
      flex-direction: row-reverse;
      cursor: pointer;
      &--avatar {
        margin-right: -60px;
      }
    }
    &__placeholder :last-child {
      border-color: var(--color-dynamic-black-alpha) !important;
    }
  }
}
</style>
