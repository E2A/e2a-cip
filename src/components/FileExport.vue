<template>
  <BaseButtonFlyout
    :size="size"
    :flyout-size="18"
    :role="role"
    :align="align"
    :label="label || $t('fileUpload.label')"
  >
    <div :class="[space.paddingNarrow, type.left]">
      <BaseHeading :class="space.paddingBottomXnarrow" scale="epsilon" sub>
        {{ selectLabel || $t("fileUpload.selectFormat") }}
      </BaseHeading>
      <BaseBodyText
        :content="$t('fileUpload.directions')"
        size="eta"
        font="display"
      />
      <div :class="space.paddingTopNarrow">
        <BaseGutterWrapper
          :class="base.buttonGroup"
          el="ul"
          gutter-x="xnarrow"
          gutter-y="xnarrow"
        >
          <li>
            <BaseButton
              :label="$t('fileUpload.json')"
              icon-left="download"
              role="primary"
              size="small"
              @click="exportData('json')"
            />
          </li>
          <li>
            <BaseButton
              :label="$t('fileUpload.csv')"
              icon-left="download"
              role="primary"
              size="small"
              @click="exportData('csv')"
            />
          </li>
        </BaseGutterWrapper>
      </div>
    </div>
  </BaseButtonFlyout>
</template>

<script>
import { dataIO } from "./mixins/dataIO";
import { dataMethods } from "./mixins/dataMethods";
import BaseButtonFlyout from "./BaseButtonFlyout";
import BaseButton from "./BaseButton";
import BaseHeading from "./BaseHeading";
import BaseBodyText from "./BaseBodyText";
import BaseGutterWrapper from "./BaseGutterWrapper";

export default {
  name: "FileExport",
  components: {
    BaseButtonFlyout,
    BaseHeading,
    BaseBodyText,
    BaseGutterWrapper,
    BaseButton,
  },
  mixins: [dataIO, dataMethods],
  props: {
    size: {
      type: String,
      default: "small",
    },
    role: {
      type: String,
      default: "default",
    },
    align: String,
    label: {
      type: String,
    },
    selectLabel: {
      type: String,
    },
  },
  data: function () {
    return {
      exportOption: "",
    };
  },
  methods: {
    exportData: function (option) {
      if (this.runExportData(option)) {
        this.notify(
          this.$t("fileUpload.exportSuccessful", {
            filetype: option.toUpperCase(),
          }),
          "success"
        );
      }
    },
  },
};
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/type.scss" lang="scss" module="type"></style>

<style lang="scss" module="base">
.buttonGroup {
  display: block;
  list-style: none;
  font-size: 0;
  text-align: center;

  > li {
    display: inline-block;
  }
}
</style>
