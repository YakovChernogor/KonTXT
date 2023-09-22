<script setup>
import { ref, computed, watch, reactive } from "vue";
import Icon from "../components/Icon.vue";
import IconChevron from "../components/icons/IconChevron.vue";
import IconVerify from "../components/icons/IconVerify.vue";
import Avatar from "../components/Avatar.vue";
import InterestsList from "../components/InterestsList.vue";
import Button from "../components/Button.vue";
import AchivementList from "../components/AchivementList.vue";
import { useUserStore } from "@/stores/user";
import Karma from "../components/Karma.vue";
import Reputation from "../components/Reputation.vue";
import Donars from "../components/Donars.vue";
import Info from "../components/Info.vue";
import { useRoute } from "vue-router";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper";
const modules = [Navigation];

import "swiper/css";
import "swiper/css/navigation";

import Users from "../database/users.js";
import KarmaSlider from "../components/KarmaSlider.vue";
import Sertificate from "../components/Sertificate.vue";
import Project from "../components/Project.vue";
import VideoReview from "../components/VideoReview.vue";
import Review from "../components/Review.vue";
import Work from "../components/Work.vue";
import Modal from "../components/Modal.vue";
import ActionModalBar from "../components/ActionModalBar.vue";
import Login from "../components/Login.vue";
import ReputationBubbles from "../components/ReputationBubbles.vue";
import UserHeader from "../components/UserHeader.vue";

const route = useRoute();
const id = computed(() => route.params.id);

const userStore = useUserStore();
const userInfo = computed(() => {
  if (id.value) {
    return Users[id.value];
  } else return userStore.userInfo;
});

const isAuth = computed(() => userStore.isAuth);
const testedKarma = ref(userInfo.value.karma);

const currentReview = ref(1);
const prevReview = ref(null);
const nextReview = ref(null);

const currentVideoReview = ref(1);
const prevVideoReview = ref(null);
const nextVideoReview = ref(null);

const modals = ref({
  project: false,
  works: false,
  sertificate: false,
  videoReview: false,
  videoReviewOnly: false,
  review: false,
  login: false,
});
const onlyReview = ref({
  id: "000001",
  src: null,
  round: false,
});

const getSrc = (src) =>
  new URL(`/src/assets/images/${src}`, import.meta.url).href;
const currentReputationListId = ref(null);
const currentReputationList = ref(null);
const currentReputationListAll = ref(null);

watch(currentReputationListId, () => {
  if (currentReputationListId.value === null) {
    currentReputationList.value = null;
  } else {
    currentReputationList.value =
      userInfo.value.reputationInfo[
        Object.keys(userInfo.value.reputationInfo)[
          currentReputationListId.value
        ]
      ];
  }
});
watch(currentReputationList, () => {
  if (currentReputationList.value === null) {
    currentReputationListAll.value = null;
    return;
  } else if (currentReputationList.value.length > 0) {
    currentReputationListAll.value = currentReputationList.value.reduce(
      (a, b) => {
        if (a.value) {
          return a.value + b.value;
        } else {
          return a + b.value;
        }
      }
    );
  } else {
    currentReputationListAll.value = 0;
  }
});

const sertificateImgs = computed(() => {
  return userInfo.value.sertificates.value
    .filter((img, i) => i < 4)
    .map((img) => {
      return { src: getSrc(img.src), title: img.title };
    });
});
const sertificateState = reactive({
  visible: false,
  index: 0,
});

const sertificateZoom = (i) => {
  sertificateState.visible = true;
  sertificateState.index = i;
};

const windowWidth = ref(window.innerWidth);
window.addEventListener("resize", () => {
  windowWidth.value = window.innerWidth;
});

import { definePerson, useSchemaOrg, defineWebPage } from "@vueuse/schema-org";

useSchemaOrg([
  definePerson({
    name: userInfo.value.name,
    image: getSrc(userInfo.value.src),
    address: userInfo.value.address,
    jobTitle: userInfo.value.job,
    description: userInfo.value.description,
    worksFor: userInfo.value.company,
  }),
]);
</script>

