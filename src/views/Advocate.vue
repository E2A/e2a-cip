<template>
  <article>
    <BasePageIntro
      :title="$t('advocate.title')"
      :blurb="$t('advocate.intro')"
    />
    <BaseSectionWrapper>
      <BaseHeading :level="2" centered>{{$t('advocate.stepsTitle')}}</BaseHeading>
      <BaseWidthWrapper width="wide" :class="space.paddingTop">
        <BaseStepList :steps="steps" />
      </BaseWidthWrapper>
    </BaseSectionWrapper>
    <BaseSectionWrapper
      :class="type.center"
      border
    >
      <PrintPage
        :class="space.marginBottom"
        role="primary"
        size="large"
      />
      <FileUpload :exportType="['Export']" />
    </BaseSectionWrapper>
  </article>
</template>

<script>
import i18n from '@/i18n.js'
import NavFooter from '@/components/NavFooter.vue'
import BasePageIntro from '@/components/BasePageIntro.vue'
import BaseStepList from '@/components/BaseStepList.vue'
import BaseHeading from '@/components/BaseHeading.vue'
import BaseWidthWrapper from '@/components/BaseWidthWrapper.vue'
import BaseSectionWrapper from '@/components/BaseSectionWrapper.vue'
import PrintPage from '@/components/PrintPage.vue'
import FileUpload from '@/components/FileUpload.vue'

export default {
  name: 'Advocate',
  components: {
    NavFooter,
    BasePageIntro,
    BaseStepList,
    BaseHeading,
    BaseSectionWrapper,
    BaseWidthWrapper,
    PrintPage,
    FileUpload
  },
  data: function () {
    return {
      steps: Object.values(i18n.messages[i18n.locale].advocate.steps).map((step, index) => {
        return {
          title: this.$t(`home.steps.step${index + 1}.title`),
          blurb: this.$t(`home.steps.step${index + 1}.blurb`)
        }
      })
    }
  }
}
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/type.scss" lang="scss" module="type"></style>
