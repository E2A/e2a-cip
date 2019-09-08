<template>
  <header :class="[space.paddingWide, border.bottom]">
    <BaseWidthWrapper :class="[base.wrapper, base.headlineWrapper]" width="wide">
      <BaseGutterWrapper :class="base.col12">
        <BaseHeading
          :class="[subtitle ? space.paddingBottomXnarrow : space.paddingBottom, base.title]"
        >{{ title }}</BaseHeading>
      </BaseGutterWrapper>
    </BaseWidthWrapper>

    <BaseWidthWrapper :class="[base.wrapper]" width="wide">
      <div :class="base.col6" >
        <BaseHeading v-if="subtitle" :class="space.paddingBottom" scale="delta" sub :centered="false">{{ subtitle }}</BaseHeading>
        <BaseHeading
          v-if="introHeader"
          :class="space.paddingBottom"
          scale="delta"
          sub
          :centered="false"
        >{{ introHeader }}</BaseHeading>
      </div>

      <div :class="[base.col6, color.well]">
        <BaseWidthWrapper v-if="blurb && blurb.length > 0">
          <BaseBodyText :content="blurb" />
        </BaseWidthWrapper>
      </div>
    </BaseWidthWrapper>
  </header>
</template>

<script>
import BaseWidthWrapper from "@/components/BaseWidthWrapper.vue";
import BaseGutterWrapper from "@/components/BaseGutterWrapper.vue";
import BaseHeading from "@/components/BaseHeading.vue";
import BaseBodyText from "@/components/BaseBodyText.vue";

export default {
  name: "BasePageIntro",
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String
    },
    introHeader: {
      type: String
    },
    blurb: {
      type: String,
      default: ""
    }
  },
  components: {
    BaseWidthWrapper,
    BaseGutterWrapper,
    BaseHeading,
    BaseBodyText
  }
};
</script>

<style src="styles/borders.scss" lang="scss" module="border"></style>
<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/color.scss" lang="scss" module="color"></style>

<style lang="scss" module="base">
@import '~styleConfig/spacing';

.title {
  margin: 0 auto;
  max-width: 1000px;
}

.wrapper {
  display: flex;
  flex-direction: row;
  padding: space('medium') space('narrow');
}

.col6 {
  flex: 1;
  max-width: 50%;
  flex-basis: 50%;
  padding: space('medium') space('medium');
}

.col12 {
  flex: 1;
  max-width: 100%;
  flex-basis: 100%;
}
</style>