<template>
  <main class="user">
    <UserHeader />
    <div class="user__content">
      <div class="user-controlls user-controlls--mobile" v-if="isAuth">
        <Button class="user-controlls__button" :text="$t('button.write')" />
        <Button
          class="user-controlls__button"
          type="secondary"
          :text="$t('button.save')"
        />
      </div>
      <div class="user-noauth" v-if="!isAuth">
        <p class="text-main user-noauth__text">
          {{ $t("noAuth") }}
        </p>
        <Button
          class="user-noauth__button"
          @click="modals.login = true"
          type="secondary"
          :text="$t('button.logIn')"
        />
        <Login :open="modals.login" @close="modals.login = false" />
      </div>
      <template v-if="isAuth">
        <div class="user-karma">
          <p class="user-karma__title text-h1">
            {{ $t("karma") }} <Info :text="$t('info.karma')" />
          </p>
          <div class="user-karma__row">
            <p
              class="user-karma__text text-comment"
              v-if="testedKarma.value > 0"
            >
              {{ $t("karmaDesc.positive", { value: `${testedKarma.value}` }) }}
            </p>
            <p
              class="user-karma__text text-comment"
              v-else-if="testedKarma.value === 0"
            >
              {{ $t("karmaDesc.neutral") }}
            </p>
            <p class="user-karma__text text-comment" v-else>
              {{
                $t("karmaDesc.negative", {
                  value: testedKarma.value,
                  valueb: -testedKarma.value,
                })
              }}
            </p>
            <KarmaSlider
              @tested="testedKarma.value = $event"
              class="user-karma__slider"
              :value="userInfo.karma.value"
            />
          </div>
        </div>
        <div class="user-reputation" v-if="userInfo.reputationInfo">
          <p class="user-reputation__title text-h1">
            {{ $t("reputation") }} <Info :text="$t('info.reputation')" />
          </p>
          <div class="user-reputation__row">
            <ReputationBubbles
              @getList="
                (n) => (currentReputationListId = n === null ? null : n - 1)
              "
              :value="userInfo.reputationInfo"
              :reputation="userInfo.reputation.value"
            />
            <div
              class="user-reputation__col"
              v-if="currentReputationListId !== null"
            >
              <p class="user-reputation__list-title text-main">
                {{
                  $t(
                    `reputationChart.${
                      Object.keys(userInfo.reputationInfo)[
                        currentReputationListId
                      ]
                    }`
                  )
                }}
                <Reputation :value="currentReputationListAll" bubble />
              </p>
              <ul class="user-reputation__list">
                <li
                  class="user-reputation__item text-comment"
                  v-for="(item, i) in currentReputationList"
                  :key="i"
                >
                  {{ item.title }} +{{ item.value }}
                </li>
              </ul>
            </div>
            <div class="user-reputation__col" v-else>
              <p
                class="user-reputation__text text-comment"
                v-if="testedKarma > 0"
              >
                {{ $t("karmaDesc.static.positive") }}
              </p>
              <p
                class="user-reputation__text text-comment"
                v-else-if="testedKarma === 0"
              >
                {{ $t("karmaDesc.static.neutral") }}
              </p>
              <p class="user-reputation__text text-comment" v-else>
                {{ $t("karmaDesc.static.negative") }}
              </p>
            </div>
          </div>
        </div>
        <div
          class="user-content"
          v-if="
            userInfo.groups.value.length > 0 &&
            userInfo.groups.status !== 'hidden'
          "
        >
          <p class="user-content__title text-h1">
            {{ $t("titles.communities") }}
          </p>
          <InterestsList
            :interests="userInfo.groups.value"
            :status="userInfo.groups.status"
          />
        </div>
        <div
          class="user-content"
          v-if="
            userInfo.events.value.length > 0 &&
            userInfo.events.status !== 'hidden'
          "
        >
          <p class="user-content__title text-h1">{{ $t("titles.events") }}</p>
          <InterestsList
            :interests="userInfo.events.value"
            :status="userInfo.events.status"
          />
        </div>
        <div
          class="user-content"
          v-if="
            userInfo.reviews.value.length > 0 &&
            userInfo.reviews.status !== 'hidden'
          "
        >
          <p class="user-content__title text-h1">
            {{ $t("titles.reviews") }}
            <span class="text-comment-small">{{
              currentReview + " / " + userInfo.reviews.value.length
            }}</span>
          </p>
          <div
            class="review-wrapper"
            :class="
              userInfo.reviews.status === 'blur' ? 'review-wrapper--blur' : ''
            "
          >
            <button class="review__button" ref="prevReview">
              <Icon :name="IconChevron" :size="24" />
            </button>
            <swiper
              :slides-per-view="1"
              loop
              :modules="modules"
              :navigation="{
                prevEl: prevReview,
                nextEl: nextReview,
              }"
              space-between="16"
              @slideChange="currentReview = $event.realIndex + 1"
            >
              <swiper-slide
                v-for="{ text, id } in userInfo.reviews.value"
                :key="id"
              >
                <Review
                  :review="Users[id]"
                  :text="text"
                  :status="userInfo.reviews.status"
                />
              </swiper-slide>
            </swiper>
            <button
              class="review__button review__button--next"
              ref="nextReview"
            >
              <Icon :name="IconChevron" :size="24" />
            </button>
          </div>
          <Button
            :text="$t('button.more')"
            v-if="userInfo.reviews.status === 'visible'"
            @click="modals.review = true"
            class="user-content__more"
          />
        </div>
        <div
          class="user-content"
          v-if="
            userInfo.videoReviews.value.length > 0 &&
            userInfo.videoReviews.status !== 'hidden'
          "
        >
          <p class="user-content__title text-h1">
            {{ $t("titles.videoReviews") }}
            <span class="text-comment-small">{{
              currentVideoReview + " / " + userInfo.videoReviews.value.length
            }}</span>
          </p>
          <div
            class="review-wrapper review-wrapper--video"
            :class="
              userInfo.videoReviews.status === 'blur'
                ? 'review-wrapper--blur'
                : ''
            "
          >
            <button
              class="review__button review__button--video"
              ref="prevVideoReview"
            >
              <Icon :name="IconChevron" :size="24" />
            </button>
            <swiper
              :slides-per-view="
                userInfo.videoReviews.value.length < 2 ? speakers.length : 2
              "
              :modules="modules"
              :navigation="{
                prevEl: prevVideoReview,
                nextEl: nextVideoReview,
              }"
              :breakpoints="{
                767.98: {
                  slidesPerView:
                    userInfo.videoReviews.value.length < 3
                      ? speakers.length
                      : 3,
                },
              }"
              space-between="30"
              @slideChange="currentVideoReview = $event.realIndex + 1"
            >
              <swiper-slide
                v-for="{ id, src, round } in userInfo.videoReviews.value"
                :key="id"
              >
                <VideoReview
                  :review="Users[id]"
                  :src="src"
                  :round="round"
                  @click="
                    modals.videoReviewOnly = true;
                    onlyReview.id = id;
                    onlyReview.src = src;
                    onlyReview.round = round;
                  "
                />
              </swiper-slide>
            </swiper>
            <button
              class="review__button review__button--video review__button--next"
              ref="nextVideoReview"
            >
              <Icon :name="IconChevron" :size="24" />
            </button>
          </div>
          <Button
            :text="$t('button.more')"
            v-if="userInfo.videoReviews.status === 'visible'"
            @click="modals.videoReview = true"
            class="user-content__more"
          />
        </div>
        <div
          class="user-content"
          v-if="
            userInfo.sertificates.value.length > 0 &&
            userInfo.sertificates.status !== 'hidden'
          "
        >
          <p
            class="user-content__title user-content__title--sertificates text-h1"
          >
            {{ $t("titles.sertificates") }}
            <span class="text-comment-small">{{
              "4 / " + userInfo.sertificates.value.length
            }}</span>
          </p>
          <div
            class="sertificates"
            :class="
              userInfo.sertificates.status === 'blur'
                ? 'sertificates--blur'
                : ''
            "
          >
            <template v-for="item in userInfo.sertificates.value.slice(0, 6)">
              <Sertificate
                :sertificate="item"
                :style="{ height: `${item.height}px` }"
                grid
                @click="sertificateZoom(index)"
              />
            </template>
          </div>
          <Button
            :text="$t('button.more')"
            v-if="userInfo.sertificates.status === 'visible'"
            @click="modals.sertificate = true"
            class="user-content__more"
          />
        </div>
        <div
          class="user-content"
          v-if="
            userInfo.projects.value.length > 0 &&
            userInfo.projects.status !== 'hidden'
          "
        >
          <p class="user-content__title text-h1">
            {{ $t("titles.projects") }}
            <span class="text-comment-small">{{
              "2 / " + userInfo.projects.value.length
            }}</span>
          </p>
          <div class="user-content__projects">
            <template
              v-for="(project, i) in userInfo.projects.value.slice(0, 2)"
              :key="i"
            >
              <Project :project="project" :status="userInfo.projects.status" />
            </template>
          </div>
          <Button
            :text="$t('button.more')"
            v-if="userInfo.projects.status === 'visible'"
            @click="modals.project = true"
            class="user-content__more"
          />
        </div>
        <div
          class="user-content"
          v-if="
            userInfo.works.value.length > 0 &&
            userInfo.works.status !== 'hidden'
          "
        >
          <p class="user-content__title text-h1">
            {{ $t("titles.workExperience") }}
            <span class="text-comment-small">{{
              "2 / " + userInfo.works.value.length
            }}</span>
          </p>
          <div class="user-content__projects user-content__projects--works">
            <template
              v-for="(work, i) in userInfo.works.value.slice(0, 2)"
              :key="i"
            >
              <Work :work="work" :status="userInfo.works.status" />
            </template>
          </div>
          <Button
            v-if="userInfo.works.status === 'visible'"
            :text="$t('button.more')"
            @click="modals.works = true"
            class="user-content__more"
          />
        </div>
        <div class="user-controlls user-controlls--footer">
          <Button
            class="user-controlls__button"
            type="secondary"
            :text="$t('button.savetophone')"
            v-if="isAuth"
          />
        </div>

        <Modal :open="modals.review" @close="modals.review = false">
          <div class="modal__header">
            <p class="user-content__title text-h1">
              {{ $t("titles.reviews") }}
            </p>
            <ActionModalBar search filter plus />
          </div>
          <div class="modal__content user-content__projects">
            <template v-for="{ text, id } in userInfo.reviews.value" :key="id">
              <Review full :review="Users[id]" :text="text" />
            </template>
          </div>
        </Modal>
        <Modal :open="modals.videoReview" @close="modals.videoReview = false">
          <div class="modal__header">
            <p class="user-content__title text-h1">
              {{ $t("titles.videoReviews") }}
            </p>
            <ActionModalBar search filter plus />
          </div>
          <div class="modal__content user-content__projects">
            <template
              v-for="{ id, src, round } in userInfo.videoReviews.value"
              :key="id"
            >
              <VideoReview
                full
                :review="Users[id]"
                :src="src"
                :round="round"
                @openOnly="
                  () => {
                    modals.videoReview = false;
                    modals.videoReviewOnly = true;
                  }
                "
              />
            </template>
          </div>
        </Modal>
        <Modal
          :open="modals.videoReviewOnly"
          review
          @close="modals.videoReviewOnly = false"
        >
          <div class="modal__header">
            <p class="user-content__title text-h1">
              {{ $t("titles.videoReviews") }}
            </p>
            <ActionModalBar plus />
          </div>
          <div
            class="modal__content modal__content--nonline user-content__projects"
          >
            <VideoReview
              full
              :review="Users[onlyReview.id]"
              :src="onlyReview.src"
              :round="onlyReview.round"
            />
          </div>
        </Modal>
        <Modal :open="modals.sertificate" @close="modals.sertificate = false">
          <div class="modal__header">
            <p class="user-content__title text-h1">
              {{ $t("titles.sertificates") }}
            </p>
          </div>
          <div class="modal__content user-content__sertificates">
            <div class="user-content__sertificates-col">
              <template
                v-for="(sertificate, i) in userInfo.sertificates.value"
                :key="i"
              >
                <Sertificate :sertificate="sertificate" />
              </template>
            </div>
            <div class="user-content__sertificates-col">
              <template
                v-for="(sertificate, i) in userInfo.sertificates.value"
                :key="i"
              >
                <Sertificate :sertificate="sertificate" v-if="i % 2 === 0" />
              </template>
            </div>
            <div class="user-content__sertificates-col">
              <template
                v-for="(sertificate, i) in userInfo.sertificates.value"
                :key="i"
              >
                <Sertificate :sertificate="sertificate" v-if="i % 2 !== 0" />
              </template>
            </div>
          </div>
        </Modal>
        <Modal :open="modals.project" @close="modals.project = false">
          <div class="modal__header">
            <p class="user-content__title text-h1">
              {{ $t("titles.projects") }}
            </p>
            <ActionModalBar search filter plus />
          </div>
          <div class="modal__content user-content__projects">
            <template v-for="(project, i) in userInfo.projects.value" :key="i">
              <Project :project="project" />
            </template>
          </div>
        </Modal>
        <Modal :open="modals.works" @close="modals.works = false">
          <div class="modal__header">
            <p class="user-content__title text-h1">
              {{ $t("titles.workExperience") }}
            </p>
            <ActionModalBar search filter plus />
          </div>
          <div class="modal__content user-content__projects">
            <template v-for="(work, i) in userInfo.works.value" :key="i">
              <Work :work="work" nonline />
            </template>
          </div>
        </Modal>

        <vue-easy-lightbox
          :visible="sertificateState.visible"
          :index="sertificateState.index"
          :imgs="sertificateImgs"
          @hide="sertificateState.visible = false"
        ></vue-easy-lightbox>
      </template>
    </div>
  </main>
