<template>
  <v-app>
    <div class="tw-min-h-screen tw-w-full">
      <navbar />
      <div class="tw-w-screen tw-h-screen">
        <img
          class="tw-w-full tw-h-full tw-object-cover"
          :src="background"
          alt="background"
        />
      </div>
      <div class="tw-w-full tw-bg-dark-9 tw-h-screen">
        <div
          class="tw-container tw-mx-auto tw-flex tw-flex-col tw-items-start tw-justify-start tw-py-12 tw-gap-12 tw-px-[3.75rem]"
        >
          <div class="tw-flex tw-flex-row tw-items-center tw-justify-between">
            <v-tabs
              v-model="tab"
              class="!tw-bg-transparent tw-rounded-lg tw-p-2 md:!tw-w-fit"
              slider-color="transparent"
              background-color="transparent"
              @change="tabChanged"
            >
              <v-tab
                v-for="(tab, index) in tabs"
                :key="tab"
                :ripple="false"
                class="!tw-text-white tw-rounded-md tw-py-2 tw-px-4 !tw-capitalize !tw-text-xl !tw-font-normal tw-transition-all tw-duration-200 tw-ease-linear tw-border-solid tw-border tw-border-transparent"
                :class="{ 'tw-ml-3': index !== 0 }"
              >
                {{ tab }}
              </v-tab>
            </v-tabs>
          </div>
          <div class="tw-w-full" ref="tab">
            <Nuxt />
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>
<script>
import background from "@/assets/img/bg.png";
export default {
  data() {
    return {
      tab: 0,
      tabs: ["Leasing", "Offer", "Borrow", "Loan"],
      background,
    };
  },
  async mounted() {
    if (process.client) {
      if (localStorage.getItem("wallet")) {
        const wallet = JSON.parse(localStorage.getItem("wallet"));

        if (wallet) {
          await this.$store.dispatch("wallet/connectWallet", wallet.name);
        }
      }
    }
  },
  methods: {
    tabChanged() {
      switch (this.tab) {
        case 0:
          //this.$router.push("/live-auction");
          break;
        case 1:
          // this.$router.push("/past-auction");
          break;
        case 2:
          // this.$router.push("/past-auction");
          break;
        case 3:
          // this.$router.push("/past-auction");
          break;
        default:
          this.$router.push("/");
          break;
      }
    },
  },
  computed: {
    path() {
      return this.$route.fullPath;
    },
  },
  watch: {
    path() {
      setTimeout(() => {
        this.$refs.tab.scrollIntoView({ behavior: "smooth" });
      }, 50);
    },
  },
};
</script>
<style scoped>
.v-tab--active {
  @apply !tw-border-white !tw-font-medium;
}

.v-tab--active:hover {
  @apply !tw-border-white !tw-font-medium;
}

.v-tab:hover {
  background-color: transparent;
}

.v-tab:hover::before {
  opacity: 0 !important;
}

.v-tab:focus::before {
  opacity: 0 !important;
}

::v-deep .v-slide-group__prev--disabled {
  display: none !important;
}
</style>
