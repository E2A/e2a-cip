<template>
  <NavFooter
    :rightButtons="this.getNavButtons().right"
  >
    <NavBreadcrumbs/>
    <BaseWidthWrapper>
      <BaseGutterWrapper>
        <BaseHeading :class="[space.paddingWide, base.title]" :level="2">{{this.$t('plan.title')}}</BaseHeading>
      </BaseGutterWrapper>
      <BaseGutterWrapper>
        <BaseBodyText :content="this.$t('plan.body')" />
        <BaseHeading :class="[space.padding]" :level="4" :centered="false">{{this.$t('plan.note')}}</BaseHeading>
        <BaseBodyText :content="this.$t('plan.noteBody')" :class="[space.paddingBottomWide]" />
      </BaseGutterWrapper>
    </BaseWidthWrapper>
  </NavFooter>
</template>

<script>
import BaseWidthWrapper from '@/components/BaseWidthWrapper.vue'
import BaseSectionWrapper from '@/components/BaseSectionWrapper.vue'
import BaseHeading from '@/components/BaseHeading.vue'
import BaseBodyText from '@/components/BaseBodyText.vue'
import BaseGutterWrapper from '@/components/BaseGutterWrapper.vue'
import NavFooter from '@/components/NavFooter.vue'
import NavBreadcrumbs from '@/components/NavBreadcrumbs.vue'

export default {
  name: 'Plan',
  components: {
    BaseSectionWrapper,
    BaseWidthWrapper,
    BaseHeading,
    BaseBodyText,
    BaseGutterWrapper,
    NavFooter,
    NavBreadcrumbs
  },
  methods: {
    getNavButtons: function () {
      var navButtons = {
        left: [],
        right: [
          {
            to: { name: 'setup' },
            label: this.$t('plan.getStartedButton').toUpperCase()
          }
        ]
      }

      return navButtons
    }
  }
}
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/borders.scss" lang="scss" module="border"></style>
<style src="styles/type.scss" lang="scss" module="type"></style>
<style src="styles/color.scss" lang="scss" module="color"></style>
<style src="styles/display.scss" lang="scss" module="display"></style>

<style lang="scss" module="base">
@import "~styleConfig/breakpoints";
@import "~styleConfig/scale";
@import "~styleConfig/type";
</style>