</template>

<style scoped lang="scss">
.user-controlls {
  display: flex;
  gap: 20px 40px;
  align-items: center;
  flex-wrap: wrap;
  &__button {
    width: 100%;
  }
  &--mobile {
    display: none;
  }
  &--footer {
    .user-controlls__button {
      max-width: 100%;
      width: auto;
      flex-grow: 1;
      min-width: 200px;
      &:first-child:last-child {
        width: 100%;
        max-width: 220px;
      }
    }
  }
  @include screen(767.98px) {
    display: none;
    &__button {
      max-width: 100%;
      &--pc {
        display: none;
      }
    }
    &--mobile,
    &--footer {
      display: flex;
      flex-direction: column;
      .user-controlls__button {
        &:first-child:last-child {
          max-width: 100%;
        }
      }
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
  }
  &__content {
    overflow: auto;
    height: calc(100% - 67px);
    &::-webkit-scrollbar {
      display: none;
      opacity: 0;
      width: 0;
      height: 0;
    }
    &:not(&--nonline) > * {
      position: relative;
      padding-bottom: 40px;
      &::after {
        content: "";
        position: absolute;
        width: 82%;
        height: 1px;
        background-color: var(--color-dynamic-gray);
        bottom: 0;
        left: 50%;
        transform: translate(-50%);
      }
    }
  }
  @include screen(767.98px) {
    &__content {
      & > * {
        padding-bottom: 20px;
        &::after {
          display: none;
        }
      }
    }
  }
}
.user {
  margin-top: 45px;
  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    &--mobile {
      display: none;
    }
  }

  &__content {
    margin-top: 70px;
    display: flex;
    flex-direction: column;
    gap: 60px;
  }

  @include screen(767.98px) {
    &__header {
      display: none;
      &--mobile {
        display: flex;
        margin-top: 20px;
      }
    }
    &__content {
      gap: 40px;
      margin-top: 40px;
    }
  }
}

