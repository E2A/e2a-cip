<template>
  <label :class="[button.default, base.wrapper]">
    {{ $t("fileUpload.textReaderImport") }}
    <input
      type="file"
      accept=".csv,.json, text/csv, application/json"
      @change="loadTextFromFile"
    />
  </label>
</template>

<script>
export default {
  methods: {
    loadTextFromFile: function (ev) {
      const file = ev.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) =>
        this.$emit("file-read-successful", {
          text: e.target.result,
          fileObject: file,
        });
      reader.readAsText(file);
    },
  },
};
</script>

<style src="styleShared/button.scss" lang="scss" module="button"></style>

<style lang="scss" module="base">
.wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;

  input {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0;
  }
}
</style>
