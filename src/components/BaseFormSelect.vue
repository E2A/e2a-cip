<template>
  <BaseFormLabel
    v-if="label"
    :id="name"
    :label="label"
    :helpText="helpText"
    :textSize="labelTextSize"
  >
    <vSelect
      @input="emitInput"
      :options="options"
      :searchable="searchable"
      :value="value"
      :class="[classItems, noClear && base.noClear]"
      :placeholder="placeholder"
      :id="name"
    />
    <BaseCalloutBox
      :key="error"
      v-if="error"
      :message="error"
      :class="space.marginTopNarrow"
      role="warning"
    />
  </BaseFormLabel>
  <vSelect
    v-else
    @input="emitInput"
    :options="options"
    :searchable="searchable"
    :value="value"
    :class="[classItems, noClear && base.noClear]"
    :placeholder="placeholder"
    :id="name"
  />
</template>

<script>
import { styleHelpers } from './mixins/helpers.js'
import BaseFormLabel from './BaseFormLabel.vue'
import BaseCalloutBox from './BaseCalloutBox.vue'
import vSelect from 'vue-select'
import $ from 'jquery'

export default {
  name: 'BaseFormSelect',
  mixins: [styleHelpers],
  props: {
    label: String,
    labelTextSize: String,
    helpText: String,
    value: [String, Number, Object, Date],
    name: {
      type: String,
      required: true
    },
    placeholder: String,
    validate: String,
    dataAs: String,
    error: {
      type: String,
      required: false
    },
    searchable: {
      type: Boolean,
      default: false
    },
    options: {
      type: [Array, Object],
      required: true
    },
    classItems: String,
    noClear: {
      type: Boolean,
      default: false
    }
  },
  components: {
    BaseFormLabel,
    BaseCalloutBox,
    vSelect
  },
  data () {
    return {
      vSelectElement: null,
      dropdownToggle: null,
      search: null
    }
  },
  methods: {
    emitInput: function (e) {
      this.$emit('input', e)
    },
    handlePaddingClick: function (event) {
      // v-select rejects events that occur in an element's padding
      // this fnc runs these events anyways
      const clickedPadding = className => event.target.classList.contains(className)

      const isOpen = this.vSelectElement.hasClass('vs--open')

      const isDropdownTogglePadding = clickedPadding('vs__dropdown-toggle')
      const isSelectedOptionsPadding = clickedPadding('vs__selected-options')
      const isActionPadding = clickedPadding('vs__actions')

      const isPadding = isDropdownTogglePadding || isSelectedOptionsPadding || isActionPadding

      if (!isOpen && isPadding) {
        this.search.focus()
      } else if (isOpen && isPadding) {
        this.search.blur()
      }
    },
    addElements: function () {
      this.vSelectElement = $(`#${this.name}`)
      this.dropdownToggle = this.vSelectElement.find('.vs__dropdown-toggle')
      this.search = this.dropdownToggle.find('.vs__selected-options').find('.vs__search')
    }
  },
  $_veeValidate: {
    name () {
      return this.name
    },
    value () {
      return this.value
    }
  },
  mounted () {
    this.addElements()
    this.dropdownToggle.mousedown(this.handlePaddingClick)
  },
  beforeDestroy () {
    this.dropdownToggle.unbind()
  }
}
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>

<!-- global: override the classes used on vue-select with our own styles -->
<!-- using !important everywhere to make sure we override vendor styles -->
<style lang="scss">
@import '~bourbon/core/bourbon';
@import '~vue-select/dist/vue-select.css';
@import '~styleConfig/type';
@import '~styleConfig/spacing';
@import '~styleConfig/color';
@import '~styleConfig/borders';

.v-select {
  @include font();
  color: color('dark') !important;

  a {
    border: none !important;
  }

  .vs__open-indicator {
    $size: 0.7em; // matched roughly to original size but in ems
    // arrow-down-midtone.svg, base64 encoded so the native app can find it
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTggMTAuMjQ5bDUuNjk0LTUuODQ0YTEuMzcgMS4zNyAwIDAgMSAxLjg4NS0uMDU4Yy41MzcuNDg1LjU2NCAxLjI5Ni4wNiAxLjgxM0w4IDE0IC4zNiA2LjE2YTEuMjQ5IDEuMjQ5IDAgMCAxIC4wNjEtMS44MTMgMS4zNyAxLjM3IDAgMCAxIDEuODg1LjA1OEw4IDEwLjI1eiIgZmlsbD0iIzhEQTNDMCIgZmlsbC1ydWxlPSJub256ZXJvIi8+PC9zdmc+) !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
    background-size: contain !important;
    bottom: 50% !important;
    height: $size !important;
    fill: none;
    margin-bottom: 2px;
    right: 0.7em !important;
    width: $size !important;

    &::before {
      content: none !important; // kill css triangle in pseudo-element
    }
  }

  .vs__dropdown-toggle {
    @include border();
    padding: space('xxnarrow') !important;
    background-color: color('light') !important;

    // clear button
    .vs__clear {
      $size: 0.6em;
      // arrow-down-midtone.svg, base64 encoded so the native app can find it
      background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTggNi4xNDRsNC43Ni00Ljc2YTEuMzEzIDEuMzEzIDAgMCAxIDEuODU2IDEuODU3TDkuODU2IDhsNC43NiA0Ljc2YTEuMzEzIDEuMzEzIDAgMCAxLTEuODU3IDEuODU2TDggOS44NTZsLTQuNzYgNC43NmExLjMxMyAxLjMxMyAwIDAgMS0xLjg1Ni0xLjg1N0w2LjE0NCA4bC00Ljc2LTQuNzZhMS4zMTIgMS4zMTIgMCAxIDEgMS44NTctMS44NTZMOCA2LjE0NHoiIGZpbGw9IiM4REEzQzAiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvc3ZnPg==) !important;
      background-position: center !important;
      background-repeat: no-repeat !important;
      background-size: contain !important;
      bottom: 50% !important;
      height: $size !important;
      right: 1.6em !important;
      width: $size !important;

      > * {
        @include hide-visually(); // hide child span with &times; text but keep it accessible to screen readers
      }
    }
  }

  .vs__dropdown-menu {
    .highlight > a {
      background: color('accent');
      color: color('white');
    }
  }
}

// Fixes bugs introduced by vue-select's searchable option.
// When search is off, these bugs appear when the component is too small.
// When search is on, these bugs don't appear because the component is usually large enough.
.vs--unsearchable {
  // Normally, the selected option is absolutely positioned and grayed, mimicing a placeholder.
  // The search input is placed over it.
  &.vs--single.vs--open .vs__selected {
    position: static !important;
  }

  // The search input field can cause problems due to its size.
  // .vs__search {
  //   padding: 0;
  //   margin: 0;
  // }
}
</style>

<style lang="scss" module="base">
// turn off the 'clear' button if the noClear prop is true
.noClear {
  :global {
    .vs__clear {
      display: none !important;
    }
  }
}
</style>
