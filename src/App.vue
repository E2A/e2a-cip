<template>
  <div id="app">
    <BaseIconSpriteMap />
    <NavHeader :key="this.getItemCount('all')" />
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import 'normalize.css' // global reset styles - import here b/c sass doesn't like importing vanilla css
import NavHeader from '@/components/NavHeader.vue'
import BaseIconSpriteMap from '@/components/BaseIconSpriteMap.vue'
import { dataMethods } from '@/components/mixins/dataMethods.js'

export default {
  name: 'AppRoot',
  mixins: [ dataMethods ],
  components: {
    NavHeader,
    BaseIconSpriteMap
  }
}

</script>

<style lang="scss">
// Default box model, scaling, and type styles
// --> note these styles are not scoped/modules, so they apply to the whole app

@import './stylesheets/config/breakpoints';
@import './stylesheets/config/type';
@import './stylesheets/config/color';
@import './stylesheets/config/borders';

$base-type-sizes: (
  'default': 100%,
  'xsmall': 105%,
  'small': 115%,
  'medium': 120%,
  'large': 125%
);

@mixin font-face($name, $path, $weight: 'normal', $style: 'normal') {
  $font-path: './assets/fonts';

  @font-face {
    font-family: $name;
    src: url('#{$font-path}/#{$path}.woff2') format('woff2'),
         url('#{$font-path}/#{$path}.woff') format('woff');
    font-weight: unquote($weight);
    font-style: unquote($style);
    font-stretch: normal;
    font-display: swap;
  }
}

// Lato
@include font-face('lato-thin-normal', 'lato/lato-thin', 300);
@include font-face('lato-thin-italic', 'lato/lato-thin-italic', 300, 'italic');
@include font-face('lato-light-normal', 'lato/lato-light', 300);
@include font-face('lato-light-italic', 'lato/lato-light-italic', 300, 'italic');
@include font-face('lato-regular-normal', 'lato/lato');
@include font-face('lato-regular-italic', 'lato/lato-italic', $style: 'italic');
@include font-face('lato-bold-normal', 'lato/lato-bold', 700);
@include font-face('lato-bold-italic', 'lato/lato-bold-italic', 700, 'italic');

// Lora
@include font-face('lora-regular-normal', 'lora/lora');
@include font-face('lora-regular-italic', 'lora/lora-italic', $style: 'italic');
@include font-face('lora-bold-normal', 'lora/lora-bold', 700);
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
  background-color: color('white'); // set explicitly to override OS dark modes
  color: color('dark');
  line-height: leading();
  font-feature-settings: 'liga', 'kern';
  text-rendering: geometricPrecision;
}

audio,
canvas,
img,
video {
    vertical-align: middle;
    max-width: 100%;
}

p,
ol,
ul {
  margin-top: 0;
  margin-bottom: 0;
}

a {
  color: color('highlight');
  text-decoration: none;

  &:hover,
  &:active {
    border-bottom: border-w('thin') dashed;
  }
}
</style>
