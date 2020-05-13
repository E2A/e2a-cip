<template>
  <NavFooter
    :left-buttons="this.getNavButtons().left"
    :right-buttons="this.getNavButtons().right"
    wrapper-el="article"
  >
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
      <BaseHeading :level="2" centered>{{
        $t("advocate.stepsTitle")
      }}</BaseHeading>
      <BaseWidthWrapper :class="space.paddingTop" width="wide">
        <BaseStepList :steps="steps" />
      </BaseWidthWrapper>
    </BaseSectionWrapper>

    <!-- Feedback -->
    <BaseSectionWrapper :class="[type.center, space.marginBottomXwide]" border>
      <BaseWidthWrapper :class="space.paddingBottom" width="wide">
        <BaseHeading :level="2" centered :class="space.paddingBottom">{{
          $t("advocate.done")
        }}</BaseHeading>
        <BaseBodyText
          :content="$t('advocate.feedback')"
          :class="space.paddingBottom"
        />
      </BaseWidthWrapper>
      <div :class="space.paddingBottom">
        <BaseButtonLink
          :to="{ name: 'print' }"
          :label="$t('advocate.print')"
          icon-left="print"
          role="primary"
          size="large"
        />
      </div>
      <FileExport
        :label="$t('fileUpload.exportLabel')"
        :select-label="$t('fileUpload.exportSelectFormat')"
        size="default"
        align="center"
      />
    </BaseSectionWrapper>
  </NavFooter>
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
    GlobalRecommendation,
  },
  beforeRouteEnter: function (to, from, next) {
    next((vm) => {
      vm.previousRoute = from;
    });
  },
  computed: {
    steps: function () {
      return Object.values(i18n.messages[i18n.locale].advocate.steps).map(
        (step, index) => {
          return {
            title: this.$t(`advocate.steps.step${index + 1}.title`),
            blurb: this.$t(`advocate.steps.step${index + 1}.blurb`),
          };
        }
      );
    },
  },
  methods: {
    goBack: function () {
      if (this.previousRoute) {
        return this.previousRoute;
      }

      return { name: "results" };
    },
    getNavButtons: function () {
      var navButtons = {
        left: [
          {
            to: this.goBack(),
            label: this.$t("goBack"),
          },
        ],
        right: [],
      };

      return navButtons;
    },
  },
};
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/type.scss" lang="scss" module="type"></style>
