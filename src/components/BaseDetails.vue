<template>
  <details :class="base.wrapper">
    <summary :class="base.summary" @click.prevent>
      <div :class="base.summaryContent">
        <div
          :tabindex="0"
          :class="[base.item, base.click, base.col5]"
        >
          <slot name="summaryLeft">Add summary here</slot>
        </div>
        <div v-if="$slots.summaryRight" :class="[base.item, base.col7]">
          <slot name="summaryRight"></slot>
        </div>
      </div>
    </summary>
  </details>
</template>

<script>
import BaseGutterWrapper from "./BaseGutterWrapper.vue";

export default {
  name: "BaseDetails",
  components: {
    BaseGutterWrapper
  },
  computed: {
    twoColSummary: function() {
      // https://stackoverflow.com/questions/47432702/determining-if-slot-content-is-null-or-empty
      return this.$slots.summaryRight && this.base.split;
    }
  }
};
</script>

<style lang="scss" module="base">
@import "~bourbon/core/bourbon";
@import "~styleConfig/type";
@import "~styleConfig/spacing";
@import "~styleConfig/breakpoints";

$icon-size: 1rem;
$icon-margin: 0.8rem;
$breakpoint: "medium";

.wrapper {
  padding-left: 0;
}

.summary {
  composes: default from "styles/animation.scss";
  display: block;
  position: relative;
  padding: 0;
  font-size: 0; // kill whitespace bugs in webkit
  list-style-image: none;

  @include media(">#{$breakpoint}") {
    @supports (display: flex) {
      display: flex;
      align-items: center;
    }
  }

  &:focus {
    outline: none;
  }

  &::-webkit-details-marker {
    background: transparent;
    color: transparent;
  }
}

.summaryContent {
  display: block;
  position: relative;
  padding: 0 space('xnarrow');

  @include media(">#{$breakpoint}") {
    @supports (display: flex) {
      display: flex;
      flex: 1;
      justify-content: space-between;
      align-items: flex-start;
    }
  }
}

.item {
  @include type-size-default();
  display: inline-block;
  vertical-align: middle;
  width: calc(100% - 1rem);

  &:focus {
    outline: none;
  }
}

.split {
  width: 100%;

  @include media(">#{$breakpoint}") {
    width: 50%;

    @supports (flex: 1) {
      flex: 1;
      flex-basis: 50%;
    }
  }
}

.col7 {
width: 100%;

  @include media(">#{$breakpoint}") {
    width: 58.3333%;

    @supports (flex: 1) {
      flex: 1;
      flex-basis: 58.3333%;
    }
  }
}

.col5 {
width: 100%;

  @include media(">#{$breakpoint}") {
    width: 41.6666%;

    @supports (flex: 1) {
      flex: 1;
      flex-basis: 41.6666%;
    }
  }
}

.click {
  cursor: pointer;
}
</style>
