<template>
  <div>
    <BaseFormLabel
      v-if="label"
      :id="name"
      :label="label"
      :help-text="helpText"
      :text-size="labelTextSize"
    >
      <div :class="`inputGroup`">
        <span v-if="prepend" :class="`inputPrepend`">{{ prepend }}</span>
        <!-- make sure there's no whitespace around {{ contentValue }} or it will show up in the textarea -->
        <!-- https://stackoverflow.com/questions/2202999/why-is-textarea-filled-with-mysterious-white-spaces -->
        <component
          :is="el"
          :id="name"
          :name="name"
          :class="[classItems, inputClasses]"
          :rows="el === 'textarea' && height"
          :placeholder="placeholder"
          :value="value"
          :type="type"
          @input="emitInput"
          @change="emitChange"
          @focus="emitFocus"
          @blur="emitBlur"
          >{{ contentValue }}</component
        >

        <slot />
      </div>
      <BaseCalloutBox
        v-if="error"
        :key="error"
        :message="error"
        class="callout"
        role="warning"
      />
    </BaseFormLabel>
    <!-- if there's no label prop, just show the input -->
    <div v-else :class="`inputGroup`">
      <span v-if="prepend" :class="`inputPrepend`">{{ prepend }}</span>
      <component
        :is="el"
        :id="name"
        :name="name"
        :class="[classItems, inputClasses]"
        :rows="el === 'textarea' && height"
        :placeholder="placeholder"
        :value="value"
        :type="type"
        @input="emitInput"
        @change="emitChange"
        @focus="emitFocus"
        @blur="emitBlur"
        >{{ contentValue }}</component
      >
    </div>
  </div>
</template>

<script>
import { styleHelpers } from "./mixins/helpers.js";
import BaseFormLabel from "./BaseFormLabel.vue";
import BaseCalloutBox from "./BaseCalloutBox.vue";

export default {
  name: "BaseFormInput",
  components: {
    BaseFormLabel,
    BaseCalloutBox,
  },
  mixins: [styleHelpers],
  props: {
    el: {
      type: String,
      default: "input",
      validator: function (value) {
        return ["input", "textarea"].indexOf(value) !== -1;
      },
    },
    label: String,
    helpText: String,
    prepend: String,
    value: [String, Number],
    name: String,
    placeholder: String,
    validate: String,
    dataAs: String,
    type: {
      type: String,
      default: "text",
    },
    error: {
      type: String,
      required: false,
    },
    textSize: {
      type: String,
      default: "epsilon",
    },
    outline: {
      type: String,
      default: "highlight",
    },
    labelTextSize: String,
    // number of rows the textarea shows
    height: {
      type: Number,
      default: 4,
    },
    classItems: String,
  },
  data: function () {
    return {
      intialText: this.value,
    };
  },
  computed: {
    contentValue: function () {
      if (this.el === "textarea") {
        const text = this.intialText;
        return text;
      }
    },
    inputClasses: function () {
      return [
        `${this.el}`,
        `${this.el}-${this.outline}`,
        `scale-${this.textSize}`,
      ];
    },
  },
  methods: {
    emitInput: function (e) {
      this.$emit("input", e.target.value);
    },
    emitChange: function (e) {
      this.$emit("change", e.target.value);
    },
    emitFocus: function (e) {
      this.$emit("focus", e.target.value);
    },
    emitBlur: function (e) {
      this.$emit("blur", e.target.value);
    },
  },
  $_veeValidate: {
    name() {
      return this.name;
    },
    value() {
      return this.value;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~styleConfig/color";
@import "~styleConfig/animation";
@import "~styleConfig/spacing";
@import "~styleConfig/borders";
@import "~styleConfig/type";

.input,
.textarea {
  @include transition;
  @include border;
  background-color: color("light");
  border-radius: $border-radius;
  box-shadow: none !important;
  display: block;
  line-height: leading();
  outline: 0;
  outline: thin dotted \9;
  padding: space("xnarrow");
  width: 100%;

  &-highlight {
    &:focus,
    &:active {
      border-color: color("highlight");
      background-color: color("white");
    }
  }

  &-midtone {
    &:focus,
    &:active {
      border-color: color("midtone");
      background-color: color("white");
    }
  }
}

.textarea {
  height: auto;
  resize: vertical;
}

.scale-epsilon {
  font-size: scale-type("epsilon");
}

.scale-zeta {
  font-size: scale-type("zeta");
}

.scale-eta {
  font-size: scale-type("eta");
}

.callout {
  margin-top: space("narrow");
}

.inputGroup {
  position: relative;
  display: flex;
}

.inputPrepend {
  @include border;
  background-color: color("light");
  color: color("midtone");
  border-top-left-radius: $border-radius;
  border-bottom-left-radius: $border-radius;
  padding: space("xnarrow");
}

.inputPrepend + .input {
  border-left: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
