<template>
  <div :class="base.wrapper">
    <router-link :to="url" :class="base.back">
      &lsaquo; {{ label || this.$t("goBack") }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: "NavBackLink",
  props: {
    url: {
      type: [String, Object],
      required: true
    },
    label: {
      type: String
    }
  }
};
</script>

<style lang="scss" module="base">
.wrapper {
  composes: paddingVerticalNarrow paddingHorizontal from "styles/spacing.scss";
  composes: bottom from "styles/borders.scss";
}
.back {
  composes: midtone from "styles/color.scss";
}
</style>
