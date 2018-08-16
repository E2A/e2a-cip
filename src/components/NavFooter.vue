<!--
  Footer Nav component
  -> a sticky nav with back/forward/action buttons, allowing you to move to from one screen to another
-->

<template>
  <component :is="wrapperEl" :class="base.wrapper">
    <slot>Add content here</slot>
    <nav :class="base.nav">
      <div
        v-for="(group, index) in ['left', 'right']"
        :key="`navFooter-${index}`"
        :class="base.buttonGroup"
      >
        <BaseGutterWrapper
          v-if="getGroupProp(group)"
          :class="type[group]"
          gutterX="narrow"
          gutterY="narrow"
        >
          <li
            v-for="(button, index) in getGroupProp(group)"
            :class="base.buttonWrapper"
            :key="`navFooter-${group}-${index}`"
          >
            <BaseButtonLink
              v-if="button.type !== 'button'"
              :to="button.to"
              :label="button.label"
              :role="button.role || 'default'"
              size="small"
            />
            <BaseButton
              v-if="button.type === 'button'"
              :label="button.label"
              :role="button.role || 'default'"
              @click="button.click"
              size="small"
            />
            <PrintPage v-if="button.type === 'print'" />
          </li>
        </BaseGutterWrapper>
      </div>
    </nav>
  </component>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue'
import PrintPage from '@/components/PrintPage.vue'
import BaseButtonLink from '@/components/BaseButtonLink.vue'
import BaseGutterWrapper from '@/components/BaseGutterWrapper.vue'

export default {
  name: 'NavFooter',
  props: {
    wrapperEl: {
      type: String,
      default: 'div'
    },
    leftButtons: Array,
    rightButtons: Array
  },
  components: {
    BaseGutterWrapper,
    BaseButton,
    BaseButtonLink,
    PrintPage
  },
  methods: {
    getGroupProp: function (group) {
      return group === 'left' ? this.leftButtons : this.rightButtons
    }
  }
}
</script>

<!-- <style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/borders.scss" lang="scss" module="border"></style> -->
<style src="styles/type.scss" lang="scss" module="type"></style>

<style lang="scss" module="base">
.wrapper {
  padding-bottom: 5rem;
}
.nav {
  composes: top from 'styles/borders.scss';
  composes: lightBg from 'styles/color.scss';
  composes: paddingHorizontalWide paddingVerticalNarrow from 'styles/spacing.scss';
  display: block;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  font-size: 0;
}

.buttonGroup {
  display: inline-block;
  width: 50%;
}

.buttonWrapper {
  display: inline-block;
}
</style>
