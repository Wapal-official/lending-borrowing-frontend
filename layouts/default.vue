<template>
  <v-app>
    <div class="tw-min-h-screen tw-w-full">
      <navbar />
      <Nuxt />
    </div>
  </v-app>
</template>
<script>
export default {
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
