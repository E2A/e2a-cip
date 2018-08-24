import { saveAs } from 'file-saver/FileSaver'
import Papa from 'papaparse'
import Blob from 'blob'

export const dataIO = {
  data () {
    return {
      entityTypes: ['activities', 'setup', 'recommendations', 'assessments']
    }
  },
  methods: {
    runExportData: function (exportType = 'json') {
      const timestamp = Date.now()
      // Get JSON for each data type, activities will include all relationships
      const activityData = JSON.stringify(this.$store.getters['entities/activities/query']().withAll().get())
      const setupData = JSON.stringify(this.$store.getters['entities/setup/all']())
      // Build combinded JSON
      const jsonData = `{"setupData": ${setupData}, "activityData": ${activityData}}`

      if (exportType === 'json') {
        // Export JSON as a file
        var jsonExport = new Blob([jsonData], {type: 'application/json;charset=utf-8'})
        saveAs(jsonExport, this.$t('fileUpload.jsonFileName', {timestamp: timestamp}))
      } else {
        // Export csv data for each data type
        for (const entity of this.entityTypes) {
          const entityData = this.$store.getters[`entities/${entity}/all`]()
          this.csvExportItem(entityData, entity, timestamp)
        }
      }
      return true
    },
    parseFileData: function (fileData) {
      // Check file extension (windows cant seem find to find MIME data)
      const extension = fileData.fileObject.name.split('.').pop()

      if (fileData.fileObject.type === 'text/csv' || extension === 'csv') {
        for (const entity of this.entityTypes) {
          // Look for type of entity in file name
          const fileEntity = fileData.fileObject.name.search(entity)
          if (fileEntity !== -1) {
            const entityObjects = Papa.parse(fileData.text, {header: true}).data
            this.$store.dispatch(`entities/${entity}/create`, { data: entityObjects })
            return entity
          }
        }
      } else if (fileData.fileObject.type === 'application/json' || extension === 'json') {
        const importDataObj = JSON.parse(fileData.text)
        this.$store.dispatch('entities/setup/create', { data: importDataObj.setupData })
        this.$store.dispatch('entities/activities/create', { data: importDataObj.activityData })
        return 'all'
      }
    },
    csvExportItem: function (item, exportName, customTime) {
      var timestamp = customTime || Date.now()
      const entityData = JSON.stringify(item)
      const parsedData = Papa.unparse(entityData)
      var csvExport = new Blob([parsedData], {type: 'text/csv;charset=utf-8'})
      saveAs(csvExport, this.$t('fileUpload.csvFileName', {timestamp: timestamp, exportName: exportName}))
    }
  }
}
