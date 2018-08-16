<template>
  <header :class="[space.paddingWide, border.bottom]">
    <BaseHeading
      align="center"
      :class="space.paddingBottom"
    >
      {{ title }}
    </BaseHeading>
    <BaseWidthWrapper>
      <BaseBodyText v-if="blurb.length > 0" :content="blurb" />
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
    blurb: {
      type: String
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
