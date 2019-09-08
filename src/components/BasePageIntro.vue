<template>
  <header :class="[space.paddingWide, border.bottom]">
    <slot>
      <BaseHeading
        :class="[subtitle ? space.paddingBottomXnarrow : space.paddingBottom, base.title]"
      >
        {{ title }}
      </BaseHeading>
      <BaseHeading
        v-if="subtitle"
        :class="space.paddingBottom"
        scale="gamma"
        sub
      >
        {{ subtitle }}
      </BaseHeading>
      <BaseWidthWrapper v-if="blurb && blurb.length > 0">
        <BaseBodyText :content="blurb" />
      </BaseWidthWrapper>
    </slot>
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

.container {
  max-width: 65rem;
  margin: 0 auto;
}
</style>
