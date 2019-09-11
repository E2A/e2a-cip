<template>
  <NavFooter
    wrapperEl="article"
    :leftButtons="navButtons.left"
    :rightButtons="navButtons.right"
  >
    <!-- header and charts -->
    <ResultsCharts />
  </NavFooter>
</template>

<script>
import ResultsCharts from '@/components/ResultsCharts.vue'
import ActivitiesListHeader from '@/components/ActivitiesListHeader.vue'
import BaseHeading from '@/components/BaseHeading.vue'
import BaseBodyText from '@/components/BaseBodyText.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseProgressBar from '@/components/BaseProgressBar.vue'
import BaseSectionWrapper from '@/components/BaseSectionWrapper.vue'
import BaseWidthWrapper from '@/components/BaseWidthWrapper.vue'
import BaseGutterWrapper from '@/components/BaseGutterWrapper.vue'
import BaseVerticalList from '@/components/BaseVerticalList.vue'
import ActivitiesList from '@/components/ActivitiesList.vue'
import ActivitiesTypeHeading from '@/components/ActivitiesTypeHeading.vue'
import ActivitiesItemResultPrint from '@/components/ActivitiesItemResultPrint.vue'
import ClearItems from '@/components/ClearItems.vue'
import ChartItems from '@/components/ChartItems.vue'
import NavFooter from '@/components/NavFooter.vue'
import PrintPage from '@/components/PrintPage.vue'
import { activityTypes } from '@/components/mixins/activityTypes'
import { dataMethods } from '@/components/mixins/dataMethods'
import { bestPracticeData } from '@/components/mixins/bestPracticeData'

export default {
  name: 'Print',
  mixins: [activityTypes, dataMethods, bestPracticeData],
  components: {
    ResultsCharts,
    ActivitiesListHeader,
    BaseHeading,
    BaseBodyText,
    BaseButton,
    BaseProgressBar,
    BaseSectionWrapper,
    BaseWidthWrapper,
    BaseGutterWrapper,
    BaseVerticalList,
    PrintPage,
    ActivitiesList,
    ActivitiesTypeHeading,
    ActivitiesItemResultPrint,
    ClearItems,
    ChartItems,
    NavFooter
  },
  computed: {
    groupedActivities: function () {
      return this.getGroupedActivites()
    },
    navButtons: function () {
      return {
        left: [
          {
            to: { name: 'advocate' },
            label: this.$t('print.previousStep')
          }
        ],
        right: [
          {
            type: 'print',
            size: 'default'
          }
        ]
      }
    }
  },
  data () {
    return {
      setupTitle: this.getItemValue('setup', 'title'),
      setupRole: this.getItemValue('setup', 'role'),
      setupCountry: this.getItemValue('setup', 'countryName'),
      globalRecommendations: this.$store.getters['entities/globalrecommendations/all']()
    }
  }
}
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/type.scss" lang="scss" module="type"></style>
<style src="styles/borders.scss" lang="scss" module="border"></style>
<style src="styles/color.scss" lang="scss" module="color"></style>

<style lang="scss" module="base">
@import '~styleConfig/borders';
@import '~styleConfig/breakpoints';

.byline {
  composes: midtone from 'styles/color.scss';
  composes: leadingTight from 'styles/type.scss';
  display: block;

  @include media('>xsmall') {
    display: inline-block;

    & + & {
      @include border('left');
    }
  }
}

.toolTray {
  composes: paddingBottomWide from 'styles/spacing.scss';
  display: block;

  @supports (display: flex) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.toolTrayItem {
  display: inline-block;
}
</style>
