<template>
  <span>
    <vSelect
      @input="emitInput"
      :options="options"
      :searchable="searchable"
      :value="value"
      :class="classItems"
      :placeholder="placeholder"
    />
    <p v-if="error" class="form__error">{{ error }}</p>
  </span>
</template>

<script>
import { styleHelpers } from './mixins/helpers.js'
import BaseFormLabel from './BaseFormLabel.vue'
import vSelect from 'vue-select'

export default {
  name: 'BaseSelectValidation',
  mixins: [styleHelpers],
  props: {
    value: [String, Number],
    name: String,
    placeholder: String,
    validate: String,
    dataAs: String,
    error: {
      type: String,
      required: false
    },
    searchable: Boolean,
    options: [Array, Object],
    classItems: String
  },
  components: {
    BaseFormLabel,
    vSelect
  },
  methods: {
    emitInput: function (e) {
      this.$emit('input', e)
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
