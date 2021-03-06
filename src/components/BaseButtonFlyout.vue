<template>
  <div id="base-button-flyout" :class="base.wrapper">
    <BaseButton
      :label="label"
      :role="role"
      :size="size"
      :reverse-colors="reverseColors"
      icon-right="arrow-down"
      @click="toggleFlyout"
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
import BaseButton from "./BaseButton.vue";
import BaseFlyout from "./BaseFlyout.vue";

export default {
  name: "BaseButtonFlyout",
  components: {
    BaseButton,
    BaseFlyout
  },
  props: {
    label: String,
    role: {
      type: String,
      default: "default"
    },
    size: {
      type: String
    },
    align: {
      type: String,
      default: "right"
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
  data() {
    return {
      isOpen: this.open || false
    };
  },
  watch: {
    // watch the open prop and keep isOpen updated
    // -> so when its parent tells it to open, it's reflected in internal state
    open() {
      this.isOpen = this.open;
    }
  },
  mounted: function() {
    document.addEventListener("click", this.closeFlyout);
  },
  beforeDestroy: function() {
    document.removeEventListener("click", this.closeFlyout);
  },
  methods: {
    toggleFlyout() {
      this.isOpen = !this.isOpen;
      this.isOpen ? this.$emit("open") : this.$emit("close");
    },
    closeFlyout(e) {
      if (!e.target.closest("#base-button-flyout")) {
        this.isOpen = false;
      }
    }
  }
};
</script>

<style lang="scss" module="base">
.wrapper {
  display: inline-block;
  overflow: visible;
  position: relative;
}

.flyout {
  position: absolute;
  z-index: 4000;
  margin-top: 0.35rem;
}
</style>
