<template>
  <BaseFormLabel
    :id="name"
    :label="$t('activityYouthCentric')"
    :helpText="$t('supportText.activityYouthCentric')"
  >
    <input
      @change="emitChange($event)"
      :class="base.switch"
      :name="name"
      :id="name"
      :value="value"
      :data-label-on="labelOn || $t('yesRaw')"
      :data-label-off="labelOff || $t('noRaw')"
      type="checkbox"
    >
    <BaseCalloutBox
      v-if="error"
      :key="error"
      :message="error"
      :class="space.marginTopNarrow"
      role="warning"
    />
  </BaseFormLabel>
</template>

<script>
import BaseFormLabel from './BaseFormLabel'
import BaseCalloutBox from './BaseCalloutBox'

export default {
  name: 'BaseFormSwitch',
  props: {
    label: String,
    helpText: String,
    value: Boolean,
    name: {
      type: String,
      required: true
    },
    // 'yes' and 'no' labels on the switch
    // -> default translations are above in the template
    labelOn: String,
    labelOff: String,
    error: String
  },
  components: {
    BaseFormLabel,
    BaseCalloutBox
  },
  methods: {
    emitChange: function (event) {
      // use event.target.checked instead of value for checkboxes
      // https://medium.com/@relt24/dedicated-vue-js-checkbox-component-360a330a3eb
      this.$emit('input', event.target.checked)
    }
  },
  created () {
    this.checked = this.value
  }
}
</script>

<style lang="scss" module="base">
// https://danklammer.com/articles/simple-css-toggle-switch/
@import '~styleConfig/color';
@import '~styleConfig/borders';

.switch {
  $height: 2.6rem;
  $width: 8rem;
  $gutter: 0.2rem;

  composes: default from 'styles/animation.scss';
  composes: scaleZeta display uppercase bold from 'styles/type.scss';
  composes: default round from 'styles/borders.scss';
  appearance: none;
  background-color: color('light');
  border-radius: 6px;
  color: color('midtone');
  cursor: pointer;
  display: inline-block;
  height: $height;
  width: $width;

  &:focus {
    outline: none;
  }

  &::before,
  &::after {
    border-radius: $border-radius;
    display: inline-block;
    line-height: $height;
    text-align: center;
    text-transform: uppercase;
    width: 50%;

    // add some fancier gutters if calc() is supported
    @supports (width: calc(50% - #{$gutter})) {
      width: calc(50% - #{$gutter});
      line-height: calc(#{$height - ($gutter * 2)} - #{border-w('thin') * 2});
    }
  }

  &::before {
    content: attr(data-label-on);

    @supports (width: calc(50% - #{$gutter})) {
      margin: $gutter 0 $gutter $gutter;
    }
  }

  &::after {
    background-color: color('warning');
    color: color('white');
    content: attr(data-label-off);

    @supports (width: calc(50% - #{$gutter})) {
      margin: $gutter $gutter $gutter 0;
    }
  }

  &:checked::before {
    background-color: color('success');
    color: color('white');
  }

  &:checked::after {
    background-color: transparent;
    color: color('midtone');
  }
}
</style>
