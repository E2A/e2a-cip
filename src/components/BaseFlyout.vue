<template>
  <aside
    :class="[base.wrapper, base[align]]"
  >
    <slot>Add flyout content here</slot>
  </aside>
</template>

<script>
export default {
  name: 'BaseFlyout',
  props: {
    align: {
      type: String,
      default: 'center'
    },
    size: {
      type: Number,
      default: 12
    },
    el: {
      type: String,
      default: 'aside'
    }
  }
}
</script>

<style lang="scss" module="base">
@import '~bourbon/core/bourbon'; // for triangles
@import '~styleConfig/zIndex';
@import '~styleConfig/color';

$size: 12rem;
$size-pointer-w: 1.2rem;
$size-pointer-h: 0.6rem;

.wrapper {
  composes: lightBg from 'styles/color.scss';
  composes: default round from 'styles/borders.scss';
  box-shadow: 0 1px 0.3rem shadow('light');
  display: block;
  max-height: $size;
  position: absolute;
  text-align: center;
  width: $size;
  z-index: z('high');

  &::before,
  &::after {
    content: ' ';
    display: block;
    position: absolute;
  }

  &::before {
    @include triangle('up', $size-pointer-w, $size-pointer-h, border('light'));
    top: -($size-pointer-h);
  }

  &::after {
    @include triangle('up', $size-pointer-w, $size-pointer-h, color('light'));
    top: -($size-pointer-h - 0.1rem);
  }
}

.center {
  left: 50%;
  margin-left: -($size / 2);

  &::before,
  &::after {
    left: 50%;
    margin-left: -($size-pointer-w / 2);
  }
}

.right {
  right: -0.5rem;

  &::before,
  &::after {
    right: 1rem;
  }
}
</style>
