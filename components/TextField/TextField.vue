<template>
  <div
    class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full"
  >
    <label
      v-if="label"
      class="tw-text-white tw-text-sm tw-font-medium"
      :class="
        required
          ? `after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2`
          : ''
      "
      >{{ label }}</label
    >

    <div class="tw-relative tw-w-full">
      <div
        class="tw-absolute tw-top-0 tw-left-[9px] tw-h-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-dark-2 tw-z-20"
      >
        <slot name="prepend-icon"> </slot>
      </div>
      <v-text-field
        v-model="internalValue"
        :readonly="readOnly"
        outlined
        single-line
        color="#fff"
        hide-details
        :clearable="!$slots['append-icon']"
        :placeholder="placeholder"
        :counter="counter"
        :type="type"
        :disabled="disabled"
        class="wapal-input tw-w-full px-8"
        :class="{
          'tw-cursor-not-allowed': disabled,
          '!tw-pl-6': $slots['prepend-icon'],
        }"
        @keyup.enter="$emit('enterClicked')"
      >
      </v-text-field>
      <div
        class="tw-absolute tw-top-0 tw-right-[9px] tw-h-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-dark-2"
      >
        <slot name="append-icon"> </slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: [String, Number],
    },
    placeholder: {
      type: String,
    },
    type: {
      type: String,
      default: null,
    },
    counter: {
      type: Number,
      default: null,
    },
    error_messages: {
      type: String,
      default: null,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
    },
    showPercentage: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    internalValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
  },
};
</script>
<style>
.wapal-input {
  border-radius: 7px !important;
  @apply tw-bg-dark-6 tw-border-dark-4 tw-border-solid tw-border;
}

.wapal-input.v-text-field--outlined > .v-input__control > .v-input__slot {
  min-height: 40px !important;
}
.wapal-input.v-text-field--outlined fieldset {
  border: none !important;
}
.wapal-input.v-text-field--enclosed .v-input__append-inner {
  margin-top: 8px !important;
}

.wapal-input.v-text-field--outlined.v-input--is-focused .v-input__slot:before {
  border: none !important;
}
.wapal-input.v-text-field--outlined .v-label {
  top: 15px !important;
}

.wapal-input input,
.wapal-input textarea {
  @apply !tw-text-sm !tw-text-dark-2 placeholder:!tw-text-sm placeholder:!tw-font-normal;
}
</style>
