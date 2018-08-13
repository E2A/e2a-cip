<template>
  <label class="text-reader">
    {{$t('fileUpload.textReaderImport')}}
    <input type="file" @change="loadTextFromFile" accept=".csv,.json, text/csv, application/json">
  </label>
</template>

<script>
export default {
  methods: {
    loadTextFromFile: function (ev) {
      const file = ev.target.files[0]
      const reader = new FileReader()
      reader.onload = e => this.$emit('file-read-successful', {text: e.target.result, fileObject: file})
      reader.readAsText(file)
    }
  }
}
</script>

<style scoped>
.text-reader {
  position: relative;
  overflow: hidden;
  display: inline-block;

  /* Fancy button looking */
  border: 2px solid black;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
}
.text-reader input {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0;
}
</style>
