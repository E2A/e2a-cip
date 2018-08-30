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
      align="right"
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
      type: String,
      default: 'default'
    },
    reverseColors: {
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
      isOpen: false
    }
  },
  methods: {
    toggleFlyout () {
      this.isOpen = !this.isOpen
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
