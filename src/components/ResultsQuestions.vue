<template>
  <div :class="[type.scaleZeta, color.dark, type.bold]">
    <BaseHeading
      :level="4"
      :centered="false"
      :class="space.paddingBottomXnarrow"
      scale="epsilon"
      color="dark"
      weight="bold"
    >
      {{$t('results.indicatorQuestions')}}
    </BaseHeading>
    <ol :class="base.questionList">
      <li
        v-for="(question, index) in questions"
        :key="`question-${index}`"
      >
        <BaseBodyText
          :content="question"
          :class="color.dark"
          font="display"
        />
      </li>
    </ol>
  </div>
</template>

<script>
import BaseHeading from './BaseHeading.vue'
import BaseBodyText from './BaseBodyText.vue'

export default {
  name: 'ResultsQuestions',
  props: {
    questions: {
      type: Array,
      required: true
    }
  },
  components: {
    BaseHeading,
    BaseBodyText
  }
}
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/color.scss" lang="scss" module="color"></style>
<style src="styles/type.scss" lang="scss" module="type"></style>

<style lang="scss" module="base">
.questionList {
  padding-left: 1.2em;

  > li + li {
    padding-top: 0.5em;
  }
}
</style>
