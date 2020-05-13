<template>
  <article>
    <NavBackLink
      :url="{ name: 'evidence-informed-practices' }"
      :label="$t('backToBestPractices')"
    />
    <BaseSectionWrapper :class="[base.headerSection]">
      <!-- title -->
      <header :class="space.paddingBottomNarrow">
        <BaseWidthWrapper :class="base.headerContent" width="default">
          <BaseHeading
            :sub="true"
            :class="[space.paddingBottomNarrow, type.uppercase]"
            :centered="false"
            scale="epsilon"
            color="midtone"
            >{{ $t("bestPracticeCategoryTitle") }}</BaseHeading
          >
          <BaseHeading
            :centered="false"
            :level="2"
            :class="space.paddingBottomNarrow"
            weight="bold"
            >{{ bestPractices[id - 1].title }}</BaseHeading
          >
          <BaseHeading :centered="false" :level="5">{{
            bestPractices[id - 1].practice
          }}</BaseHeading>
        </BaseWidthWrapper>
      </header>
    </BaseSectionWrapper>
    <BaseSectionWrapper :class="[space.paddingTopNarrow]">
      <!-- body -->
      <BaseWidthWrapper width="default">
        <BaseBodyText
          :content="bestPractices[id - 1].body"
          :class="base.content"
        />
      </BaseWidthWrapper>
    </BaseSectionWrapper>

    <!-- Resources -->
    <BaseSectionWrapper
      v-if="resources.length > 0"
      :class="color.lightBg"
      border
    >
      <BaseHeading :class="space.paddingBottom" :level="2">{{
        $t("bestPracticeResourceSubtitle")
      }}</BaseHeading>
      <BaseWidthWrapper width="xwide">
        <BaseGallery :items="resources" size="large" />
      </BaseWidthWrapper>
    </BaseSectionWrapper>
  </article>
</template>

<script>
import { bestPracticeData } from "@/components/mixins/bestPracticeData.js";
import NavBackLink from "@/components/NavBackLink.vue";
import BasePageIntro from "@/components/BasePageIntro.vue";
import BaseHeading from "@/components/BaseHeading.vue";
import BaseButtonLink from "@/components/BaseButtonLink.vue";
import BaseBodyText from "@/components/BaseBodyText.vue";
import BaseSectionWrapper from "@/components/BaseSectionWrapper.vue";
import BaseWidthWrapper from "@/components/BaseWidthWrapper.vue";
import BaseGallery from "@/components/BaseGallery.vue";

export default {
  name: "BestPractice",
  components: {
    NavBackLink,
    BasePageIntro,
    BaseHeading,
    BaseButtonLink,
    BaseBodyText,
    BaseSectionWrapper,
    BaseWidthWrapper,
    BaseGallery,
  },
  mixins: [bestPracticeData],
  props: {
    id: [String, Number],
  },
  computed: {
    resources: function () {
      return (
        this.bestPractices[this.id - 1].resources &&
        Object.values(this.bestPractices[this.id - 1].resources).map((item) => {
          return {
            title: item.title,
            teaser: item.teaser,
            url: item.url,
          };
        })
      );
    },
  },
};
</script>

<style src="styles/type.scss" lang="scss" module="type"></style>
<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/color.scss" lang="scss" module="color"></style>
<style src="styles/borders.scss" lang="scss" module="border"></style>

<style lang="scss" module="base">
@import "~styleConfig/color";
.resourceCard {
  composes: default round from "styles/borders.scss";
  composes: lightBg from "styles/color.scss";
}

.headerSection {
  background-color: color("accent", $grade: 70);
}

.headerContent {
  p,
  h2,
  h3,
  h4,
  h5 {
    max-width: 43em;
  }
}
</style>
