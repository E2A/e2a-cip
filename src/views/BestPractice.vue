<template>
  <article>
    <BaseSectionWrapper :class="space.paddingTopNarrow">
      <!-- back link -->
      <div :class="[space.paddingBottomNarrow, border.bottom]">
        <router-link
          :to="{name: 'evidence-informed-practices'}"
          :class="base.back"
        >
          &lsaquo; {{$t('backToBestPractices')}}
        </router-link>
      </div>

      <!-- title -->
      <header :class="space.paddingVerticalWide">
        <BaseHeading
          scale="delta"
          :sub="true"
          :class="[space.paddingBottomXnarrow, color.midtone]"
        >
          {{ $t('bestPracticeSubtitle') }}
        </BaseHeading>
        <BaseHeading>{{ bestPractices[id - 1].title }}</BaseHeading>
      </header>

      <!-- body -->
      <BaseWidthWrapper>
        <BaseBodyText :content="bestPractices[id - 1].body" />
      </BaseWidthWrapper>
    </BaseSectionWrapper>

    <!-- Resources -->
    <BaseSectionWrapper border>
      <BaseWidthWrapper width="wide">
        <ul>
          <li
            v-for="(item ,index) of resources"
            :class="base.resourceCard"
            :key="`res-${index}`"
          >
            <BaseHeading
              :class="space.paddingBottomXnarrow"
              :level="3"
              :centered="false"
              scale="delta"
            >
              {{ item.resource.title }}
            </BaseHeading>
            <BaseBodyText
              :class="space.paddingBottomNarrow"
              :content="item.resource.teaser"
              size="zeta"
            />
            <BaseButtonLink
              :to="item.resource.url"
              size="small"
              role="primary"
              :label="$t('downloadResource')"
              :class="space.marginBottom"
              :router="false"
            />
          </li>
        </ul>
      </BaseWidthWrapper>
    </BaseSectionWrapper>
  </article>
</template>

<script>
import { bestPracticeData } from '@/components/mixins/bestPracticeData.js'
import BasePageIntro from '@/components/BasePageIntro.vue'
import BaseHeading from '@/components/BaseHeading.vue'
import BaseButtonLink from '@/components/BaseButtonLink.vue'
import BaseBodyText from '@/components/BaseBodyText.vue'
import BaseSectionWrapper from '@/components/BaseSectionWrapper.vue'
import BaseWidthWrapper from '@/components/BaseWidthWrapper.vue'

export default {
  name: 'BestPractice',
  mixins: [bestPracticeData],
  components: {
    BasePageIntro,
    BaseHeading,
    BaseButtonLink,
    BaseBodyText,
    BaseSectionWrapper,
    BaseWidthWrapper
  },
  props: {
    id: String
  },
  computed: {
    resources: function () {
      return this.bestPractices[this.id - 1].resources
    }
  },
  created () {
    console.log(this.bestPractices[this.id - 1].resources[0].resource.title)
  }
}
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/color.scss" lang="scss" module="color"></style>
<style src="styles/borders.scss" lang="scss" module="border"></style>

<style lang="scss" module="base">
.back {
  composes: midtone from 'styles/color.scss';
  text-decoration: none;

  &:hover,
  &:active {
    text-decoration: underline;
  }
}

.resourceCard {
  composes: default round from 'styles/borders.scss';
  composes: lightBg from 'styles/color.scss';
}
</style>
