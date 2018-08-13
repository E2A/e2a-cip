<!--
  Wrapper component
  -> a simple layout wrapper that limits max width
-->

<template>
  <div :class="[$style.wrapper, width !== 'none' && $style[width]]">
    <slot>Add some stuff here!</slot>
  </div>
</template>

<script>
export default {
  name: 'BaseWidthWrapper',
  props: {
    width: {
      default: 'default',
      type: String
    }
  }
}
</script>

<style lang="scss" module>
// available widths of main layout
$layout-widths: (
  'narrow'  : 22rem,
  'default' : 37.5rem,
  'wide'    : 64rem,
);

.wrapper {
  display: block;
  position: relative;
  margin-left: auto;
  margin-right: auto;
}

// modifiers for variations in width
@each $name, $width in $layout-widths {
  .#{$name} {
    max-width: map-get($layout-widths, $name);
  }
}
</style>
