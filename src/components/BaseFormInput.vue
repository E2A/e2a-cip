  <template>
  <BaseFormLabel
    :id="name"
    :label="label"
    :helpText="helpText"
    :textSize="labelTextSize"
  >
    <!-- make sure there's no whitespace around {{ contentValue }} or it will show up in the textarea -->
    <!-- https://stackoverflow.com/questions/2202999/why-is-textarea-filled-with-mysterious-white-spaces -->
    <component
      :is="el"
      :id="name"
      :name="name"
      :class="[base[el], type[typeScaleClass(textSize)]]"
      :rows="el === 'textarea' && height"
      :placeholder="placeholder"
      :value="value"
      :type="type"
      @input="emitInput"
      @change="emitChange"
      @focus="emitFocus"
    >{{contentValue}}</component>
    <BaseCalloutBox
      :key="error"
      v-if="error"
      :message="error"
      :class="space.marginTopNarrow"
      role="warning"
    />
  </BaseFormLabel>
</template>

<script>
import { styleHelpers } from './mixins/helpers.js'
import BaseFormLabel from './BaseFormLabel.vue'
import BaseCalloutBox from './BaseCalloutBox.vue'

export default {
  name: 'BaseFormInput',
  mixins: [styleHelpers],
  props: {
    el: {
      type: String,
      default: 'input',
      validator: function (value) {
        return ['input', 'textarea'].indexOf(value) !== -1
      }
    },
    label: {
      type: String,
      required: true
    },
    helpText: String,
    value: [String, Number],
    name: String,
    placeholder: String,
    validate: String,
    dataAs: String,
    type: {
      type: String,
      default: 'text'
    },
    error: {
      type: String,
      required: false
    },
    textSize: {
      type: String,
      default: 'epsilon'
    },
    labelTextSize: String,
    // number of rows the textarea shows
    height: {
      type: Number,
      default: 4
    }
  },
  components: {
    BaseFormLabel,
    BaseCalloutBox
  },
  methods: {
    emitInput: function (e) {
      this.$emit('input', e.target.value)
    },
    emitChange: function (e) {
      this.$emit('change', e.target.value)
    },
    emitFocus: function (e) {
      this.$emit('focus', e.target.value)
    }
  },
  computed: {
    contentValue: function () {
      if (this.el === 'textarea') { return this.value }
    }
  },
  $_veeValidate: {
    name () {
      return this.name
    },
    value () {
      return this.value
    }
  }
}
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>

<style lang="scss" module="base">
@import '~styleConfig/color';

.input {
  composes: default from 'styles/animation.scss';
  composes: paddingXnarrow from 'styles/spacing.scss';
  composes: round default from 'styles/borders.scss';
  composes: lightBg from 'styles/color.scss';
  composes: scaleEpsilon leadingDefault from 'styles/type.scss';
  box-shadow: none !important;
  display: block;
  width: 100%;
  outline: 0;
  outline: thin dotted \9;

  &:focus,
  &:active {
    border-color: color('highlight');
    background-color: color('white');
  }
}

.textarea {
  composes: input;
  // composes: noPaddingVertical from 'styles/spacing.scss';
  height: auto;
  resize: vertical;
}
</style>
