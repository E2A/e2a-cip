<template>
  <aside :class="[base.wrapper, base[align]]" :style="width" @click.stop>
    <div :class="base.content">
      <slot>Add flyout content here</slot>
    </div>
  </aside>
</template>

<script>
export default {
  name: "BaseFlyout",
  props: {
    align: {
      type: String,
      default: "center",
      validator: function (value) {
        return ["left", "center", "align"].indexOf(value) !== 0;
      },
    },
    size: {
      type: Number,
      default: 12,
    },
    el: {
      type: String,
      default: "aside",
    },
  },
  computed: {
    width: function () {
      return this.size ? { width: this.size + "rem" } : {};
    },
  },
};
</script>

<style lang="scss" module="base">
@import "~bourbon/core/bourbon"; // for triangles
@import "~styleConfig/zIndex";
@import "~styleConfig/color";
@import "~styleConfig/borders";

$size-pointer-w: 1.2rem;
$size-pointer-h: 0.6rem;

.wrapper {
  composes: whiteBg shadow from "styles/color.scss";
  composes: default round from "styles/borders.scss";
  display: block;
  position: absolute;
  z-index: z("high");

  &::before,
  &::after {
    content: " ";
    display: block;
    position: absolute;
  }

  &::before {
    @include triangle("up", $size-pointer-w, $size-pointer-h, $border-color);
    top: -($size-pointer-h);
  }

  &::after {
    @include triangle("up", $size-pointer-w, $size-pointer-h, color("white"));
    top: -($size-pointer-h - 0.1rem);
  }
}

.center {
  left: 50%;
  transform: translateX(-50%);
  // margin-left: -($size / 2);

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

.content {
  max-height: 16rem;
  overflow-y: auto;
}
</style>
