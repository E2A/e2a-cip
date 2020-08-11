<template>
  <!-- Export tool tray -->
  <aside
    :class="[
      border.bottom,
      space.paddingVerticalNarrow,
      space.paddingHorizontal,
      color.lightBg
    ]"
  >
    <BaseGutterWrapper :class="base.flex" gutterY="xnarrow" gutterX="xnarrow">
      <ClearItems v-if="clear" :clearType="clear" />
      <div :class="base.right">
        <BaseGutterWrapper gutterY="xnarrow" gutterX="xnarrow">
          <span v-if="files" :class="base.inlineBlock">
            <FileExport
              v-if="charts"
              :label="$t('fileUpload.exportLabel')"
              :select-label="$t('fileUpload.exportSelectFormat')"
            />
            <FileExport v-else />
          </span>
          <span v-if="charts" :class="base.inlineBlock">
            <ExportChartData />
          </span>
        </BaseGutterWrapper>
      </div>
    </BaseGutterWrapper>
  </aside>
</template>

<script>
import BaseGutterWrapper from "./BaseGutterWrapper.vue";
import FileExport from "@/components/FileExport.vue";
import ExportChartData from "@/components/ExportChartData.vue";
import ClearItems from "@/components/ClearItems.vue";

export default {
  name: "ActivitiesToolTray",
  components: {
    BaseGutterWrapper,
    FileExport,
    ExportChartData,
    ClearItems
  },
  props: {
    clear: {
      type: Array,
      validator: function(value) {
        return ["Assessments"].indexOf !== -1;
      }
    },
    files: {
      type: Boolean,
      default: true
    },
    charts: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/borders.scss" lang="scss" module="border"></style>
<style src="styles/color.scss" lang="scss" module="color"></style>

<style lang="scss" module="base">
.flex {
  display: block;

  @supports (display: flex) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
}

.inlineBlock {
  display: inline-block;
}

.right {
  text-align: right;

  @supports (flex: 1) {
    flex: 1;
  }
}
</style>
