<template>
  <nav :class="[base.wrapper]">
    <div :class="base.leftPane">
      <ul :class="base.timeline">
        <li
          v-for="(item, index) in items"
          :class="base.item"
          :key="index"
        >
          <a
            :class="[base.dot, item.id === current && base.current]"
            href="#"
          ></a>
          <BaseFlyout
            style="display: none;"
          >
            <BaseHeading
              scale="eta"
              sub
            >
              {{item.label}}
            </BaseHeading>
            <BaseButtonLink
              label="Edit"
              :to="item.url"
            />
          </BaseFlyout>
        </li>
      </ul>
    </div>
    <div :class="base.rightPane">
      <BaseGutterWrapper
        gutterX="xnarrow"
        gutterY="xnarrow"
      >
        <Baseheading
          scale="epsilon"
          sub
        >
          <strong>{{items.length}}</strong> {{countLabel || $t('activities')}}
        </Baseheading>
        <div :class="base.inlineBlock">
          <FileUpload :exportType="['Export']" />
        </div>
      </BaseGutterWrapper>
    </div>
  </nav>
</template>

<script>
import BaseFlyout from './BaseFlyout.vue'
import BaseHeading from './BaseHeading.vue'
import BaseButtonLink from './BaseButtonLink.vue'
import FileUpload from './FileUpload.vue'
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
  created: function () {
    // console.log(this.items.find(item => item.label) && this.items.find(item => item.url))
  },
  components: {
    BaseFlyout,
    BaseHeading,
    BaseButtonLink,
    FileUpload,
    BaseGutterWrapper
  }
}
</script>

<style src="styles/borders.scss" lang="scss" module="border"></style>
<style src="styles/spacing.scss" lang="scss" module="space"></style>

<style lang="scss" module="base">
@import '~styleConfig/borders';
@import '~styleConfig/color';
@import '~styleConfig/type';
@import '~styleConfig/zIndex';
@import '~styleConfig/scale';

.wrapper {
  composes: paddingVerticalNarrow from 'styles/spacing.scss';
  overflow: scroll-x;
  display: block;
  background-color: well('light');

  @supports (display: flex) {
    display: flex;
    align-items: center;
  }
}

.leftPane {
  position: relative;
  flex: 1;

  &::before {
    background-color: color('light', $grade: -20);
    content: '';
    height: border-w('thin');
    left: 0;
    margin-top: -(border-w('thin') / 2);
    position: absolute;
    right: 0;
    top: 50%;
    z-index: z('low');
  }
}

.rightPane {
  composes: paddingHorizontal from 'styles/spacing.scss';
  display: inline-block;

  @supports (display: flex) {
    display: flex;
    align-items: center;
  }
}

.timeline {
  composes: paddingHorizontalBetweenXnarrow from 'styles/spacing.scss';
  composes: right from 'styles/type.scss';
  display: block;
  font-size: 0;
  list-style: none;
  margin: 0;
  position: relative;
}

.item {
  @include type-size-default;
  display: inline-block;
}

.dot {
  $size: scale-type('epsilon');
  composes: default thick from 'styles/borders.scss';
  composes: darkBorder lightBg from 'styles/color.scss';
  display: block;
  border-radius: 50%;
  width: $size;
  height: $size;
  z-index: z('middle');
}

.current {
  composes: darkBg from 'styles/color.scss';
}

.inlineBlock {
  display: inline-block;
}
</style>
