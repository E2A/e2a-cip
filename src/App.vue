<template>
  <div id="app">
    <NavHeader/>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import NavHeader from '@/components/NavHeader.vue'

export default {
  name: 'AppRoot',
  components: {
    NavHeader
  }
}

</script>

<style lang="scss">
// Default box model, scaling, and type styles
// --> note these styles are not scoped/modules, so they apply to the whole app

@import '~normalize.css';
@import './stylesheets/config/breakpoints';
@import './stylesheets/config/type';

$font-path: '/public/fonts';

$base-type-sizes: (
  'default': 90%,
  'xsmall': 100%,
  'small': 110%,
  'medium': 120%,
  'large': 125%
);

@mixin font-face($name, $path, $weight: 'normal', $style: 'normal') {
  @font-face {
    font-family: $name;
    src: url('#{$font-path}/#{$path}.eot');
    src: url('#{$font-path}/#{$path}.eot?#iefix') format('embedded-opentype'),
         url('#{$font-path}/#{$path}.woff2') format('woff2'),
         url('#{$font-path}/#{$path}.woff') format('woff');
    font-weight: $weight;
    font-style: $style;
    font-stretch: normal;
    font-display: swap;
  }
}

html {
  box-sizing: border-box;
  font-size: map-get($base-type-sizes, 'default');

  @each $screen, $size in $base-type-sizes {
    @if $screen != 'default' {
      @include media('>#{$screen}') {
        font-size: $size;
      }
    }
  }
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

body {
  @include font;
  line-height: leading();
  font-feature-settings: 'liga', 'kern';
}

audio,
canvas,
img,
video {
    vertical-align: middle;
    max-width: 100%;
}
</style>
