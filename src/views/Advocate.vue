<template>
  <article>
    <NavBreadcrumbs />
    <BasePageIntro
      :title="$t('advocate.title')"
      :blurb="$t('advocate.globalRecommendations.content')"
      :class="space.paddingBottomNone"
    />

    <!-- Global Recommendations -->
    <BaseSectionWrapper :class="space.paddingTopNone">
      <BaseWidthWrapper :class="[type.center]" width="wide">
        <GlobalRecommendation />
      </BaseWidthWrapper>
    </BaseSectionWrapper>

    <!-- Advocate Steps -->
    <BaseSectionWrapper border>
      <BaseHeading :level="2" centered>{{$t('advocate.stepsTitle')}}</BaseHeading>
      <BaseWidthWrapper :class="space.paddingTop" width="wide">
        <BaseStepList :steps="steps" />
      </BaseWidthWrapper>
    </BaseSectionWrapper>
    <BaseSectionWrapper :class="type.center" border>
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
        :label="$t('fileUpload.exportLabel')"
        :selectLabel="$t('fileUpload.exportSelectFormat')"
      />
    </BaseSectionWrapper>
  </article>
</template>

<script>
import i18n from "@/i18n.js";
import NavFooter from "@/components/NavFooter.vue";
import NavBreadcrumbs from "@/components/NavBreadcrumbs.vue";
import BasePageIntro from "@/components/BasePageIntro.vue";
import BaseStepList from "@/components/BaseStepList.vue";
import BaseHeading from "@/components/BaseHeading.vue";
import BaseBodyText from "@/components/BaseBodyText.vue";
import BaseWidthWrapper from "@/components/BaseWidthWrapper.vue";
import BaseSectionWrapper from "@/components/BaseSectionWrapper.vue";
import FileExport from "@/components/FileExport.vue";
import BaseButtonLink from "@/components/BaseButtonLink.vue";
import GlobalRecommendation from "@/components/GlobalRecommendation.vue";

export default {
  name: "Advocate",
  components: {
    NavFooter,
    NavBreadcrumbs,
    BasePageIntro,
    BaseStepList,
    BaseHeading,
    BaseBodyText,
    BaseSectionWrapper,
    BaseButtonLink,
    BaseWidthWrapper,
    FileExport,
    GlobalRecommendation
  },
  computed: {
    steps: function() {
      return Object.values(i18n.messages[i18n.locale].advocate.steps).map(
        (step, index) => {
          return {
            title: this.$t(`advocate.steps.step${index + 1}.title`),
            blurb: this.$t(`advocate.steps.step${index + 1}.blurb`)
          };
        }
      );
    }
  }
};
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/type.scss" lang="scss" module="type"></style>
