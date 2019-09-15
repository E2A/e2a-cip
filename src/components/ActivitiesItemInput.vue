<!--
  Result Input component
  -> use to add an recommendation to an activity
  -> part of Activity List
-->

<template>
  <li :class="[base.wrapper, base.unmarked]">
    <div :class="{[base.numberWrapper]: isActive}">
      <BaseGutterWrapper
        :class="base.flex"
        gutterY="narrow"
        :gutterX="isActive ? 'narrow' : 'None'"
      >
        <div :class="[base.gutter, base.fill]">
          <BaseFormInput
            v-model="itemText"
            @change="updateItem()"
            textSize="zeta"
            el="textarea"
            :outline="isActive ? 'highlight' : 'midtone'"
          />
        </div>
        <div :class="base.gutter">
          <BaseButton
            v-if="this.id"
            @click="deleteItem()"
            :label="$t('delete')"
            size="small"
          />
        </div>
      </BaseGutterWrapper>
    </div>
  </li>
</template>

<script>
import BaseHeading from './BaseHeading.vue'
import BaseButton from './BaseButton.vue'
import BaseFormInput from './BaseFormInput.vue'
import BaseGutterWrapper from './BaseGutterWrapper.vue'

export default {
  name: 'ActivitiesItemInput',
  components: {
    BaseHeading,
    BaseButton,
    BaseFormInput,
    BaseGutterWrapper
  },
  props: {
    'activityInstance': {
      type: Object,
      required: false
    },
    'id': {
      type: Number,
      required: false
    },
    'action': {
      type: String,
      required: true,
      validator: function (value) {
        // The value must match one of these strings
        return ['insert', 'update'].indexOf(value) !== -1
      }
    },
    'inputType': {
      type: String,
      required: true,
      validator: function (value) {
        // The value must match one of these strings
        return ['globalrecommendations', 'recommendations', 'comments'].indexOf(value) !== -1
      }
    },
    // true => this component controls communication with the store
    'isActive': {
      type: Boolean,
      required: false,
      default: true
    },
    'existingText': {
      type: String,
      required: false
    }
  },
  data () {
    return {
      itemText: this.existingText
    }
  },
  methods: {
    updateItem: function () {
      // debugger;
      if (!this.active) {
        // Parent controls communication with the store
        this.updateParent()
        return
      }

      // Component controls communication with the store
      const data = {
        text: this.itemText,
        // Conditional properties
        // https://medium.com/@mikeh91/conditionally-adding-keys-to-javascript-objects-using-spread-operators-and-short-circuit-evaluation-acf157488ede
        ...(this.action === 'update') && { id: this.id },
        ...(this.inputType !== 'globalrecommendations') && { activity_id: this.activityInstance.id }
      }

      if (this.action === 'update') {
        this.$store.dispatch(`entities/${this.inputType}/update`, data)
      } else {
        this.$store.dispatch(`entities/${this.inputType}/insert`, { data })
      }
    },
    deleteItem: function () {
      this.$store.dispatch(`entities/${this.inputType}/delete`, this.id)
    },
    updateParent: function () {
      this.$emit('change', this.itemText)
    }
  }
}
</script>

<style src="styles/type.scss" lang="scss" module="type"></style>

<style lang="scss" module="base">
@import '~styleConfig/scale';
@import '~styleConfig/type';
@import '~styleConfig/color';
@import '~styleConfig/spacing';

.wrapper {
  display: block;
  position: relative;
}

.numberWrapper {
  composes: paddingLeft from 'styles/spacing.scss';
  counter-increment: recommendations;
  display: block;
  position: relative;

  &::before {
    @include font();
    color: color('midtone');
    content: counter(recommendations);
    display: block;
    font-size: scale-type('epsilon');
    left: 0;
    line-height: 1;
    position: absolute;
    top: (space('narrow') + 0.2rem); // matches gutterWrapper gutters
  }
}

.flex {
  @supports (display: flex) {
    display: flex;
    align-items: flex-start;
  }
}

.fill {
  @supports (flex: 1) {
    flex: 1;
  }
}

.gutter {
  display: inline-block;
  vertical-align: top;
  width: 100%;
}
</style>
