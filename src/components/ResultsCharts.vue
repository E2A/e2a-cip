<template>
  <BaseSectionWrapper :el="wrapper">
    <header :class="[type.center]">
      <BaseHeading
        :class="space.paddingBottomNarrow"
        scale="beta"
      >
        {{setupTitle}}
      </BaseHeading>
      <BaseGutterWrapper
        gutterX="medium"
        gutterY="xnarrow"
      >
        <BaseHeading
          scale="zeta"
          :class="base.byline"
          weight="regular"
          color="midtone"
          sub
        >
          {{setupRole}}
        </BaseHeading>
        <BaseHeading
          scale="zeta"
          :class="base.byline"
          weight="regular"
          color="midtone"
          sub
        >
          {{setupCountry}}
        </BaseHeading>
      </BaseGutterWrapper>
    </header>

    <!-- country analysis -->
    <BaseWidthWrapper
      :class="space.paddingTopWide"
      el="section"
      width="wide"
    >
      <BaseHeading
        :class="space.paddingBottomWide"
        :level="2"
        scale="gamma"
        color="midtone"
      >
        {{$t('results.analysis.country')}}
      </BaseHeading>
      <ChartItems
        :chartNames="['youthFocusBudget', 'youthFocusCount']"
      />

      <!-- country indicators -->
      <section :class="space.paddingTop">
        <BaseGallery
          :items="countryIndicators"
          size="large"
        >
          <div
            v-if="!item.error"
            :class="[border.top, border.secondary, space.paddingTop]"
            slot-scope="{item}"
          >
            <CountryIndicator :countryIndicator="getCountryIndicator(item.id)"
            />
          </div>
        </BaseGallery>
      </section>
    </BaseWidthWrapper>

    <!-- activity analysis -->
    <BaseWidthWrapper
      :class="space.paddingTopWide"
      el="section"
      width="wide"
    >
      <BaseHeading
        :class="space.paddingBottomWide"
        scale="gamma"
        color="midtone"
        sub
      >
        {{$t('results.analysis.activity')}}
      </BaseHeading>
      <ChartItems
        :chartNames="['activityTypeBudget', 'activityTypeCount']"
      />
    </BaseWidthWrapper>
  </BaseSectionWrapper>
</template>

<script>
import BaseHeading from '@/components/BaseHeading.vue'
import BaseSectionWrapper from '@/components/BaseSectionWrapper.vue'
import BaseGutterWrapper from '@/components/BaseGutterWrapper.vue'
import BaseWidthWrapper from '@/components/BaseWidthWrapper.vue'
import ChartItems from '@/components/ChartItems.vue'
import CountryIndicator from '@/components/CountryIndicator.vue'
import BaseGallery from '@/components/BaseGallery.vue'
import { dataMethods } from '@/components/mixins/dataMethods'
import { initData } from '@/components/mixins/initData'

export default {
  name: 'ResultsCharts',
  mixins: [dataMethods, initData],
  props: {
    wrapper: {
      type: String,
      default: 'div'
    }
  },
  components: {
    BaseHeading,
    BaseSectionWrapper,
    BaseGutterWrapper,
    BaseWidthWrapper,
    ChartItems,
    CountryIndicator,
    BaseGallery
  },
  data () {
    return {
      setupTitle: this.getItemValue('setup', 'title'),
      setupRole: this.getItemValue('setup', 'role'),
      setupCountry: this.getItemValue('setup', 'countryName')
    }
  }
}
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/type.scss" lang="scss" module="type"></style>
<style src="styles/borders.scss" lang="scss" module="border"></style>

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
</style>
