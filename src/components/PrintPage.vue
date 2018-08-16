<template>
  <div class="PrintPage">
    <BaseButton
      v-if="electron"
      @click="exportPDF"
      :label="$t('results.exportPDF')"
      :size="size"
      :role="role"
    />
    <BaseButton
      @click="printPage"
      :label="$t('results.printPage')"
      :size="size"
      :role="role"
    />
    <p v-if="pdfPrintError">{{$t('results.pdfPrintError')}}</p>
  </div>
</template>

<script>
import { dataMethods } from './mixins/dataMethods'
import { electronPDF } from '@/components/mixins/electronPDF'
import BaseButton from '@/components/BaseButton.vue'

export default {
  name: 'PrintPage',
  mixins: [electronPDF, dataMethods],
  props: {
    size: {
      type: String,
      default: 'small'
    },
    role: {
      type: String,
      default: 'default'
    }
  },
  components: {
    BaseButton
  },
  data () {
    return {
      pdfPrintError: false,
      electron: this.checkElectron()
    }
  },
  methods: {
    printPage: function () {
      // Default browser printing
      window.print()
    },
    exportPDF: function () {
      // Electron printing - show error if electron PDF is false (ie could not open)
      this.pdfPrintError = !this.printElectronPDF()
    }
  }
}
</script>
