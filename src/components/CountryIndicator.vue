<template>
  <div
    v-if="!countryIndicator.error"
  >
    <BaseHeading
      :centered="false"
      :level="2"
      scale="beta"
    >
      <strong>{{countryIndicator.value}}</strong> {{countryIndicator.name}}
    </BaseHeading>
    <BaseHeading
      :centered="false"
      :level="3"
      scale="delta"
    >
      {{countryIndicator.description}}
    </BaseHeading>
    <a :href="countryIndicator.sourceUrl"><small>{{countryIndicator.citation}}</small></a>
    <BaseCalloutBox
      :key="error"
      v-if="error"
      :message="error"
      :class="space.marginTopNarrow"
      role="warning"
    />
  </div>
</template>

<script>
import BaseHeading from './BaseHeading.vue'
import BaseGutterWrapper from './BaseGutterWrapper.vue'
import BaseCalloutBox from './BaseCalloutBox.vue'
import { dataMethods } from './mixins/dataMethods'

export default {
  name: 'CountryIndicator',
  mixins: [dataMethods],
  props: {
    countryIndicator: {
      type: String,
      required: true
    }
  },
  components: {
    BaseHeading,
    BaseGutterWrapper,
    BaseCalloutBox
  },
  created () {
    console.log(this.countryIndicator)
  }
}
</script>
