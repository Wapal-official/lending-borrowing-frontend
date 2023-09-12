<template>
  <div name="snackbars">
    <v-snackbar v-model="show" :timeout="3000" top centered color="#1A1B1E">
      <div
        class="tw-w-full tw-h-full tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-2"
      >
        <v-icon class="!tw-text-green-500" v-if="!error"
          >mdi-check-circle</v-icon
        ><v-icon class="!tw-text-red-600" v-else>mdi-close-circle</v-icon
        ><span class="tw-capitalize">{{ message }}</span>
      </div>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      color: "",
      message: "",
      error: false,
    };
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "toast/showToast") {
        this.message = state.toast.message;
        this.error = state.toast.error;
        this.show = true;

        setTimeout(() => {
          this.$store.commit("toast/clearToast");
        }, 1000);
      }
    });
  },
};
</script>
