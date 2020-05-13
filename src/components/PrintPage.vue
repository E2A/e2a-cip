<template>
  <div class="PrintPage">
    <BaseButton
      v-if="electron"
      :label="$t('results.exportPDF')"
      :size="size"
      :role="role"
      icon-left="print"
      @click="exportPDF"
    />
    <BaseButton
      :label="$t('results.printPage')"
      :size="size"
      :role="role"
      :class="space.marginLeft"
      icon-left="print"
      @click="printPage"
    />
    <p v-if="pdfPrintError">{{ $t("results.pdfPrintError") }}</p>
  </div>
</template>

<script>
import { dataMethods } from "./mixins/dataMethods";
import { electronPDF } from "@/components/mixins/electronPDF";
import BaseButton from "@/components/BaseButton.vue";

export default {
  name: "PrintPage",
  components: {
    BaseButton,
  },
  mixins: [electronPDF, dataMethods],
  props: {
    size: String,
    role: {
      type: String,
      default: "default",
    },
  },
  data() {
    return {
      pdfPrintError: false,
      electron: this.checkElectron(),
    };
  },
  methods: {
    printPage: function () {
      // Default browser printing
      window.print();
    },
    exportPDF: function () {
      // Electron printing - show error if electron PDF is false (ie could not open)
      this.pdfPrintError = !this.printElectronPDF();
      this.$router.push({ name: "print" });
    },
  },
};
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
