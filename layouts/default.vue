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
      <Nuxt />
    </div>
  </v-app>
</template>
<script>
import background from "@/assets/img/bg.png";
export default {
  data() {
    return {
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
};
</script>