.review-wrapper {
  display: flex;
  gap: 46px;
  align-items: start;
  &--video {
    gap: 12px;
  }
  &--blur {
    .swiper {
      filter: blur(7px);
      pointer-events: none;
      user-select: none;
    }
  }
  @include screen(767.98px) {
    gap: 20px;
    &--video {
      gap: 16px;
    }
  }
}

.review {
  &__button {
    margin-top: 10px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    &--next {
      transform: rotate(180deg);
    }
    &--video {
      margin-top: 52px;
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
      &--video {
        margin-top: 41px;
      }
    }
  }
}

.user-info {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  &__column {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 218px;
    width: 100%;
    position: relative;
  }
  &__item {
    display: flex;
    gap: 76px;
    &--donars {
      width: 100%;
      flex-direction: column;
      gap: 10px;
    }
  }
  &__footer {
    display: flex;
    gap: 20px;
    align-items: flex-end;
  }
  &__button {
    cursor: pointer;
  }
  &__title {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  @include screen(767.98px) {
    align-items: center;
    flex-direction: column;
    margin-top: 30px;
    &__avatar {
      width: 225px;
      height: 225px;
    }
    &__column {
      max-width: 100%;
      margin-top: 30px;
      align-items: center;
      gap: 10px;
    }
    &__item {
      &--donars {
        margin-top: 30px;
      }
    }
    &__footer {
      margin-top: 10px;
    }
    &__id {
      display: none;
    }
  }
}
.user-noauth {
  display: flex;
  gap: 40px 20px;
  align-items: center;
  &__text {
    color: #898989;
  }
  @include screen(767.98px) {
    flex-direction: column;
    margin-top: 20px;
    &__text {
      padding: 0px 7px;
    }
  }
}

.user-reputation {
  display: flex;
  flex-direction: column;
  gap: 20px;
  &__item {
    font-family: "Montserrat";
    font-size: 10px;
  }
  &__row {
    display: flex;
    gap: 20px 40px;
    justify-content: space-between;
    flex-wrap: wrap-reverse;
    align-items: center;
  }
  &__text {
    max-width: 307px;
    font-family: "Montserrat";
    user-select: none;
    font-size: 10px;
  }
  &__col {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 10px;
    max-width: calc(100% - 368px);
  }
  &__title {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  &__list-title {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 12px;
  }
  &__list {
    list-style: none;
  }

  @include screen(1199.98px) {
    &__col {
      max-width: 198px;
      width: 100%;
    }
    &__row {
      justify-content: center;
      column-gap: 34px;
    }
    &__list-title {
      font-size: 14px;
    }
    &__item {
      font-size: 12px;
    }
    &__text {
      font-size: 12px;
    }
  }
  @include screen(767.98px) {
    &__col {
      max-width: 100%;
    }
    &__text {
      max-width: 100%;
      width: 100%;
    }
  }
}
.user-karma {
  display: flex;
  flex-direction: column;
  gap: 20px;
  &__row {
    display: flex;
    gap: 20px 28px;
    flex-wrap: wrap;
    justify-content: center;
  }
  &__slider {
    max-width: 298px;
    width: 100%;
  }
  &__text {
    font-family: "Montserrat";
    max-width: 197px;
    user-select: none;
    font-size: 10px;
  }
  &__title {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  @include screen(1199.98px) {
    &__text {
      font-size: 12px;
    }
  }
  @include screen(767.98px) {
    &__text,
    &__slider {
      max-width: 100%;
      width: 100%;
    }
  }
}

.user-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  &__title {
    display: flex;
    align-items: center;
    white-space: nowrap;
    gap: 20px;
    @include screen(767.98px) {
      &--sertificates {
        span {
          display: none;
        }
      }
    }
  }
  &__more {
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
  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: masonry;
    gap: 10px;
    div:nth-child(1) {
      grid-area: a;
    }
    div:nth-child(2) {
      grid-area: b;
    }
    div:nth-child(3) {
      grid-area: c;
    }
    div:nth-child(4) {
      grid-area: d;
    }
    @include screen(1199.98px) {
      grid-template-columns: repeat(2, 1fr);
      grid-template-areas: "a b" "a c";
      div:nth-child(4) {
        display: none;
      }
    }
    @include screen(767.98px) {
      grid-template-columns: repeat(2, calc(50% - 14px));
      gap: 14px;
    }
  }
  &__projects {
    display: flex;
    flex-direction: column;
    gap: 35px;
  }
  &__sertificates {
    display: flex;
    gap: 20px;
    justify-content: center;
    &-col {
      display: flex;
      flex-direction: column;
      gap: 20px;
      &:first-child {
        display: none;
      }
    }
  }
  @include screen(767.98px) {
    &__projects {
      gap: 0;
      &--works {
        gap: 35px;
      }
    }
    &__sertificates {
      &-col {
        &:first-child {
          display: flex;
        }
        &:not(&:first-child) {
          display: none;
        }
      }
    }
  }
}

.sertificates {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 120px);
  gap: 8px;
  grid-template-areas: "a b c" "a d c" "e d f";
  *:nth-child(1) {
    grid-area: a;
  }
  *:nth-child(2) {
    grid-area: b;
  }
  *:nth-child(3) {
    grid-area: c;
  }
  *:nth-child(4) {
    grid-area: d;
  }
  *:nth-child(5) {
    grid-area: e;
  }
  *:nth-child(6) {
    grid-area: f;
  }
  &--blur {
    filter: blur(7px);
    user-select: none;
    pointer-events: none;
  }
  @include screen(767.98px) {
    grid-template-rows: repeat(4, 120px);
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas: "a b" "a c" "d e" "f e";
  }
}
</style>
