<template>
  <div class="tw-w-full">
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      class="data-table"
      mobile-breakpoint="0"
      :hide-default-footer="true"
      disable-pagination
      disable-sort
    >
      <template v-slot:body="{ items }">
        <tbody>
          <tr
            v-for="(item, itemIndex) in items"
            :key="itemIndex"
            class="tw-cursor-pointer hover:!tw-bg-black/60"
            @click="$emit('rowClicked', item)"
          >
            <td
              class="!tw-border-b-dark-6 !tw-py-4 tw-font-medium"
              v-for="(header, index) in headers"
              :key="index"
            >
              <div
                v-if="header.showSerialNumber && header.showImage"
                class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-4 tw-text-base"
              >
                {{ itemIndex + 1 }}.<img
                  :src="item.image"
                  :alt="item[header.value]"
                  class="tw-w-[64px] tw-h-[64px] tw-object-cover tw-rounded"
                />{{ item[header.value] }}
              </div>
              <div
                v-else-if="
                  header.value === 'best_offer' ||
                  header.value === 'available_pool'
                "
                class="tw-text-lg"
              >
                {{ item[header.value] }}APT
              </div>
              <div v-else-if="header.value === 'apy'" class="tw-text-lg">
                {{ item[header.value] }}%
              </div>
              <div v-else-if="header.value === 'duration'" class="tw-text-lg">
                {{ item[header.value] }}d
              </div>
              <div v-else-if="header.button">
                <button-primary
                  :text="header.value"
                  @click="buttonClick(item)"
                  :secondary="true"
                />
              </div>
              <div v-else class="tw-text-lg">{{ item[header.value] }}</div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  props: { headers: { type: Array }, items: { type: Array } },
  data() {
    return {};
  },
  methods: {
    buttonClick(item) {
      this.$emit("buttonClicked", item);
    },
  },
};
</script>
<style>
.data-table {
  min-width: 100% !important;
  max-width: 100% !important;
  overflow-x: auto !important;
  background: transparent !important;
}

.default-data-table-header {
  @apply !tw-text-dark-2 !tw-border-b-dark-6 !tw-text-xl tw-uppercase tw-font-medium tw-pb-8;
}

.default-data-table-header span {
  text-transform: uppercase;
}
</style>
