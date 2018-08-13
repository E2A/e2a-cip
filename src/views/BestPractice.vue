<template>
  <article>
    <BaseSectionWrapper :class="space.paddingTopNarrow">
      <div :class="[space.paddingBottomNarrow, border.bottom]">
        <router-link
          :to="{name: 'best-practices'}"
          :class="base.back"
        >
          &lsaquo; {{$t('backToBestPractices')}}
        </router-link>
      </div>
      <BaseWidthWrapper>
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
        <BaseBodyText :content="bestPractices[id - 1].body" />
      </BaseWidthWrapper>
    </BaseSectionWrapper>
  </article>
</template>

<script>
import { bestPracticeData } from '@/components/mixins/bestPracticeData.js'
import BasePageIntro from '@/components/BasePageIntro.vue'
import BaseHeading from '@/components/BaseHeading.vue'
import BaseBodyText from '@/components/BaseBodyText.vue'
import BaseSectionWrapper from '@/components/BaseSectionWrapper.vue'
import BaseWidthWrapper from '@/components/BaseWidthWrapper.vue'

export default {
  name: 'BestPractice',
  mixins: [bestPracticeData],
  components: {
    BasePageIntro,
    BaseHeading,
    BaseBodyText,
    BaseSectionWrapper,
    BaseWidthWrapper
  },
  props: {
    id: String
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
</style>
