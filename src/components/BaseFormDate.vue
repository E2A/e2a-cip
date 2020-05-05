<template>
  <BaseFormLabel
    v-if="label"
    :id="name"
    :label="label"
    :help-text="helpText"
    :text-size="labelTextSize"
  >
    <datepicker
      :value="value"
      :class="[classItems]"
      :name="name"
      :placeholder="placeholder"
      @input="emitChange"
    />
    <BaseCalloutBox
      v-if="error"
      :key="error"
      :message="error"
      :class="space.marginTopNarrow"
      role="warning"
    />
  </BaseFormLabel>
  <datepicker
    v-else
    :value="value"
    :class="[classItems]"
    :name="name"
    :placeholder="placeholder"
    @input="emitChange"
  />
</template>

<script>
import { styleHelpers } from "./mixins/helpers";
import Datepicker from "vuejs-datepicker";
import BaseFormLabel from "./BaseFormLabel.vue";
import BaseCalloutBox from "./BaseCalloutBox.vue";

export default {
  name: "BaseFormDate",
  components: {
    BaseFormLabel,
    BaseCalloutBox,
    Datepicker,
  },
  mixins: [styleHelpers],
  props: {
    label: String,
    labelTextSize: String,
    helpText: String,
    value: [String, Number, Object, Date],
    name: {
      type: String,
      required: true,
    },
    placeholder: String,
    validate: String,
    error: {
      type: String,
      required: false,
    },
    classItems: String,
  },
  methods: {
    emitChange: function (e) {
      // debugger;
      this.$emit("input", e);
    },
  },
};
</script>

<style lang="scss">
@import "~bourbon/core/bourbon";
@import "~vue-select/dist/vue-select.css";
@import "~styleConfig/type";
@import "~styleConfig/spacing";
@import "~styleConfig/color";
@import "~styleConfig/borders";

.vdp-datepicker {
  color: color("dark") !important;
  input {
    width: 100%;
    @include border();
    background-color: color("light");
    padding: space("xnarrow");
    border-radius: 4px;
  }
}

.vdp-datepicker__calendar .cell.selected {
  background: color("primary") !important;
  color: color("white");
}

.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day:hover,
.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).month:hover,
.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).year:hover {
  border: 1px solid color("primary") !important;
}
</style>
