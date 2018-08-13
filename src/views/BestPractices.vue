<template>
  <NavFooter
    wrapperEl="article"
    :leftButtons="navButtons.left"
    :rightButtons="navButtons.right"
  >
    <BasePageIntro
      :title="$t('bestPracticeTitle')"
      :blurb="$t('bestPracticeIntro')"
    />
    <div :class="space.paddingWide">
      <BaseWidthWrapper>
        <BaseVerticalList :items="bestPractices" borders>
          <BaseGutterWrapper
            el="section"
            :class="base.card"
            slot-scope="{ item }"
          >
            <div :class="base.iconWrapper">
              <img
                :class="base.icon"
                :src="item.icon"
                :alt="item.title"
              />
            </div>
            <div :class="base.summary">
              <BaseHeading
                :level="2"
                scale="gamma"
                :class="space.paddingBottomXnarrow"
                :centered="false"
              >
                {{ item.title }}
              </BaseHeading>
              <BaseBodyText
                :content="item.teaser"
                size="zeta"
              />
              <BaseButtonLink
                :to="`/evidence-informed-practice/${item.id}`"
                :label="$t('readMore')"
                size="small"
                :class="space.marginTopNarrow"
              />
            </div>
          </BaseGutterWrapper>
        </BaseVerticalList>
      </BaseWidthWrapper>
    </div>
  </NavFooter>
</template>

<script>
import { bestPracticeData } from '@/components/mixins/bestPracticeData.js'
import BasePageIntro from '@/components/BasePageIntro.vue'
import BaseHeading from '@/components/BaseHeading.vue'
import BaseBodyText from '@/components/BaseBodyText.vue'
import BaseWidthWrapper from '@/components/BaseWidthWrapper.vue'
import BaseVerticalList from '@/components/BaseVerticalList.vue'
import BaseGutterWrapper from '@/components/BaseGutterWrapper.vue'
import BaseButtonLink from '@/components/BaseButtonLink.vue'
import NavFooter from '@/components/NavFooter.vue'

export default {
  name: 'BestPractices',
  mixins: [ bestPracticeData ],
  components: {
    BasePageIntro,
    BaseHeading,
    BaseBodyText,
    BaseWidthWrapper,
    BaseVerticalList,
    BaseGutterWrapper,
    BaseButtonLink,
    NavFooter
  },
  data: function () {
    return {
      navButtons: {
        left: [
          {
            to: {name: 'summary'},
            label: this.$t('goBack')
          }
        ],
        right: [
          {
            to: {name: 'assessment'},
            label: 'Analysis',
            role: 'primary'
          }
        ]
      }
    }
  }
}
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>

<style lang="scss" module="base">
  .card {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }

  .iconWrapper {
    flex: 1 0 4rem;
    text-align: center;
  }

  .icon {
    display: inline-block;
    max-width: 6rem;
  }

  .summary {
    flex: 1 0 26rem;
  }
</style>
