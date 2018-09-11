<template>
  <NavFooter
    wrapperEl="article"
    :leftButtons="navButtons.left"
    :rightButtons="navButtons.right"
  >
    <BasePageIntro
      :title="$t('bestPracticeTitle')"
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
              <router-link
                :to="{
                  name: 'evidence-informed-practice',
                  params: {id: item.id}
                }"
                :class="base.icon"
              >
                <BaseIcon
                  :name="item.icon"
                  size="5rem"
                />
              </router-link>
            </div>
            <div :class="base.summary">
              <BaseHeading
                :level="2"
                :class="[space.paddingBottomNarrow]"
                :centered="false"
                scale="gamma"
              >
                <router-link :to="{
                  name: 'evidence-informed-practice',
                  params: {id: item.id}
                }">
                  {{ item.title }}
                </router-link>
              </BaseHeading>
              <BaseBodyText
                :content="item.teaser"
                size="epsilon"
              />
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
import BaseIcon from '@/components/BaseIcon.vue'
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
    BaseIcon,
    BaseWidthWrapper,
    BaseVerticalList,
    BaseGutterWrapper,
    BaseButtonLink,
    NavFooter
  },
  computed: {
    navButtons: function () {
      return {
        left: [
          {
            to: {name: 'summary'},
            label: this.$t('goBack')
          }
        ],
        right: [
          {
            to: {name: 'assessment'},
            label: this.$t('nav.assessment'),
            role: 'primary'
          }
        ]
      }
    }
  }
}
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/type.scss" lang="scss" module="type"></style>

<style lang="scss" module="base">
  .card {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }

  .iconWrapper {
    // flex: 1 0 4rem;
    text-align: center;
  }

  .icon {
    $size: 5rem;
    composes: accent from 'styles/color.scss';
    display: inline-block;
    max-width: $size;
    max-height: $size;
  }

  .summary {
    flex: 1 0 28rem;
  }
</style>
