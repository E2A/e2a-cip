<template>
  <NavFooter
    wrapperEl="article"
    :leftButtons="navButtons.left"
    :rightButtons="navButtons.right"
  >
    <FileUpload :exportType="['Export']" />
    <ClearItems :clearType="['Recommendations']" />
    <header :class="[type.center, space.paddingWide]">
      <BaseHeading :class="space.paddingBottomNarrow">{{getItemValue('setup','title')}}</BaseHeading>
      <BaseGutterWrapper
        gutterX="medium"
        gutterY="xnarrow"
      >
        <BaseHeading
          scale="zeta"
          :class="base.byline"
          sub
        >
          {{setupRole}}
        </BaseHeading>
        <BaseHeading
          scale="zeta"
          :class="base.byline"
          sub
        >
          {{setupCountry}}
        </BaseHeading>
      </BaseGutterWrapper>
    </header>
    <section :class="[space.paddingBottomWide, space.paddingHorizontalWide]">
      <BaseHeading
        :level="3"
        :class="space.paddingBottomWide"
        sub
      >
        {{$t('resultsSubhead')}}
      </BaseHeading>
      <ChartItems />
    </section>
    <p><strong>{{getItemCount('activities')}}</strong> {{$t('activities')}}</p>
    <section :class="[space.paddingWide, border.top]">
      <ActivitiesList ref="activityList">
        <div
          v-for="(activities, index) in groupedActivities"
          :key="`gA-${index}`"
        >
          <template v-if="activities.activityObjects.length > 0">
            <BaseHeading
              :level="2"
              align="center"
            >
              {{activities.activityTypeName}}
            </BaseHeading>
            <ActivitiesItemResult
              v-for="(activity, index) in activities.activityObjects"
              :key="`activity-${index}`"
              :activityInstance="activity"
            />
          </template>
        </div>
      </ActivitiesList>
    </section>
  </NavFooter>
</template>

<script>
// @ is an alias to /src
import BaseHeading from '@/components/BaseHeading.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseWidthWrapper from '@/components/BaseWidthWrapper.vue'
import BaseGutterWrapper from '@/components/BaseGutterWrapper.vue'
import ActivitiesList from '@/components/ActivitiesList.vue'
import ActivitiesItemResult from '@/components/ActivitiesItemResult.vue'
import FileUpload from '@/components/FileUpload.vue'
import ClearItems from '@/components/ClearItems.vue'
import ChartItems from '@/components/ChartItems.vue'
import NavFooter from '@/components/NavFooter.vue'
import { activityTypes } from '@/components/mixins/activityTypes'
import { dataMethods } from '@/components/mixins/dataMethods'
import { electronPDF } from '@/components/mixins/electronPDF'

export default {
  name: 'Results',
  mixins: [activityTypes, dataMethods, electronPDF],
  components: {
    BaseHeading,
    BaseButton,
    BaseWidthWrapper,
    BaseGutterWrapper,
    ActivitiesList,
    ActivitiesItemResult,
    FileUpload,
    ClearItems,
    ChartItems,
    NavFooter
  },
  data () {
    return {
      groupedActivities: this.getGroupedActivites(),
      setupTitle: this.getItemValue('setup', 'title'),
      setupRole: this.getItemValue('setup', 'role'),
      setupCountry: this.getItemValue('setup', 'country'),
      navButtons: {
        left: [
          {
            to: {name: 'assessment'},
            label: this.$t('results.previousStep')
          }
        ],
        right: [
          {
            click: this.printPage,
            label: this.$t('printPage'),
            type: 'button'
          },
          {
            to: {name: 'advocate'},
            label: this.$t('results.nextStep'),
            role: 'primary'
          }
        ]
      }
    }
  },
  methods: {
    printPage: function () {
      // Check if in electron, and use specific electron PDF creation code
      if (this.checkElectron()) {
        // Electron-specific PDF printing
        this.printElectronPDF()
      } else {
        // Default browser printing
        window.print()
      }
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
</style>
