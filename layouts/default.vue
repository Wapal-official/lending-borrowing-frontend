<template>
  <v-app>
    <div class="tw-w-full">
      <navbar />
      <div class="tw-w-screen tw-h-screen">
        <img
          class="tw-w-full tw-h-full tw-object-cover"
          :src="background"
          alt="background"
        />
      </div>
      <div class="tw-w-full tw-bg-dark-9">
        <div
          class="tw-container tw-mx-auto tw-flex tw-flex-col tw-items-start tw-justify-start tw-py-12 tw-gap-12 tw-px-[3.75rem]"
        >
          <div
            class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start md:tw-flex-row md:tw-items-center md:tw-justify-between"
          >
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
                class="!tw-text-white !tw-tracking-normal tw-rounded-full tw-max-h-[40px] tw-min-h-[40px] tw-py-[0.62rem] tw-px-4 !tw-capitalize !tw-text-sm !tw-font-normal tw-transition-all tw-duration-200 tw-ease-linear tw-border-solid tw-border tw-border-dark-6"
                :class="{
                  'tw-ml-3': index !== 0,
                  '!tw-border-none !tw-px-0 !tw-py-0 !tw-w-fit': tab === '/',
                }"
              >
                {{ tab }}
              </v-tab>
            </v-tabs>
            <div class="tw-w-full tw-flex md:tw-flex-row md:tw-justify-end">
              <button-primary text="Notify Me!" :secondary="true">
                <template #prepend-icon>
                  <i
                    class="bx bxs-bell !tw-text-xl tw-text-primary tw-pr-[0.62rem]"
                  ></i>
                </template>
              </button-primary>
            </div>
          </div>
          <div class="tw-w-full" ref="tab">
            <Nuxt />
          </div>
        </div>
      </div>
    </div>
    <toast />
  </v-app>
</template>
<script>
import background from "@/assets/img/bg.png";
export default {
  data() {
    return {
      tab: 0,
      tabs: ["Lend", "Lease", "Offer", "/", "Borrow", "Loan"],
      background,
    };
  },
  async mounted() {
    if (this.$route.path === "/") {
      this.tab = 0;
    } else if (this.$route.path === "/lease") {
      this.tab = 1;
    } else if (this.$route.path === "/offer") {
      this.tab = 2;
    } else if (this.$route.path === "/borrow") {
      this.tab = 4;
    } else if (this.$route.path === "/loan") {
      this.tab = 5;
    } else {
      this.tab = 0;
    }

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
          this.$router.push("/");
          break;
        case 1:
          this.$router.push("/lease");
          break;
        case 2:
          this.$router.push("/offer");
          break;
        case 3:
          break;
        case 4:
          this.$router.push("/borrow");
          break;
        case 5:
          this.$router.push("/loan");
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
  @apply !tw-border-white !tw-font-medium !tw-text-black !tw-bg-white;
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
