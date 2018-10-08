<template>
  <article>
    <BasePageIntro
      :title="$t('advocate.title')"
      :blurb="$t('advocate.intro')"
    />
    <!-- Global Recommendations -->
    <BaseSectionWrapper>
      <BaseHeading
        :level="1"
        centered
      >
        {{$t('advocate.globalRecommendations')}}
      </BaseHeading>
      <BaseWidthWrapper
        :class="space.paddingTop"
        width="wide"
      >
        <GlobalRecommendation />
      </BaseWidthWrapper>
    </BaseSectionWrapper>

    <!-- Advocate Steps -->
    <BaseSectionWrapper>
      <BaseHeading
        :level="2"
        centered
      >
        {{$t('advocate.stepsTitle')}}
      </BaseHeading>
      <BaseWidthWrapper
        :class="space.paddingTop"
        width="wide"
      >
        <BaseStepList :steps="steps" />
      </BaseWidthWrapper>
    </BaseSectionWrapper>
    <BaseSectionWrapper
      :class="type.center"
      border
    >
      <div :class="space.paddingBottom">
        <BaseButtonLink
          :to="{name: 'print'}"
          :label="$t('advocate.print')"
          iconLeft="print"
          role="primary"
          size="large"
        />
      </div>
      <FileExport
        size="default"
        align="center"
      />
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
import FileExport from '@/components/FileExport.vue'
import BaseButtonLink from '@/components/BaseButtonLink.vue'
import GlobalRecommendation from '@/components/GlobalRecommendation.vue'

export default {
  name: 'Advocate',
  components: {
    NavFooter,
    BasePageIntro,
    BaseStepList,
    BaseHeading,
    BaseSectionWrapper,
    BaseButtonLink,
    BaseWidthWrapper,
    FileExport,
    GlobalRecommendation
  },
  computed: {
    steps: function () {
      return Object.values(i18n.messages[i18n.locale].advocate.steps).map((step, index) => {
        return {
          title: this.$t(`advocate.steps.step${index + 1}.title`),
          blurb: this.$t(`advocate.steps.step${index + 1}.blurb`)
        }
      })
    }
  }
}
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/type.scss" lang="scss" module="type"></style>
