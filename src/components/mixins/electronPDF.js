import * as path from 'path'

export const electronPDF = {
  methods: {
    printElectronPDF: function () {
      // Import modules only in electron environment
      const fs = require('fs')
      const os = require('os')
      const remote = require('electron').remote
      const shell = require('electron').shell

      // Create temp path
      const timestamp = Date.now()
      const pdfPath = path.join(os.tmpdir(), this.$t('fileUpload.pdfFileName', {timestamp: timestamp}))

      const currentWindow = remote.getCurrentWindow()

      // Use default printing options
      currentWindow.webContents.printToPDF({paperSize: 'A4', marginsType: 1, landscape: false}, (error, data) => {
        if (error) throw error

        fs.writeFile(pdfPath, data, error => {
          if (error) throw error
          shell.openExternal('file://' + pdfPath)
        })
      })
    }
  }
}
