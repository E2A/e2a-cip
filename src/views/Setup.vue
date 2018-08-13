<template>
  <div>
    <BaseSectionWrapper>
      <BaseWidthWrapper>
        <BaseHeading :class="space.paddingBottomWide">{{$t('setup.configureCIP')}}</BaseHeading>
        <SetupInput :key="this.getItemCount('all')"/>
        <div :class="[type.center, space.paddingTopWide]">
          <BaseBodyText
            v-if="!this.setupPresent()"
            size="small"
            :content="$t('setup.setupRequired')"
            :class="color.midtone"
          />
          <BaseButtonLink
            v-if="readyToAdd"
            :to="{name: 'activity', params: {activityId: 1}}"
            size="large"
            role="primary"
            :label="$t('setup.addActivities')"
          />
        </div>
      </BaseWidthWrapper>
    </BaseSectionWrapper>
    <BaseSectionWrapper :key="this.getItemCount('all')" border :class="type.center">
      <BaseHeading
        :level="2"
        scale="gamma"
        :class="space.paddingBottomWide"
      >
        {{$t('setup.restoreActivities')}}
      </BaseHeading>
      <FileUpload :exportType="['Import']" @import-success="setupRefresh"/>
    </BaseSectionWrapper>
  </div>
</template>

<script>
import BaseSectionWrapper from '@/components/BaseSectionWrapper.vue'
import BaseWidthWrapper from '@/components/BaseWidthWrapper.vue'
import BaseHeading from '@/components/BaseHeading.vue'
import BaseBodyText from '@/components/BaseBodyText.vue'
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
    SetupInput,
    BaseButtonLink,
    FileUpload
  },
  computed: {
    readyToAdd: function () {
      return this.getItemCount('assessments') === 0 && this.setupPresent()
    }
  },
  methods: {
    setupPresent: function () {
      const setup = this.getItemValue('setup')

      // if setup entitly exists, ensure all fields are present
      if (setup) {
        return (setup.title && setup.country && setup.role && setup.currencyCode && setup.currencyName)
      } else {
        return false
      }
    },
    setupRefresh: function () {
      console.log('refresh')
    }
  }
}
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/type.scss" lang="scss" module="type"></style>
<style src="styles/color.scss" lang="scss" module="color"></style>
