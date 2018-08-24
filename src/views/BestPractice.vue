<template>
  <article>
    <NavBackLink
      :url="{name: 'evidence-informed-practices'}"
      :label="$t('backToBestPractices')"
    />
    <BaseSectionWrapper :class="space.paddingTopNarrow">
      <!-- title -->
      <header :class="space.paddingVerticalWide">
        <BaseHeading
          scale="epsilon"
          :sub="true"
          weight="bold"
          color="midtone"
          :class="[space.paddingBottomNarrow, type.uppercase]"
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
    <BaseSectionWrapper
      v-if="resources.length > 0"
      :class="color.lightBg"
      border
    >
      <BaseHeading
        :class="space.paddingBottom"
        :level="2"
      >
        {{$t('bestPracticeResourceSubtitle')}}
      </BaseHeading>
      <BaseWidthWrapper width="xxwide">
        <BaseGallery size="large" :items="resources" />
      </BaseWidthWrapper>
    </BaseSectionWrapper>
  </article>
</template>

<script>
import { bestPracticeData } from '@/components/mixins/bestPracticeData.js'
import NavBackLink from '@/components/NavBackLink.vue'
import BasePageIntro from '@/components/BasePageIntro.vue'
import BaseHeading from '@/components/BaseHeading.vue'
import BaseButtonLink from '@/components/BaseButtonLink.vue'
import BaseBodyText from '@/components/BaseBodyText.vue'
import BaseSectionWrapper from '@/components/BaseSectionWrapper.vue'
import BaseWidthWrapper from '@/components/BaseWidthWrapper.vue'
import BaseGallery from '@/components/BaseGallery.vue'

export default {
  name: 'BestPractice',
  mixins: [bestPracticeData],
  components: {
    NavBackLink,
    BasePageIntro,
    BaseHeading,
    BaseButtonLink,
    BaseBodyText,
    BaseSectionWrapper,
    BaseWidthWrapper,
    BaseGallery
  },
  props: {
    id: [String, Number]
  },
  computed: {
    resources: function () {
      return Object.values(this.bestPractices[this.id - 1].resources).map(item => {
        return {
          title: item.title,
          teaser: item.teaser,
          url: item.url
        }
      })
    }
  }
}
</script>

<style src="styles/type.scss" lang="scss" module="type"></style>
<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/color.scss" lang="scss" module="color"></style>
<style src="styles/borders.scss" lang="scss" module="border"></style>

<style lang="scss" module="base">
.resourceCard {
  composes: default round from 'styles/borders.scss';
  composes: lightBg from 'styles/color.scss';
}
</style>
