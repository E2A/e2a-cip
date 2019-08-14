<template>
  <div>
    <BaseSectionWrapper>
      <BaseHeading :class="space.paddingBottomWide">{{$t('setup.configureCIP')}}</BaseHeading>
      <BaseWidthWrapper>
        <SetupInput :key="inputKey"/>
        <div
          v-if="!this.setupPresent()"
          :class="space.paddingTop"
        >
          <BaseCalloutBox
            :message="$t('setup.setupRequired')"
            role="info"
          />
        </div>
        <div
          v-if="readyToAdd"
          :class="[type.center, space.paddingTopWide]"
        >
          <BaseButtonLink
            :to="{name: 'activity'}"
            :label="activityText"
            size="large"
            role="primary"
            iconRight="arrow-right"
          />
        </div>
         <BaseBodyText
         :class="space.paddingTop"
          :content="$t('setup.saveDataReminder', {exportLink: '#'})"
         />
      </BaseWidthWrapper>
    </BaseSectionWrapper>

    <!-- Restore -->
    <BaseSectionWrapper border :class="type.center">
      <BaseHeading
        :level="2"
        scale="gamma"
        :class="space.paddingBottom"
      >
        {{$t('setup.restoreActivities')}}
      </BaseHeading>
      <FileUpload @import-success="updateInput"/>
    </BaseSectionWrapper>
  </div>
</template>

<script>
import BaseSectionWrapper from '@/components/BaseSectionWrapper.vue'
import BaseWidthWrapper from '@/components/BaseWidthWrapper.vue'
import BaseHeading from '@/components/BaseHeading.vue'
import BaseBodyText from '@/components/BaseBodyText.vue'
import BaseCalloutBox from '@/components/BaseCalloutBox.vue'
import SetupInput from '@/components/SetupInput.vue'
import BaseButtonLink from '@/components/BaseButtonLink.vue'
import { dataMethods } from '@/components/mixins/dataMethods'
import FileUpload from '@/components/FileUpload.vue'

export default {
  name: 'Setup',
  mixins: [dataMethods],
  components: {
    BaseSectionWrapper,
    BaseWidthWrapper,
    BaseHeading,
    BaseBodyText,
    BaseCalloutBox,
    SetupInput,
    BaseButtonLink,
    FileUpload
  },
  data () {
    return {
      inputKey: null
    }
  },
  computed: {
    readyToAdd: function () {
      return this.setupPresent()
    },
    activityText: function () {
      if (this.getItemCount('activities') === 0) {
        return this.$t('setup.addActivities')
      } else {
        return this.$t('setup.editActivities')
      }
    }
  },
  methods: {
    updateInput: function () {
      this.inputKey = this.getItemCount('all')
    }
  }
}
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/type.scss" lang="scss" module="type"></style>
<style src="styles/color.scss" lang="scss" module="color"></style>
