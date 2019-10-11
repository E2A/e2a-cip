import { saveAs } from 'file-saver'
import * as Papa from 'papaparse'
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
        var jsonExport = new Blob([jsonData], { type: 'application/json;charset=utf-8' })
        saveAs(jsonExport, this.$t('fileUpload.jsonFileName', { timestamp: timestamp }))
      } else {
        let csvObject = {}

        // Export csv data for each data type
        for (const entity of this.entityTypes) {
          const entityData = this.$store.getters[`entities/${entity}/all`]()
          csvObject[entity] = entityData
        }

        this.csvExportItem(csvObject, 'csv', timestamp)
      }

      return true
    },
    parseFileData: function (fileData) {
      // Check file extension (windows cant seem find to find MIME data)
      const extension = fileData.fileObject.name.split('.').pop()

      if (fileData.fileObject.type === 'text/csv' || extension === 'csv') {
        // parse file
        const manyCsv = fileData.text.split('\n\n')
        const parsedData = manyCsv.map(singleCsv => Papa.parse(singleCsv, { header: true }).data)

        // label data types
        let labeledData = {}
        this.entityTypes.forEach(type => { labeledData[type] = [] })

        // assign data to type
        for (const dataGroup of parsedData) {
          const assignLabeledValue = type => {
            labeledData[type] = dataGroup
          }

          const firstEntity = dataGroup[0]

          if (firstEntity) {
            if ('activityNumber' in firstEntity) assignLabeledValue('activities')
            else if ('title' in firstEntity) assignLabeledValue('setup')
            else if ('best_practice_id' in firstEntity) assignLabeledValue('assessments')
            else assignLabeledValue('recommendations')
          }
        }

        // Since created activities have their id incremented, we need to update their id before we add import them
        // Otherwise, assessments won't be linked to the right activity
        let newID = 1
        for (let i = 0; i < labeledData.activities.length; i++) {
          let activity = labeledData.activities[i]
          const tempID = activity.id

          if (tempID !== newID) {
            activity.id = newID

            // Update assessments that are tied to the activity
            for (let i = 0; i < labeledData.assessments.length; i++) {
              let assessment = labeledData.assessments[i]

              if (assessment.activity_id === tempID) assessment.activity_id = newID
            }
          }
          newID++
        }

        // Send to store
        for (const entity of this.entityTypes) {
          const data = labeledData[entity]
          this.$store.dispatch(`entities/${entity}/create`, { data: data })
        }

        return true
      } else if (fileData.fileObject.type === 'application/json' || extension === 'json') {
        const importDataObj = JSON.parse(fileData.text)
        this.$store.dispatch('entities/setup/create', { data: importDataObj.setupData })
        this.$store.dispatch('entities/activities/create', { data: importDataObj.activityData })
        return 'all'
      }
    },
    csvExportItem: function (item, exportName, customTime) {
      var timestamp = customTime || Date.now()
      let csvString = ''

      for (const entity in item) {
        // combine data
        const entityData = JSON.stringify(item[entity])
        const parsedData = Papa.unparse(entityData)
        csvString += parsedData

        // separate tables
        if (entity !== this.entityTypes[this.entityTypes.length - 1]) {
          csvString += '\n\n'
        }
      }

      var csvExport = new Blob([csvString], { type: 'text/csv;charset=utf-8' })
      saveAs(csvExport, this.$t('fileUpload.csvFileName', { timestamp: timestamp, exportName: exportName }))
    }
  }
}
