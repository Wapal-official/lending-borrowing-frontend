<template>
  <div
    class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-rounded-lg"
  >
    <img
      :src="collection.image"
      alt="image"
      class="tw-max-h-[312px] tw-w-full tw-object-cover tw-rounded-t-lg"
      height="312px"
    />
    <div
      class="tw-py-3 tw-flex tw-flex-col tw-items-start tw-justify-start tw-border-dark-6 tw-border-solid tw-border-l tw-border-r tw-border-b tw-rounded-b-lg tw-w-full"
    >
      <div
        class="tw-w-full tw-py-3 tw-flex tw-flex-col tw-items-start tw-justify-start tw-px-4 tw-gap-3"
      >
        <div
          class="tw-text-lg tw-font-bold tw-flex tw-flex-row tw-items-baseline tw-justify-start tw-gap-1"
        >
          <h3>{{ collection.collection_name }}</h3>
          <i class="bx bxs-badge-check tw-text-primary"></i>
        </div>
        <div
          class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between"
        >
          <span class="tw-text-sm tw-font-semibold tw-text-dark-2 tw-uppercase"
            >Rent Now</span
          >
          <div
            class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-1"
          >
            <span>{{ collection.best_offer }}</span> <img :src="aptIcon" />
          </div>
        </div>
      </div>
      <div class="tw-px-4 tw-w-full tw-flex tw-flex-col tw-gap-4">
        <button
          class="tw-w-full tw-py-2 tw-bg-dark-transparent tw-text-primary tw-flex tw-flex-row tw-items-center tw-justify-center tw-rounded tw-transition-all tw-duration-150 tw-ease-linear hover:tw-bg-dark-6/50"
          @click="showMore = !showMore"
        >
          <span> More Info </span>
          <i class="bx bx-chevron-down tw-pl-1 tw-text-lg" v-if="!showMore"></i>
          <i class="bx bx-chevron-up tw-pl-1 tw-text-lg" v-else></i>
        </button>

        <div
          class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4"
          v-if="showMore"
        >
          <div
            class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between"
          >
            <span
              class="tw-text-sm tw-font-semibold tw-text-dark-2 tw-uppercase"
              >Address</span
            >
            <span>{{ address }}</span>
          </div>
          <div
            class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between"
          >
            <span
              class="tw-text-sm tw-font-semibold tw-text-dark-2 tw-uppercase"
              >Token Id</span
            >
            <span>{{ address }}</span>
          </div>
          <div
            class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between"
          >
            <span
              class="tw-text-sm tw-font-semibold tw-text-dark-2 tw-uppercase"
              >Max Duration (Days)</span
            >
            <span>{{ collection.duration }}</span>
          </div>
          <div
            class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between"
          >
            <span
              class="tw-text-sm tw-font-semibold tw-text-dark-2 tw-uppercase"
              >Daily Rent Price</span
            >
            <div
              class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-1"
            >
              <span>{{ collection.best_offer }}</span> <img :src="aptIcon" />
            </div>
          </div>
          <div
            class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between"
          >
            <span
              class="tw-text-sm tw-font-semibold tw-text-dark-2 tw-uppercase"
              >Collateral</span
            >
            <div
              class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-1"
            >
              <span>{{ collection.best_offer }}</span> <img :src="aptIcon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import aptIcon from "@/assets/img/apt-icon.svg";
export default {
  props: { collection: { type: Object } },
  data() {
    return {
      showMore: false,
      aptIcon,
    };
  },
  computed: {
    address() {
      return (
        this.collection.lender.substring(0, 7) +
        "..." +
        this.collection.lender.substring(
          this.collection.lender.length - 3,
          this.collection.lender.length
        )
      );
    },
  },
};
</script>
