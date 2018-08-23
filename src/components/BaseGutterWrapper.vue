<!--
  Gutter Wrapper component
  -> adds even spacing between child elements in all directions
  -> maintains spacing regardless of flow
-->

<template>
  <component
    :is="el"
    :class="[
      base[`horizontal${gutterX}`],
      base[`vertical${gutterY}`],
      flush && base[`flushHorizontal${gutterX}`],
      flush && base[`flushVertical${gutterY}`]
    ]"
  >
    <slot><!-- Add child elements here --></slot>
  </component>
</template>

<script>
export default {
  name: 'BaseGutterWrapper',
  props: {
    el: {
      type: String,
      default: 'div'
    },
    gutterX: {
      type: String,
      default: 'medium'
    },
    gutterY: {
      type: String,
      default: 'medium'
    },
    flush: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" module="base">
@import '~styleConfig/spacing';
@import '~styleConfig/type';

.wrapper {
  display: block;
}

@each $name, $width in $spacing {
  .horizontal#{$name} {
    composes: wrapper;
    padding-left: space($name, $split: true);
    padding-right: space($name, $split: true);

    > * {
      padding-left: space($name, $split: true);
      padding-right: space($name, $split: true);
    }
  }

  .vertical#{$name} {
    composes: wrapper;
    padding-top: space($name, $split: true);
    padding-bottom: space($name, $split: true);

    > * {
      padding-top: space($name, $split: true);
      padding-bottom: space($name, $split: true);
    }
  }

  .flushHorizontal#{$name} {
    margin-left: -(space($name));
    margin-right: -(space($name));
  }

  .flushVertical#{$name} {
    margin-top: -(space($name));
    margin-bottom: -(space($name));
  }
}
</style>
