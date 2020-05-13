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
        :class="[base.buttonGroup, base[`buttonGroup${group}`]]"
      >
        <BaseGutterWrapper
          v-if="getGroupProp(group)"
          :class="type[group]"
          gutter-x="narrow"
          gutter-y="narrow"
        >
          <li
            v-for="(button, index) in getGroupProp(group)"
            :class="base.buttonWrapper"
            :key="`navFooter-${group}-${index}`"
          >
            <BaseButton
              v-if="button.type === 'button'"
              :label="button.label"
              :role="button.role || 'default'"
              :icon-left="button.iconLeft || getDefaultIcon(group, 'left')"
              :icon-right="button.iconRight || getDefaultIcon(group, 'right')"
              @click.native="emitAction(button.action)"
            />
            <PrintPage v-if="button.type === 'print'" />
            <BaseButtonLink
              v-else
              :to="button.to"
              :label="button.label"
              :role="button.role || 'default'"
              :icon-left="button.iconLeft || getDefaultIcon(group, 'left')"
              :icon-right="button.iconRight || getDefaultIcon(group, 'right')"
              @click.native="emitAction(button.action)"
            />
          </li>
        </BaseGutterWrapper>
      </div>
    </nav>
  </component>
</template>

<script>
import BaseButton from "@/components/BaseButton.vue";
import PrintPage from "@/components/PrintPage.vue";
import BaseButtonLink from "@/components/BaseButtonLink.vue";
import BaseGutterWrapper from "@/components/BaseGutterWrapper.vue";
import { dataMethods } from "@/components/mixins/dataMethods.js";

export default {
  name: "NavFooter",
  components: {
    BaseGutterWrapper,
    BaseButton,
    BaseButtonLink,
    PrintPage,
  },
  mixins: [dataMethods],
  props: {
    wrapperEl: {
      type: String,
      default: "div",
    },
    leftButtons: Array,
    rightButtons: Array,
  },
  methods: {
    emitAction: function (action) {
      if (action) {
        this.$eventHub.$emit(action);
      }
      this.saveReminder();
    },
    getGroupProp: function (group) {
      return group === "left" ? this.leftButtons : this.rightButtons;
    },
    getDefaultIcon: function (group, side) {
      if (side === "left") {
        return group === "left" ? "arrow-left" : "none";
      }
      return group === "right" ? "arrow-right" : "none";
    },
    saveReminder: function () {
      this.notify(
        this.$root.$t("saveRecommended", { exportLink: "#" }),
        "warning",
        10000
      );
    },
  },
};
</script>

<!-- <style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/borders.scss" lang="scss" module="border"></style> -->
<style src="styles/type.scss" lang="scss" module="type"></style>

<style lang="scss" module="base">
.wrapper {
  // make sure all content can scroll past the sticky nav
  padding-bottom: 5rem;

  @media print {
    padding-bottom: 0;
  }
}

.nav {
  composes: top from "styles/borders.scss";
  composes: whiteBg shadow from "styles/color.scss";
  composes: paddingHorizontal paddingVerticalNarrow from "styles/spacing.scss";
  display: block;
  position: fixed;
  z-index: 1000; // Breakpoint for content you want above/below footer
  left: 0;
  right: 0;
  bottom: 0;
  font-size: 0;

  @media print {
    display: none;
  }
}

.buttonGroup {
  display: inline-block;
  width: 50%;
  text-transform: uppercase;
}

.buttonGroupleft {
  width: 40%;
}

.buttonGroupright {
  width: 60%;
}

.buttonWrapper {
  display: inline-block;
}
</style>
