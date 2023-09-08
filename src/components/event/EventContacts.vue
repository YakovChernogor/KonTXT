<script setup>
import { ref } from "vue";

import Icon from "@/components/Icon.vue";
import IconMap from "@/components/icons/IconMap.vue";
import IconPhone from "@/components/icons/IconPhone.vue";
import IconSmartphone from "@/components/icons/IconSmartphone.vue";
import IconFilledViber from "@/components/icons/IconFilledViber.vue";
import IconFilledWhatsapp from "@/components/icons/IconFilledWhatsapp.vue";
import IconFilledTelegram from "@/components/icons/IconFilledTelegram.vue";

import Social from "@/components/Social.vue";
import Map from "@/components/Map.vue";

import Button from "@/components/Button.vue";

const props = defineProps({
  contacts: {
    type: Object,
    required: true,
  },
});

const copied = ref(false);

const copy = (data) => {
  navigator.clipboard.writeText(data);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 1000);
};

const getIcon = (name) => {
  switch (name) {
    case "telegram":
      return IconFilledTelegram;

    case "whatsapp":
      return IconFilledWhatsapp;

    case "viber":
      return IconFilledViber;
  }
};

const socials = props.contacts.socials.filter(
  (el) => el.type !== "phone" && el.type !== "secondPhone"
);

const phone = props.contacts.socials.find((social) => social.type === "phone");
const secondPhone = props.contacts.socials.find(
  (social) => social.type === "secondPhone"
);
</script>

<template>
  <div class="event-contacts">
    <h2 class="event-contacts__title text-h1">{{ $t("titles.contacts") }}</h2>
    <div class="event-contacts__all event-contacts__all--more">
      <a class="event-contacts__phone" :href="phone.href">
        <Icon :name="secondPhone ? IconSmartphone : IconPhone" :size="24" />
        <div class="social__info">
          <span class="text-comment-small">
            {{ $t("telephone") }}
          </span>
          <p
            class="text-main social__text"
            :class="phone.status === 'blur' ? 'blur' : ''"
          >
            {{ phone.text }}
            <Icon
              v-if="phone.messenger"
              v-for="social in phone.messenger"
              :key="social"
              :size="14"
              :name="getIcon(social)"
              :status="social.status"
            />
          </p>
        </div>
      </a>
      <div>
        <a
          v-if="secondPhone"
          class="event-contacts__phone"
          :href="secondPhone.href"
        >
          <Icon :name="IconPhone" :size="24" />
          <div class="social__info">
            <span class="text-comment-small">
              {{ $t("telephoneSecond") }}
            </span>
            <p
              class="text-main social__text"
              :class="secondPhone.status === 'blur' ? 'blur' : ''"
            >
              {{ secondPhone.text }}
            </p>
          </div>
        </a>
      </div>
      <Social
        v-for="(item, i) in socials"
        :key="i"
        :type="item.type"
        :iconSize="24"
        :link="item.href"
        :status="item.status"
        :text="item.text"
      />
    </div>
    <div
      class="event-contacts__location"
      v-if="contacts.location"
      @click="copy(contacts.location.address)"
    >
      <Transition name="fade-slide-up">
        <div class="tooltip text-main-small" v-if="copied">
          {{ $t("copy") }}
        </div>
      </Transition>
      <Icon :name="IconMap" :size="24" />
      <div class="event-contacts__location--item">
        <span class="text-comment-small">
          {{ $t("event.eventLocation") }}
        </span>
        <address
          class="location--font text-button"
          :class="contacts.location.status === 'blur' ? 'blur' : ''"
        >
          {{ contacts.location.address }}
        </address>
      </div>
    </div>
    <div
      class="map-wrapper"
      :class="contacts.location.status === 'blur' ? 'blur' : ''"
    >
      <Map
        width="100%"
        height="200px"
        :zoom="16"
        :center="contacts.location.geo"
        :marker="contacts.location.geo"
        :title="contacts.location.address"
      />
    </div>
    <div class="event-contacts__actions">
      <Button
        class="event-contacts__actions--button"
        type="primary"
        :text="$t('event.share')"
      />
      <Button
        class="event-contacts__actions--button"
        type="secondary"
        :text="$t('event.register')"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  &__title {
    display: flex;
    align-items: center;
    white-space: nowrap;
    gap: 20px;
  }
}

.social {
  display: flex;
  column-gap: 20px;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  &__info {
    display: flex;
    flex-direction: column;
    gap: 5px;
    position: relative;
  }
  &__text {
    display: flex;
    align-items: center;
    gap: 15px;
  }
}
.event-contacts {
  display: flex;
  flex-direction: column;
  &__phone {
    display: flex;
    align-items: center;
    column-gap: 20px;
    text-decoration: none;
    cursor: pointer;
  }
  &__location {
    margin-top: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    column-gap: 20px;
    &--item {
      display: flex;
      flex-direction: column;
      row-gap: 5px;
    }
  }
  &__all {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
    width: 100%;
    &--more {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      justify-content: space-between;
      @include screen(767.98px) {
        display: flex;
        flex-direction: column;
      }
    }
  }
  &__row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px 0;
  }
  &__actions {
    margin-top: 20px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &--button {
      width: 210px;
      display: block;
      font-family: Montserrat;
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      @include screen(767.98px) {
        width: 100%;
        font-size: 14px;
        line-height: 17px;
      }
    }
    @include screen(767.98px) {
      padding: 0;
      flex-direction: column;
      row-gap: 20px;
    }
  }
}
.contacts-wrapper {
  margin-top: 15px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: start;
  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 20px;
    &__data {
      display: flex;
      flex-direction: column;
      row-gap: 5px;
    }
  }
}
.location {
  &--font {
    text-decoration: none;
    font-style: normal;
  }
}
.map-wrapper {
  margin-top: 20px;
  height: 200px;
}

.tooltip {
  padding: 10px 20px;
  background-color: var(--color-dynamic-white);
  border-radius: 20px 20px 30px 0px;
  border: 1px solid rgba(var(--color-dynamic-gray), 0.1);
  box-shadow: 0px 12px 10px 0px rgba(0, 0, 0, 0.04);
  font-size: 12px;
  font-family: "Inter";
  font-weight: 500;
  letter-spacing: 0.12px;
  color: var(--color-dynamic-gray);
  position: absolute;
  padding: 4px 8px;
  z-index: 1;
  left: 50%;
  transform: translate(-50%, -120%);
}

.fade-slide-up-enter-active,
.fade-slide-up-leave-active {
  transition: all 0.25s ease-out;
}
.fade-slide-up-enter-from {
  opacity: 0;
  transform: translate(-50%, 0%);
}
.fade-slide-up-leave-to {
  opacity: 0;
  transform: translate(-50%, 0%);
}
</style>
