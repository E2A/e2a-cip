import { saveAs } from "file-saver";
import * as Papa from "papaparse";
import Blob from "blob";

export const dataIO = {
  data() {
    return {
      entityTypes: [
        "activities",
        "setup",
        "globalrecommendations",
        "assessments",
        "comments"
      ]
    };
  },
  computed: {
    emptyCsvRow: function() {
      // proper csv formatting: each row has same # of fields, blank rows have empty fields
      let max = 0;

      this.entityTypes.forEach(entity => {
        const data = this.$store.getters[
          `entities/${entity}/query`
        ]().model.fields();
        const keys = Object.keys(data).length;

        if (keys > max) max = keys;
      });

      return this.commaSequence(max - 1);
    }
  },
  methods: {
    runExportData: function(exportType = "json") {
      const timestamp = Date.now();

      if (exportType === "json") {
        const defaultFilename = this.$t("fileUpload.jsonFileName", {
          timestamp: timestamp
        });

        // Get JSON for each data type, activities will include all relationships
        const activityData = JSON.stringify(
          this.$store.getters["entities/activities/query"]()
            .withAll()
            .get()
        );
        const setupData = JSON.stringify(
          this.$store.getters["entities/setup/all"]()
        );

        // Build combinded JSON
        const jsonData = `{"setupData": ${setupData}, "activityData": ${activityData}}`;

        // Save
        this.exportFile(jsonData, defaultFilename, "json");
      } else {
        const defaultFilename = this.$t("fileUpload.csvFileName", {
          timestamp: timestamp
        });
        let csvString = "";

        // Export csv data for each data type
        for (const entity of this.entityTypes) {
          const entityData = this.$store.getters[`entities/${entity}/all`]();

          // Combine data
          const stringData = JSON.stringify(entityData);
          const parsedData = Papa.unparse(stringData);
          csvString += entity + `${this.emptyCsvRow}\n` + parsedData;

          // Separate tables
          if (entity !== this.entityTypes[this.entityTypes.length - 1]) {
            csvString += `\n${this.emptyCsvRow}\n`;
          }
        }

        // Save
        this.exportFile(csvString, defaultFilename, "csv");
      }

      return true;
    },
    exportFile: function(data, name, type) {
      if (type !== "csv" && type !== "json") {
        throw new Error('exportFile: type argument must be "csv" or "json"');
      }

      if (this.checkElectron()) {
        const { dialog } = require("electron").remote;
        const fs = require("fs");

        const options = {
          defaultPath: name,
          filters:
            type === "csv"
              ? [{ name: "CSV files", extensions: ["csv"] }]
              : [{ name: "JSON files", extensions: ["json"] }]
        };
        // open file - callback runs when user clicks save
        // https://electronjs.org/docs/api/dialog#dialogshowsavedialogbrowserwindow-options
        dialog.showSaveDialog(options, filename => {
          fs.writeFileSync(filename, data, "utf-8");
        });
      } else {
        const fileType =
          type === "csv" ? "text/csv;charset=utf-8" : "text/json;charset=utf-8";

        const exportData = new Blob([data], { type: fileType });
        saveAs(exportData, name);
      }
    },

    parseFileData: function(fileData) {
      // Check file extension (windows cant seem find to find MIME data)
      const extension = fileData.fileObject.name.split(".").pop();

      if (fileData.fileObject.type === "text/csv" || extension === "csv") {
        // Parse
        const parsedData = this.parseCsvData(fileData.text);
        const updatedData = this.updateActivityIDs(parsedData);

        // Send to store
        for (const entity of this.entityTypes) {
          const entityData = updatedData[entity];
          if (entityData) {
            this.$store.dispatch(`entities/${entity}/create`, {
              data: entityData
            });
          }
        }

        return true;
      } else if (
        fileData.fileObject.type === "application/json" ||
        extension === "json"
      ) {
        const importDataObj = JSON.parse(fileData.text);
        this.$store.dispatch("entities/setup/create", {
          data: importDataObj.setupData
        });
        this.$store.dispatch("entities/activities/create", {
          data: importDataObj.activityData
        });
        return "all";
      }
    },
    parseCsvData: function(csvData) {
      let labeledData = {};
      // Each set of data is separated by a newline, commas (blank fields), and another new line
      const manyEntities = csvData.split(
        `\n${this.longestCommaSequence(csvData)}`
      );

      manyEntities.forEach(elem => {
        const entity = elem.trim();

        // separate type and data
        const entityType = entity.substring(0, entity.indexOf(","));
        const entityData = entity.substring(
          entity.indexOf("\n") + 1,
          entity.length
        );

        if (entityData && entityData !== entity) {
          const parsedData = Papa.parse(entityData, { header: true }).data;
          labeledData[entityType] = parsedData;
        }
      });

      return labeledData;
    },
    updateActivityIDs: function(data) {
      // Since store auto increments activity ids, update entities that store an activity_id
      let belongsToActivity = [];
      let updatedData = data;

      // record which entities store activity_ids
      for (const entity in data) {
        const firstRecord = data[entity][0];

        if (firstRecord && firstRecord.hasOwnProperty("activity_id")) {
          belongsToActivity.push(entity);
        }
      }

      // update activity id
      updatedData.activities.forEach((activity, index) => {
        const oldID = activity.id;
        const newID = index + 1;

        if (oldID !== newID) {
          activity.id = newID;

          // update fields that use the old id
          belongsToActivity.forEach(entity => {
            updatedData[entity].forEach(record => {
              if (record.activity_id === oldID) record.activity_id = newID;
            });
          });
        }
      });

      return updatedData;
    },
    longestCommaSequence: function(str) {
      let max = 0;
      let current = 0;

      for (let i = 0; i < str.length; i++) {
        if (str[i] === ",") current++;
        else current = 0;

        if (current > max) max = current;
      }

      return this.commaSequence(max);
    },
    commaSequence: function(length) {
      let commas = "";
      let count = length;

      while (count) {
        commas += ",";
        count--;
      }

      return commas;
    }
  }
};
