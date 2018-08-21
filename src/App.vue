<template>
  <div id="app">
    <NavHeader :key="this.getItemCount('all')" />
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import 'normalize.css' // global reset styles - import here b/c sass doesn't like importing vanilla css
import NavHeader from '@/components/NavHeader.vue'
import { dataMethods } from '@/components/mixins/dataMethods.js'

export default {
  name: 'AppRoot',
  mixins: [ dataMethods ],
  components: {
    NavHeader
  }
}

</script>

<style lang="scss">
// Default box model, scaling, and type styles
// --> note these styles are not scoped/modules, so they apply to the whole app

@import './stylesheets/config/breakpoints';
@import './stylesheets/config/type';

$base-type-sizes: (
  'default': 90%,
  'xsmall': 100%,
  'small': 110%,
  'medium': 120%,
  'large': 125%
);

@mixin font-face($name, $path, $weight: 'normal', $style: 'normal') {
  $font-path: '/assets/fonts';

  @font-face {
    font-family: $name;
    src: url('#{$font-path}/#{$path}.eot');
    src: url('#{$font-path}/#{$path}.eot?#iefix') format('embedded-opentype'),
         url('#{$font-path}/#{$path}.woff2') format('woff2'),
         url('#{$font-path}/#{$path}.woff') format('woff');
    font-weight: unquote($weight);
    font-style: unquote($style);
    font-stretch: normal;
    font-display: swap;
  }
}

// Lato
@include font-face('lato-light', 'lato/lato-light', 300);
@include font-face('lato-light-italic', 'lato/lato-light-italic', 300, 'italic');
@include font-face('lato', 'lato/lato-regular');
@include font-face('lato-italic', 'lato/lato-regular', $style: 'italic');
@include font-face('lato-bold', 'lato/lato-bold', 700);
@include font-face('lato-bold-italic', 'lato/lato-bold-italic', 700, 'italic');

// Lora
@include font-face('lora', 'lora/lora-regular');
@include font-face('lora-italic', 'lora/lora-regular', $style: 'italic');
@include font-face('lora-bold', 'lora/lora-bold', 700);
@include font-face('lora-bold-italic', 'lora/lora-bold-italic', 700, 'italic');

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
