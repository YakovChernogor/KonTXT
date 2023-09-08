<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { defineEvent, useSchemaOrg } from "@vueuse/schema-org";

import Events from "@/database/events";
import { useUserStore } from "@/stores/user";

import EventHeader from "@/components/event/EventHeader.vue";
import EventMembers from "@/components/event/EventMembers.vue";
import EventReputation from "@/components/event/EventReputation.vue";
import EventDescription from "@/components/event/EventDescription.vue";
import EventSpeakers from "@/components/event/EventSpeakers.vue";
import EventTimetable from "@/components/event/EventTimetable.vue";
import EventReviews from "@/components/event/EventReviews.vue";
import EventOrganizer from "@/components/event/EventOrganizer.vue";
import EventPartners from "@/components/event/EventPartners.vue";
import EventContacts from "@/components/event/EventContacts.vue";

import ModalShare from "@/components/event/modals/ModalShare.vue";
import ModalMembers from "@/components/event/modals/ModalMembers.vue";
import ModalSpeakers from "@/components/event/modals/ModalSpeakers.vue";
import ModalTimetable from "@/components/event/modals/ModalTimetable.vue";
import ModalReviews from "@/components/event/modals/ModalReviews.vue";
import ModalPartners from "@/components/event/modals/ModalPartners.vue";

const route = useRoute();
const userStore = useUserStore();
const isAuth = userStore.isAuth;

const bookmarked = ref(false);

const modalShare = ref(false);
const modalMembers = ref(false);
const modalSpeakers = ref(false);
const modalTimetable = ref(false);
const modalReviews = ref(false);
const modalOrganizers = ref(false);
const modalPartners = ref(false);

const url = computed(() => {
  return window.location.href;
});

const eventInfo = route.params.id
  ? Events.find((event) => route.params.id === event.id)
  : Events[0];

const getSrc = (src) =>
  new URL(`/src/assets/images/${src}`, import.meta.url).href;

useSchemaOrg([
  defineEvent({
    name: eventInfo.name.value,
    image: getSrc(eventInfo.image.value),
    organizer: eventInfo.organizers[0],
    performer: eventInfo.speakers.value.map((el) => el.name),
    description: eventInfo.text.value,
    startDate: eventInfo.description.date.value.start,
    endDate: eventInfo.description.date.value.end,
    eventStatus: eventInfo.description.status.value.start,
  }),
]);
</script>

<template>
  <main class="event">
    <EventHeader
      @bookmarkEvent="bookmarked = !bookmarked"
      @openShare="modalShare = true"
      :name="eventInfo.name"
      :image="eventInfo.image"
      :bookmarked="bookmarked"
    />
    <div class="event__info">
      <EventMembers
        @openMembers="modalMembers = true"
        :members="eventInfo.members"
        class="event__info__members"
      />
      <EventReputation
        :reputation="eventInfo.reputation"
        class="event__info__reputation"
      />
    </div>

    <article
      v-if="eventInfo.text.status !== 'hidden'"
      class="event__item event__item--text"
      :class="eventInfo.text.status === 'blur' ? 'blur' : ''"
    >
      {{ eventInfo.text.value }}
    </article>

    <EventDescription
      @bookmarkEvent="bookmarked = !bookmarked"
      :description="eventInfo.description"
      :bookmarked="bookmarked"
      class="event__item"
    />

    <EventSpeakers
      v-if="eventInfo.speakers.status !== 'hidden'"
      :status="eventInfo.speakers.status"
      :speakers="eventInfo.speakers.value"
      @openSpakers="
        eventInfo.speakers.status === 'visible'
          ? (modalSpeakers = true)
          : (modalSpeakers = false)
      "
      class="event__item"
    />

    <EventTimetable
      v-if="eventInfo.timetable.status !== 'hidden'"
      :status="eventInfo.timetable.status"
      :timetable="eventInfo.timetable.value"
      @openTimetable="
        eventInfo.timetable.status === 'visible'
          ? (modalTimetable = true)
          : (modalTimetable = false)
      "
      class="event__item"
    />

    <EventReviews
      v-if="eventInfo.reviews.status !== 'hidden'"
      :status="eventInfo.reviews.status"
      :reviews="eventInfo.reviews.value"
      class="event__item"
      @openReviews="
        eventInfo.reviews.status === 'visible'
          ? (modalReviews = true)
          : (modalReviews = false)
      "
    />
    <EventOrganizer
      v-if="eventInfo.organizers.status !== 'hidden'"
      :status="eventInfo.reviews.status"
      :organizers="eventInfo.organizers.value"
      class="event__item"
      @openOrganizers="
        eventInfo.organizers.status === 'visible'
          ? (modalOrganizers = true)
          : (modalOrganizers = false)
      "
    />

    <EventPartners
      v-if="eventInfo.partners.status !== 'hidden'"
      :status="eventInfo.partners.status"
      :partners="eventInfo.partners.value"
      @openPartners="
        eventInfo.partners.status === 'visible'
          ? (modalPartners = true)
          : (modalPartners = false)
      "
      class="event__item"
    />

    <div class="contacts">
      <EventContacts
        v-if="eventInfo.contacts.status !== 'hidden'"
        :contacts="eventInfo.contacts"
        class="event__item"
      />
    </div>

    <div>
      <ModalShare v-model="modalShare" :event-id="eventInfo.id" :url="url" />
      <ModalMembers v-model="modalMembers" :members="eventInfo.members.value" />
      <ModalSpeakers
        v-model="modalSpeakers"
        :speakers="eventInfo.speakers.value"
      />
      <ModalReviews v-model="modalReviews" :reviews="eventInfo.reviews.value" />
      <ModalTimetable
        v-model="modalTimetable"
        :timetable="eventInfo.timetable.value"
      />
      <ModalPartners
        v-model="modalPartners"
        :title="$t('titles.partners')"
        :partners="eventInfo.partners.value"
      />
      <ModalPartners
        v-model="modalOrganizers"
        :title="$t('titles.organizer', eventInfo.organizers.value.length)"
        :partners="eventInfo.organizers.value"
      />
    </div>
  </main>
</template>

<style scoped lang="scss">
.event {
  display: flex;
  flex-direction: column;
  &__info {
    margin-top: 50px;
    display: flex;
    align-items: stretch;
    &__members {
      flex-basis: 50%;
    }
    &__reputation {
      flex-basis: 50%;
    }
  }
  &__item {
    margin-top: 50px;
    &--text {
      color: var(--color-dynamic-black);
      font-family: Montserrat;
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
    }
  }
  @include screen(767.98px) {
    &__info {
      margin-top: 40px;
      column-gap: 40px;
    }
    &__item {
      margin-top: 40px;
    }
  }
}
</style>
