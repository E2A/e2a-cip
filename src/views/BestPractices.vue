<template>
  <NavFooter wrapperEl="article" :leftButtons="navButtons.left" :rightButtons="navButtons.right">
    <NavBreadcrumbs v-if="this.$route.name === 'evidence-informed-practices'"/>
    <BasePageIntro
      :title="$t('bestPracticeTitle')"
      :subtitle="$t('bestPracticeSubtitle')"
      :blurb="$t('bestPracticesContent')"
    />

    <div :class="space.paddingWide">
      <BaseWidthWrapper width="wide">
        <BaseColumnLayout :items="bestPractices" :borders="false">
          <BaseGutterWrapper el="section" :class="base.card" slot-scope="{ item }">
            <div :class="base.iconWrapper">
              <router-link
                :to="{
                  name: 'evidence-informed-practice',
                  params: {id: item.id}
                }"
                :class="base.icon"
              >
                <BaseIcon :name="item.icon" size="3rem" />
              </router-link>
            </div>
            <div :class="base.summary">
              <BaseHeading
                :level="2"
                :class="[space.paddingBottomNarrow]"
                :centered="false"
                scale="gamma"
              >
                <router-link
                  :class="base.title"
                  :to="{
                  name: 'evidence-informed-practice',
                  params: {id: item.id}
                }"
                >{{ item.title }}</router-link>
              </BaseHeading>
              <BaseBodyText :content="item.teaser" size="epsilon" />
              <BaseButtonLink
                :to="{
                  name: 'evidence-informed-practice',
                  params: {id: item.id}
                }"
                :label="$t('readMore')"
                :class="space.marginTopNarrow"
                size="small"
                iconRight="arrow-right"
              />
              <BaseButtonLink
                v-if="item.checkListName"
                :to="`/uploads/checklists/${item.checkListName}`"
                :label="$t('checkListButtonText')"
                size="small"
                role="primary"
                :class="space.marginLeftNarrow"
                :router="false"
                target="_blank"
              />
            </div>
          </BaseGutterWrapper>
        </BaseColumnLayout>
      </BaseWidthWrapper>
    </div>
  </NavFooter>
</template>

<script>
import { bestPracticeData } from "@/components/mixins/bestPracticeData.js";
import BasePageIntro from "@/components/BasePageIntro.vue";
import BaseHeading from "@/components/BaseHeading.vue";
import BaseBodyText from "@/components/BaseBodyText.vue";
import BaseIcon from "@/components/BaseIcon.vue";
import BaseWidthWrapper from "@/components/BaseWidthWrapper.vue";
import BaseColumnLayout from "@/components/BaseColumnLayout.vue";
import BaseGutterWrapper from "@/components/BaseGutterWrapper.vue";
import BaseButtonLink from "@/components/BaseButtonLink.vue";
import NavFooter from "@/components/NavFooter.vue";
import NavBreadcrumbs from '@/components/NavBreadcrumbs.vue'

export default {
  name: "BestPractices",
  mixins: [bestPracticeData],
  components: {
    BasePageIntro,
    BaseHeading,
    BaseBodyText,
    BaseIcon,
    BaseWidthWrapper,
    BaseColumnLayout,
    BaseGutterWrapper,
    BaseButtonLink,
    NavFooter,
    NavBreadcrumbs
  },
  computed: {
    navButtons: function() {
      return {
        left: [
          {
            to: { name: "summary" },
            label: this.$t("goBack")
          }
        ],
        right: [
          {
            to: { name: "assessment" },
            label: this.$t("nav.assessment"),
            role: "primary"
          }
        ]
      };
    }
  }
};
</script>
<style src="styles/color.scss" lang="scss" module="color"></style>
<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/type.scss" lang="scss" module="type"></style>

<style lang="scss" module="base">
@import '~styleConfig/color';
@import "~styleConfig/spacing";

.card {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;

  &:hover {
    .icon {
      text-decoration: none;
      &:after {
        opacity: 1;
        transform: scale(1);
      }
    }
  }
}

.iconWrapper {
  // flex: 1 0 4rem;
  text-align: center;
  position: relative;
}

.icon {
  $size: 3rem;
  composes: accent from "styles/color.scss";
  display: inline-block;
  max-width: $size;
  max-height: $size;
  position: relative;

  &:after {
    border-radius: 50%;
    box-shadow: 0 0 0 3px color("accent");
    content: "";
    height: 120%;
    left: -10%;
    position: absolute;
    opacity: 0;
    top: -12%;
    transform: scale(0.75);
    transition: transform 0.2s, opacity 0.2s;
    width: 120%;
  }
}

.summary {
  flex: 1;
}

.title {
  :hover {
    border-bottom: 0;
  }
}
</style>
