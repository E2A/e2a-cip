<template>
  <button :class="defaultClassList" @click="$emit('click')">
    <BaseIcon
      v-if="iconLeft !== 'none'"
      :class="button.iconLeft"
      :name="iconLeft"
      :size="iconSize"
    />
    {{ label }}
    <BaseIcon
      v-if="iconRight !== 'none'"
      :class="button.iconRight"
      :name="iconRight"
      :size="iconSize"
    />
  </button>
</template>

<script>
import { buttonStyles } from "./mixins/buttonStyles";
import BaseIcon from "./BaseIcon.vue";

export default {
  name: "BaseButton",
  components: {
    BaseIcon,
  },
  mixins: [buttonStyles],
};
</script>

<style src="styleShared/button.scss" lang="scss" module="button"></style>
