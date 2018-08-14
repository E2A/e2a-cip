<template>
  <article>
    <FileUpload :exportType="['Export']" />
    <ClearItems :clearType="['Recommendations']" />
    <header :class="[type.center, space.paddingWide]">
      <BaseHeading :class="space.paddingBottomXnarrow">{{getItemValue('setup','title')}}</BaseHeading>
      <BaseHeading :level="3" sub>{{$t('resultsSubhead')}}</BaseHeading>
      <BaseHeading :level="2" sub>{{setupTitle}} {{setupRole}} {{setupCountry}}</BaseHeading>
    </header>
    <section :class="[space.paddingBottomWide, space.paddingHorizontalWide]">
      <ChartItems />
    </section>
    <BaseButton @click="printPage" :label="$t('printPage')"></BaseButton>
    <p><strong>{{getItemCount('activities')}}</strong> {{$t('activities')}}</p>
    <section :class="[space.paddingWide, border.top]">
      <ActivitiesList ref="activityList">
        <div
          v-for="(activities, index) in groupedActivities"
          :key="`gA-${index}`"
        >
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
          <hr />
        </div>
      </ActivitiesList>
    </section>
  </article>
</template>

<script>
// @ is an alias to /src
import BaseHeading from '@/components/BaseHeading.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseWidthWrapper from '@/components/BaseWidthWrapper.vue'
import ActivitiesList from '@/components/ActivitiesList.vue'
import ActivitiesItemResult from '@/components/ActivitiesItemResult.vue'
import FileUpload from '@/components/FileUpload.vue'
import ClearItems from '@/components/ClearItems.vue'
import ChartItems from '@/components/ChartItems.vue'
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
    ActivitiesList,
    ActivitiesItemResult,
    FileUpload,
    ClearItems,
    ChartItems
  },
  data () {
    return {
      groupedActivities: this.getGroupedActivites(),
      setupTitle: this.getItemValue('setup', 'title'),
      setupRole: this.getItemValue('setup', 'role'),
      setupCountry: this.getItemValue('setup', 'country')
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

<style src="../stylesheets/utilities/spacing.scss" lang="scss" module="space"></style>
<style src="../stylesheets/utilities/type.scss" lang="scss" module="type"></style>
<style src="../stylesheets/utilities/borders.scss" lang="scss" module="border"></style>
