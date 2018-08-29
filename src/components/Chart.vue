<template>
  <!-- Chart -->
  <div v-if="activitiesPresent">
    <BaseHeading
      :class="space.paddingBottomNarrow"
      :level="3"
      scale="delta"
      weight="bold"
      color="dark"
    >
      {{this.$t(`chartTitles.${chartName}`)}}
    </BaseHeading>

    <BaseGutterWrapper
      gutterY="narrow"
      gutterX="narrow"
    >
      <!-- Chart -->
      <div
        :id="chartName"
        :class="base.chart"
      ></div>

      <!-- Chart Labels -->
      <ChartLegend
        :labelData="labelData"
        :chartName="chartName"
        :class="base.legend"
      />
    </BaseGutterWrapper>
  </div>
</template>

<script>
import BaseHeading from './BaseHeading.vue'
import BaseGutterWrapper from './BaseGutterWrapper.vue'
import ChartLegend from './ChartLegend.vue'
import Chartist from 'chartist'
import { dataMethods } from './mixins/dataMethods'

export default {
  name: 'Chart',
  mixins: [dataMethods],
  props: {
    chartName: {
      type: String,
      required: true
    },
    seriesData: {
      type: Array,
      requred: true
    },
    labelData: {
      type: Array,
      required: true
    }
  },
  computed: {
    activitiesPresent: function () {
      return this.getItemCount('activities') > 0
    }
  },
  components: {
    BaseHeading,
    BaseGutterWrapper,
    ChartLegend
  },
  mounted () {
    // eslint-disable-next-line
    new Chartist['Pie'](`#${this.chartName}`, {
      series: this.seriesData
    })
  }
}
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/borders.scss" lang="scss" module="border"></style>
<style src="styles/type.scss" lang="scss" module="type"></style>

<style lang="scss" module="base">
.chart {
  display: block;
}

.legend {
  composes: paddingVerticalBetweenXnarrow from 'styles/spacing.scss';
  margin-top: 0;
  margin-bottom: 0;
}
</style>
