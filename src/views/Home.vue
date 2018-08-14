<template>
  <article>
    <BasePageIntro
      :title="$t('home.title')"
      :blurb="$t('home.intro')"
    />
    <BaseSectionWrapper>
      <BaseHeading :level="2" centered>{{$t('home.stepsTitle')}}</BaseHeading>
      <BaseWidthWrapper width="wide" :class="space.paddingTop">
        <BaseGutterWrapper el="ol" :class="base.stepWrapper">
          <li v-for="(step, index) in steps" :key="index">
            <div :class="base.step">
              <BaseHeading :level="3" :centered="false">{{step.title}}</BaseHeading>
              <BaseBodyText
                size="zeta"
                :content="step.blurb"
              />
            </div>
          </li>
        </BaseGutterWrapper>
      </BaseWidthWrapper>
    </BaseSectionWrapper>
    <BaseSectionWrapper v-if="!electron" el="div" :class="type.center" border>
      <BaseHeading :level="2" centered>{{$t('home.downloadTitle')}}</BaseHeading>
      <BaseWidthWrapper width="wide" :class="space.paddingTop">
        <BaseBodyText
          size="zeta"
          :content="$t('home.downloadBlurb')"
        />

        <BaseButtonLink
          to="/electron/mac-installer.zip"
          size="small"
          role="primary"
          :label="$t('home.downloadMac')"
          :class="space.marginBottom"
          :router="false"
        />
        <BaseButtonLink
          to="/electron/win-installer.zip"
          size="small"
          role="primary"
          :label="$t('home.downloadWindows')"
          :class="space.marginBottom"
          :router="false"
        />
        <BaseButtonLink
          to="/electron/win-installer-portable.zip"
          size="small"
          role="primary"
          :label="$t('home.downloadWindowsPortable')"
          :class="space.marginBottom"
          :router="false"
        />
      </BaseWidthWrapper>
    </BaseSectionWrapper>
    <BaseSectionWrapper el="div" :class="type.center" border>
      <BaseButtonLink
        :to="{name: 'setup'}"
        size="large"
        role="primary"
        :label="$t('home.getStartedButton')"
        :class="space.marginBottom"
      />
      <ClearItems :clearType="['All']" />
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
import BaseButtonLink from '@/components/BaseButtonLink.vue'
import ClearItems from '@/components/ClearItems.vue'
import { dataMethods } from '@/components/mixins/dataMethods'

export default {
  name: 'Home',
  mixins: [dataMethods],
  components: {
    BasePageIntro,
    BaseSectionWrapper,
    BaseWidthWrapper,
    BaseHeading,
    BaseBodyText,
    BaseGutterWrapper,
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

<style lang="scss" module="base">
@import '~styleConfig/breakpoints';
@import '~styleConfig/scale';
@import '~styleConfig/type';

.stepWrapper {
  composes: centered from 'styles/type.scss';
  counter-reset: steps;
  font-size: 0;

  > li {
    display: inline-block;
    vertical-align: top;
    width: 100%;

    @include media('>small') {
      width: 50%;
    }

    @include media('>medium') {
      width: (100%/3);
    }
  }
}

.step {
  composes: left from 'styles/type.scss';
  composes: paddingLeftWide from 'styles/spacing.scss';
  counter-increment: steps;
  position: relative;

  &::before {
    @include font($weight: 'bold');
    content: counter(steps);
    display: block;
    font-size: scale-type('beta');
    left: 0;
    line-height: 1;
    position: absolute;
    top: 0;
  }
}
</style>
