<template>
  <header :class="[space.paddingWide, border.bottom]">
    <BaseHeading
      :class="[subtitle ? space.paddingBottomXnarrow : space.paddingBottom]"
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
  </header>
</template>

<script>
import BaseWidthWrapper from '@/components/BaseWidthWrapper.vue'
import BaseHeading from '@/components/BaseHeading.vue'
import BaseBodyText from '@/components/BaseBodyText.vue'

export default {
  name: 'BasePageIntro',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String
    },
    blurb: {
      type: String,
      default: ''
    }
  },
  components: {
    BaseWidthWrapper,
    BaseHeading,
    BaseBodyText
  }
}
</script>

<style src="styles/borders.scss" lang="scss" module="border"></style>
<style src="styles/spacing.scss" lang="scss" module="space"></style>
