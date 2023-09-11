<template>
  <div class="tw-w-full tw-bg-dark-9 tw-h-screen">
    <div class="tw-container tw-mx-auto"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "Collection",
          align: "start",
          value: "name",
          width: "264px",
          class: "default-data-table-header",
          showImage: true,
          showSerialNumber: true,
        },
        {
          text: "Available Pool",
          align: "start",
          value: "available-pool",
          width: "200px",
          class: "default-data-table-header",
          showAptIcon: true,
        },
        {
          text: "Best Offer",
          align: "start",
          value: "best-offer",
          width: "200px",
          class: "default-data-table-header",
        },
        {
          text: "Apy",
          align: "start",
          value: "apy",
          width: "200px",
          class: "default-data-table-header",
        },
        {
          text: "Duration",
          align: "start",
          value: "duration",
          width: "200px",
          class: "default-data-table-header",
        },
      ],
      data: [
        {
          name: "test",
          "best-offer": 16,
          "available-pool": 8,
          apy: 16,
          duration: "10d",
        },
      ],
    };
  },
  methods: {
    async lendTransaction() {
      const res = await this.$store.dispatch("wallet/lenderOffer");
      console.log(res);
    },
    async borrowTransaction() {
      const res = await this.$store.dispatch("wallet/borrowerSelect");

      console.log(res);
    },
  },
};
</script>
