<template>
  <div :class="base.wrapper">
    <BaseButton
      @click="toggleFlyout"
      :label="label"
      :role="role"
      :size="size"
      :reverseColors="reverseColors"
      iconRight="arrow-down"
    />
    <BaseFlyout
      v-show="isOpen"
      :class="base.flyout"
      :align="align"
      :size="flyoutSize"
    >
      <slot>Add flyout content</slot>
    </BaseFlyout>
  </div>
</template>

<script>
import BaseButton from './BaseButton.vue'
import BaseFlyout from './BaseFlyout.vue'

export default {
  name: 'BaseButtonFlyout',
  props: {
    label: String,
    role: {
      type: String,
      default: 'default'
    },
    size: {
      type: String
    },
    align: {
      type: String,
      default: 'right'
    },
    flyoutSize: {
      type: Number
    },
    reverseColors: {
      type: Boolean,
      default: false
    },
    open: {
      type: Boolean,
      default: false
    }
  },
  components: {
    BaseButton,
    BaseFlyout
  },
  data () {
    return {
      isOpen: this.open || false
    }
  },
  methods: {
    toggleFlyout () {
      this.isOpen = !this.isOpen
      this.isOpen ? this.$emit('open') : this.$emit('close')
    }
  },
  watch: {
    // watch the open prop and keep isOpen updated
    // -> so when its parent tells it to open, it's reflected in internal state
    open () {
      this.isOpen = this.open
    }
  }
}
</script>

<style lang="scss" module="base">
.wrapper {
  display: inline-block;
  overflow: visible;
  position: relative;
}

.flyout {
  position: absolute;
  margin-top: 0.35rem;
}
</style>
