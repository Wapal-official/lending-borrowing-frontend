<template>
  <div>
    <button-primary
      text="Connect Wallet"
      v-if="!wallet.address"
      @click="connectWalletDialog = true"
    />
    <button-primary :text="getWalletAddress" :secondary="true" v-else />
    <connect-wallet-modal
      :connectDialog="connectWalletDialog"
      @close="connectWalletDialog = false"
    />
  </div>
</template>
<script>
export default {
  computed: {
    wallet() {
      return this.$store.state.wallet.wallet;
    },
    getWalletAddress() {
      if (this.wallet) {
        return (
          this.wallet.address.substring(0, 9) +
          "..." +
          this.wallet.address.substring(
            this.wallet.address.length - 2,
            this.wallet.address.length
          )
        );
      }
    },
  },
  data() {
    return {
      connectWalletDialog: false,
    };
  },
};
</script>
