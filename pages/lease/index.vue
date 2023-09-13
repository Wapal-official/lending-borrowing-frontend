<template>
  <div class="tw-w-full">
    <h1 class="tw-text-5xl tw-font-medium tw-text-white tw-pb-5">
      Make loan offers on NFT collections.
    </h1>
    <div class="tw-text-lg tw-font-medium tw-capitalize tw-pb-12">
      Make loan offers on NFT collections.Browse collections below, and name
      your price. The current best offer will be shown to borrowers. To take
      your offer, they lock in an NFT from that collection to use as collateral.
      You will be repaid at the end of the loan, plus interest. If they fail to
      repay, you get to keep the NFT.
    </div>
    <div class="tw-w-full tw-pb-12">
      <text-field
        placeholder="Search NFTs, Collections"
        @input="searchCollection"
        v-model="search"
      >
        <template #prepend-icon>
          <i class="bx bx-search tw-text-xl"></i>
        </template>
      </text-field>
    </div>
    <h2 class="tw-text-[2rem] tw-uppercase tw-font-bold tw-pb-8">
      My Collection
    </h2>
    <div class="tw-w-full tw-grid tw-grid-cols-4 tw-gap-y-8 tw-gap-x-6">
      <lease-card
        :collection="item"
        v-for="(item, key) in filteredData"
        :key="key"
      />
    </div>
  </div>
</template>
<script>
import { getPools } from "@/services/pool";
export default {
  data() {
    return {
      data: [],
      filteredData: [],
      debounce: null,
      search: null,
      showMore: false,
    };
  },
  methods: {
    searchCollection() {
      clearTimeout(this.debounce);

      if (!this.search) {
        this.clearSearch();
        return;
      }

      if (this.search.length < 3) {
        return;
      }

      this.debounce = setTimeout(() => {
        this.filteredData = [];

        this.filteredData = this.data.filter((item) =>
          item.collection_name.toLowerCase().includes(this.search.toLowerCase())
        );
      }, 300);
    },
    clearSearch() {
      this.filteredData = this.data;
    },
  },
  async mounted() {
    this.data = [];
    this.data = await getPools();
    this.filteredData = this.data;
    console.log(this.data);
  },
};
</script>
