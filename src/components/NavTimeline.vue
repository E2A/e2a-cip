<template>
  <nav :class="[base.wrapper]">
    <template
      v-for="item in items"
    >
      <BaseFlyout
        v-show="openFlyout === flyoutID(item.id)"
        :class="base.flyout"
        :id="flyoutID(item.id)"
        :style="{
          left: activeDotXPosition + 10 + 'px'
        }"
        :key="flyoutID(item.id)"
      >
        <BaseHeading
          :class="space.paddingBottomXnarrow"
          scale="zeta"
          sub
        >
          {{item.label}}
        </BaseHeading>
        <BaseButtonLink
          :label="$t('edit')"
          :to="item.url"
          size="small"
        />
      </BaseFlyout>
    </template>
    <div
      @scroll="handleScroll"
      :class="base.leftPane"
    >
      <div
        :class="base.timelineWrapper"
        :style="{
          width: timelineWidth + 'rem'
        }"
      >
        <ul :class="base.timeline">
          <li
            v-for="(item, index) in items"
            :class="base.item"
            :key="index"
          >
            <a
              @click.prevent="toggleFlyout(flyoutID(item.id), $event)"
              :class="[base.dot, String(item.id) === current ? color.darkBg : color.lightBg]"
              :id="`activity-${item.id}`"
              href="`#${flyoutID}`"
            ></a>
          </li>
        </ul>
      </div>
    </div>
    <div :class="base.rightPane">
      <BaseGutterWrapper
        gutterX="xnarrow"
        gutterY="xnarrow"
      >
        <BaseHeading
          :class="base.inlineBlock"
          :centered="false"
          scale="zeta"
          sub
        >
          <strong>{{items.length}}</strong> {{countLabel || $t('activities')}}
        </BaseHeading>
        <div :class="base.inlineBlock">
          <FileExport size="small" />
        </div>
      </BaseGutterWrapper>
    </div>
  </nav>
</template>

<script>
import BaseFlyout from './BaseFlyout.vue'
import BaseHeading from './BaseHeading.vue'
import BaseButtonLink from './BaseButtonLink.vue'
import FileExport from './FileExport.vue'
import BaseGutterWrapper from './BaseGutterWrapper.vue'

export default {
  name: 'NavTimeline',
  props: {
    items: {
      type: Array,
      required: true
      // validator: function (values) {
      //   // must be an array of objects: [ { label: 'whatever', url: '/activity/3'} ]
      //   return values.reduce((verdict, item) {
      //     return item.label
      //   })
      // }
    },
    current: {
      type: [String, Number],
      required: true
    },
    countLabel: String,
    borders: {
      type: [String, Array],
      default: 'bottom'
    }
  },
  computed: {
    timelineWidth: function () {
      const dotSize = 1.2 // in rems
      const dotSpacing = 0.7 // in rems
      const leftMargin = 2 // in rems
      return (dotSize + dotSpacing) * this.items.length + leftMargin
    }
  },
  components: {
    BaseFlyout,
    BaseHeading,
    BaseButtonLink,
    FileExport,
    BaseGutterWrapper
  },
  data: function () {
    return {
      openFlyout: false,
      activeDot: false,
      activeDotXPosition: false
    }
  },
  methods: {
    flyoutID: function (id) {
      return `activity-flyout-${id}`
    },
    updateActiveDotPosition: function () {
      if (this.activeDot) {
        this.activeDotXPosition = this.activeDot.getBoundingClientRect().left
        return
      }
      this.activeDotXPosition = false
    },
    toggleFlyout: function (id, event) {
      if (this.openFlyout === id) {
        this.openFlyout = false
        this.activeDot = false
        this.activeDotXPosition = false
        return
      }
      this.openFlyout = id
      this.activeDot = document.getElementById(event.target.id)
      this.updateActiveDotPosition()
    },
    handleScroll: function () {
      this.updateActiveDotPosition()
    }
  }
}
</script>

<style src="styles/borders.scss" lang="scss" module="border"></style>
<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/color.scss" lang="scss" module="color"></style>

<style lang="scss" module="base">
@import '~styleConfig/borders';
@import '~styleConfig/color';
@import '~styleConfig/type';
@import '~styleConfig/zIndex';
@import '~styleConfig/scale';
@import '~styleConfig/spacing';

$dot-size: scale-type('epsilon');

.wrapper {
  display: block;
  position: relative;
  background-color: well('light');

  @supports (display: flex) {
    display: flex;
    align-items: stretch;
  }

  &::before {
    background: linear-gradient(to right, well('light'), rgba(well('light'), 0));
    bottom: 0;
    content: '';
    display: block;
    left: 0;
    position: absolute;
    top: 0;
    width: space('xwide');
    z-index: z('high');
  }
}

.leftPane {
  composes: paddingVerticalNarrow from 'styles/spacing.scss';
  bottom: 0;
  left: 0;
  overflow-x: scroll;
  position: relative;
  right: 0;
  top: 0;

  @supports (flex: 1) {
    flex: 1;
  }
}

.rightPane {
  composes: paddingHorizontal paddingVerticalNarrow from 'styles/spacing.scss';
  display: inline-block;

  @supports (display: flex) {
    display: flex;
    align-items: center;
  }
}

.timelineWrapper {
  display: inline-block;
  position: relative;
  height: $dot-size;
  min-width: 100%;
  vertical-align: middle;

  &::before {
    background-color: color('light', $grade: -20);
    content: ' ';
    height: border-w('thin');
    left: 0;
    margin-top: -(border-w('thin') / 2);
    position: absolute;
    right: 0;
    top: 50%;
    z-index: z('low');
  }

  &::after {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
}

.timeline {
  composes: marginHorizontalBetweenXnarrow from 'styles/spacing.scss';
  composes: right from 'styles/type.scss';
  display: block;
  font-size: 0;
  list-style: none;
  position: absolute;
  top: 50%;
  margin-top: -($dot-size / 2);
  right: 0;
  padding-left: 0;
}

.item {
  @include type-size-default;
  display: inline-block;
  position: relative;
}

.dot {
  composes: default thick from 'styles/borders.scss';
  composes: darkBorder from 'styles/color.scss';
  display: block;
  border-radius: 50%;
  width: $dot-size;
  height: $dot-size;
  z-index: z('middle');
}

.inlineBlock {
  display: inline-block;
}

.flyout {
  composes: paddingNarrow from 'styles/spacing.scss';
  top: 3.4rem;
}
</style>
