<template>
  <BaseFormLabel
    :id="name"
    :label="$t('activityYouthCentric')"
    :helpText="$t('supportText.activityYouthCentric')"
  >
    <div :class="base.switch">
      <input
        @change="emitChange($event)"
        :name="name"
        :id="name"
        :value="value"
        type="checkbox"
      >
    </div>
    <BaseCalloutBox
      v-if="error"
      :key="error"
      :message="error"
      :class="space.marginTopNarrow"
      role="warning"
    />
  </BaseFormLabel>
</template>

<script>
import BaseFormLabel from './BaseFormLabel'
import BaseCalloutBox from './BaseCalloutBox'

export default {
  name: 'BaseFormSwitch',
  props: {
    label: String,
    helpText: String,
    value: Boolean,
    name: {
      type: String,
      required: true
    },
    error: String
  },
  components: {
    BaseFormLabel,
    BaseCalloutBox
  },
  methods: {
    emitChange: function (event) {
      this.$emit('input', event.target.checked)
    }
  },
  created () {
    this.checked = this.value
  }
}
</script>

<style lang="scss" module="base">
.switch {

}
</style>
