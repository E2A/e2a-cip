<template>
  <article>

    <BaseWidthWrapper :class="[space.paddingVerticalWide, border.bottom]">
      <img
        :class="base.logo"
        src="@/assets/images/logos/usaid-lockup.svg"
        alt="USAID and E2A"
      />
    </BaseWidthWrapper>

    <!-- Intro -->
    <BasePageIntro
      :title="$t('home.title')"
      :subtitle="$t('home.subtitle')"
      :blurb="$t('home.intro')"
    />

    <!-- How it works -->
    <BaseSectionWrapper>
      <BaseHeading :level="2" centered>{{$t('home.stepsTitle')}}</BaseHeading>
      <BaseWidthWrapper width="wide" :class="space.paddingTop">
        <BaseStepList :steps="steps" />
      </BaseWidthWrapper>
    </BaseSectionWrapper>

    <!-- Get started! -->
    <BaseSectionWrapper el="div" :class="type.center" border>
      <BaseButtonLink
        :to="{name: 'setup'}"
        size="large"
        role="primary"
        :label="$t('home.getStartedButton')"
      />
      <ClearItems :clearType="['All']" />
    </BaseSectionWrapper>

    <!-- Offline versions -->
    <BaseSectionWrapper
      v-if="!electron"
      :class="color.well"
      el="div"
      border
    >
      <BaseHeading
        :level="2"
        centered
      >
        {{$t('home.downloadTitle')}}
      </BaseHeading>
      <BaseWidthWrapper
        :class="space.paddingTop"
      >
        <BaseBodyText
          :content="$t('home.downloadBlurb')"
          :class="base.centeredSubheads"
        />
        <BaseGutterWrapper
          :class="[space.paddingTop, type.center]"
          gutterX="xnarrow"
          gutterY="xnarrow"
        >
          <li :class="base.gutterItem">
            <BaseButtonLink
              :to="$t('home.downloadMacUrl')"
              :label="$t('home.downloadMac')"
              :router="false"
            />
          </li>
          <li :class="base.gutterItem">
            <BaseButtonLink
              :to="$t('home.downloadWindowsUrl')"
              :label="$t('home.downloadWindows')"
              :router="false"
            />
          </li>
          <li :class="base.gutterItem">
            <BaseButtonLink
              :to="$t('home.downloadWindowsPortableUrl')"
              :label="$t('home.downloadWindowsPortable')"
              :router="false"
            />
          </li>
        </BaseGutterWrapper>
      </BaseWidthWrapper>
    </BaseSectionWrapper>
  </article>
</template>

<script>
import i18n from '@/i18n.js'
import BasePageIntro from '@/components/BasePageIntro.vue'
import BaseWidthWrapper from '@/components/BaseWidthWrapper.vue'
import BaseSectionWrapper from '@/components/BaseSectionWrapper.vue'
import BaseHeading from '@/components/BaseHeading.vue'
import BaseBodyText from '@/components/BaseBodyText.vue'
import BaseGutterWrapper from '@/components/BaseGutterWrapper.vue'
import BaseStepList from '@/components/BaseStepList.vue'
import BaseButtonLink from '@/components/BaseButtonLink.vue'
import ClearItems from '@/components/ClearItems.vue'
import { dataMethods } from '@/components/mixins/dataMethods'
import { initData } from '@/components/mixins/initData.js'

export default {
  name: 'Home',
  mixins: [dataMethods, initData],
  components: {
    BasePageIntro,
    BaseSectionWrapper,
    BaseWidthWrapper,
    BaseHeading,
    BaseBodyText,
    BaseGutterWrapper,
    BaseStepList,
    BaseButtonLink,
    ClearItems
  },
  data: function () {
    return {
      steps: Object.values(i18n.messages[i18n.locale].home.steps).map((step, index) => {
        return {
          title: this.$t(`home.steps.step${index + 1}.title`),
          blurb: this.$t(`home.steps.step${index + 1}.blurb`)
        }
      }),
      electron: this.checkElectron()
    }
  }
}
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/borders.scss" lang="scss" module="border"></style>
<style src="styles/type.scss" lang="scss" module="type"></style>
<style src="styles/color.scss" lang="scss" module="color"></style>

<style lang="scss" module="base">
@import '~styleConfig/breakpoints';
@import '~styleConfig/scale';
@import '~styleConfig/type';

.logo {
  display: block;
  max-width: 35rem;
  margin: 0 auto;
}

.centeredSubheads {
  // center all heading elements
  $list: ();
  @each $i in [1, 2, 3, 4, 5, 6] {
    $list: append($list, unquote('h#{$i}'), 'comma');
  }

  #{$list} {
    text-align: center;
  }
}

.gutterItem {
  display: inline-block;
}
</style>
