import * as path from "path";

export const electronPDF = {
  methods: {
    printElectronPDF: function() {
      // Import modules only in electron environment
      const fs = require("fs");
      const os = require("os");
      const remote = require("electron").remote;
      var pdfSuccess = false;

      // Create temp path
      const formatDate = () => {
        const stamp = new Date();
        const month = stamp.getMonth();
        const day = stamp.getDate();
        const year = stamp.getYear();

        return `${day}-${month}-${year}`;
      };

      const pdfPath = path.join(
        os.tmpdir(),
        this.$t("fileUpload.pdfFileName", { timestamp: formatDate() })
      );

      const currentWindow = remote.getCurrentWindow();
      const pdfViewWindow = new remote.BrowserWindow({
        show: false,
        width: 1500,
        height: 1500,
        webPreferences: { plugins: true }
      });

      // Use default printing options
      currentWindow.webContents.printToPDF(
        { paperSize: "A4", marginsType: 1, landscape: false },
        (error, data) => {
          if (error) throw error;

          // fs.writeFile(pdfPath, data, error => {
          //   if (error) throw error
          //   pdfViewWindow.loadURL('file://' + pdfPath)
          //   pdfSuccess = true
          // })

          remote.dialog.showSaveDialog(
            {
              defaultPath: this.$t("fileUpload.pdfFileName", {
                timestamp: formatDate()
              }),
              filters: [{ name: "PDF files", extensions: ["pdf"] }]
            },
            filename => {
              fs.writeFileSync(filename, data, "utf-8");
              pdfViewWindow.loadURL("file://" + pdfPath);
              pdfSuccess = true;
            }
          );
        }
      );

      // Return outcome based on if file was open.
      return pdfSuccess;
    }
  }
};
