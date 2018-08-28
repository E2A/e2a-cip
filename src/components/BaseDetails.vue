<template>
  <details
    :class="base.wrapper"
    :open="isOpen"
  >
    <!--
      collapsed content
      -> disable element's native behavior and take over with JS
    -->
    <summary :class="base.summary" @click.prevent>
      <BaseGutterWrapper
        :class="base.summaryContent"
        gutterY="narrow"
        gutterX="narrow"
      >
        <div
          @click.prevent="toggleOpen"
          @keyup.enter="toggleOpen"
          :tabindex="0"
          :class="[base.item, base.click, twoColSummary]"
        >
          <slot name="summaryLeft">Add summary here</slot>
        </div>
        <div
          v-if="$slots.summaryRight"
          :class="[base.item, twoColSummary]"
        >
          <slot name="summaryRight"></slot>
        </div>
      </BaseGutterWrapper>
    </summary>

    <!-- expanded content -->
    <div v-show="isOpen">
      <slot>Add expanded details here</slot>
    </div>
  </details>
</template>

<script>
import BaseGutterWrapper from './BaseGutterWrapper.vue'

export default {
  name: 'BaseDetails',
  components: {
    BaseGutterWrapper
  },
  data () {
    return {
      isOpen: false
    }
  },
  computed: {
    twoColSummary: function () {
      // https://stackoverflow.com/questions/47432702/determining-if-slot-content-is-null-or-empty
      return this.$slots.summaryRight && this.base.split
    }
  },
  methods: {
    toggleOpen: function (event) {
      this.isOpen = !this.isOpen
      if (this.isOpen) this.$emit('open')
      if (!this.isOpen) this.$emit('close')
    }
  }
}
</script>

<style lang="scss" module="base">
@import '~bourbon/core/bourbon';
@import '~styleConfig/type';

$icon-size: 1rem;
$icon-margin: 0.8rem;

.wrapper {
  padding-left: ($icon-size) + $icon-margin;
}

.summary {
  composes: default from 'styles/animation.scss';
  display: block;
  position: relative;

  @supports (display: flex) {
    display: flex;
    align-items: center;
  }

  &:focus {
    outline: none;
  }

  // replace with actual icon
  &::before {
    content: '';
    background-image: url('../assets/images/icons/_external/arrow-down-midtone.svg');
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    display: block;
    position: absolute;
    left: -($icon-size + $icon-margin);
    top: 50%;
    margin-top: -($icon-size / 2);
    height: $icon-size;
    width: $icon-size;
    transform: rotate(270deg);

    [open] & {
      transform: rotate(0);
    }
  }
}

.summaryContent {
  display: block;
  position: relative;
  font-size: 0;

  @supports (display: flex) {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
  }
}

.item {
  @include type-size-default();
  display: inline-block;
  vertical-align: middle;

  @supports (flex: 1) {
    flex: 1;
  }
}

.split {
  max-width: 50%;
}

.click {
  cursor: pointer;
}
</style>
