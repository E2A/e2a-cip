<template>
  <BaseGutterWrapper
    :class="[base.wrapper, sizeClass]"
    :el="el"
    :gutterX="gutter"
    :gutterY="gutter"
    :flush="flush"
  >
    <component
      v-for="(item, index) in items"
      :class="base.item"
      :key="`gallery-item-${index}`"
      :is="childEl"
    >
      <slot :item="item">
        <!-- default content: a resource card -->
        <!-- you can replace by adding new markup to the slot -->
        <BaseCard>
          <BaseHeading
            :class="space.paddingBottomXnarrow"
            :level="3"
            :centered="false"
            scale="delta"
            weight="bold"
          >
            {{ item.title }}
          </BaseHeading>
          <BaseBodyText
            :class="space.paddingBottomNarrow"
            :content="item.teaser"
            size="zeta"
          />
          <template slot="footer">
            <BaseButtonLink
              :to="item.url"
              :label="$t('downloadResource')"
              :router="false"
              size="small"
              role="primary"
            />
          </template>
        </BaseCard>
      </slot>
    </component>
  </BaseGutterWrapper>
</template>

<script>
import BaseGutterWrapper from "./BaseGutterWrapper.vue";
import BaseHeading from "./BaseHeading.vue";
import BaseBodyText from "./BaseBodyText.vue";
import BaseButtonLink from "./BaseButtonLink.vue";
import BaseCard from "./BaseCard.vue";

export default {
  name: "BaseGallery",
  components: {
    BaseGutterWrapper,
    BaseHeading,
    BaseBodyText,
    BaseButtonLink,
    BaseCard
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    el: {
      type: String,
      default: "ul"
    },
    childEl: {
      type: String,
      default: "li"
    },
    size: {
      type: String,
      default: "default"
    },
    gutter: {
      type: String,
      default: "medium"
    },
    flush: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    sizeClass: function() {
      return this.size !== "default" && this.base[this.size];
    }
  }
};
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>

<style lang="scss" module="base">
@import "~styleConfig/type";
@import "~styleConfig/spacing";

.wrapper {
  display: block;
  list-style: none;
  font-size: 0;
  position: relative; // in case flexbox isn't supported
  text-align: left;

  // use css grid if supported
  @supports (display: grid) {
    display: grid;
    grid-column-gap: space("medium");
    grid-row-gap: space("medium");
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    margin: 0;
  }
}

.item {
  @include type-size-default;
  display: inline-block;
  position: relative;
  vertical-align: top;

  // fallback fluid sizing method using a calc() hack
  // -> allows grid to be somewhat responsive without media queries
  // -> mainly for IE and old browsers
  // https://www.sitepoint.com/responsive-css-patterns-without-media-queries/
  max-width: 100%;
  min-width: (100% / 3);
  width: calc((600px - 100%) * 1000);

  @supports (display: flex) {
    display: flex;
    flex-direction: column;
  }

  // CSS grid version
  // -> all the responsive things, all the time, all the glory
  // -> for modern browsers
  @supports (display: grid) {
    max-width: auto;
    min-width: auto;
    padding: 0;
    width: auto;
  }
}

// create a variation of .l-gallery with these overrides
// -> example: .l-gallery--small { @include gallery-variation(200px); }
// -> @param NUMBER $min-width: the minimum width of the col, in pixels
// -> @param NUMBER $breakpoint: the point at which the legacy grid will switch to its large view
// -> @param NUMBER $min-percentage: the smallest pecentage width the col can be
// -> @param NUMBER $max-percentage: the largest percentage width the col can be
@mixin gallery-variation(
  $min-width: 240px,
  $breakpoint: 600px,
  $min-percentage: 33%,
  $max-percentage: 100%
) {
  @supports (display: grid) {
    // Disable 'spelling' linter b/c it doesn't recognize grid properties
    // scss-lint:disable PropertySpelling
    grid-template-columns: repeat(auto-fit, minmax($min-width, 1fr));
  }

  .item {
    max-width: $max-percentage;
    min-width: $min-percentage;
    width: calc((#{$breakpoint} - 100%) * 1000);
  }
}

.large {
  @include gallery-variation(
    $min-width: 380px,
    $breakpoint: 1000px,
    $min-percentage: 33%
  );
}
</style>
