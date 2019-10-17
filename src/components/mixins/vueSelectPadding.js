import $ from 'jquery'

export const paddingFix = {
  data: function () {
    return {
      vSelectElement: null,
      dropdownToggle: null,
      search: null
    }
  },
  methods: {
    handlePaddingClick: function (event) {
      // v-select rejects events that occur in an element's padding
      // this method runs these events anyways
      const clickedPadding = className => event.target.classList.contains(className)

      const isOpen = this.vSelectElement.hasClass('vs--open')

      const isDropdownTogglePadding = clickedPadding('vs__dropdown-toggle')
      const isSelectedOptionsPadding = clickedPadding('vs__selected-options')
      const isActionPadding = clickedPadding('vs__actions')

      const isPadding = isDropdownTogglePadding || isSelectedOptionsPadding || isActionPadding

      if (!isOpen && isPadding) {
        this.search.focus()
      } else if (isOpen && isPadding) {
        this.search.blur()
      }
    },
    addElements: function () {
      this.vSelectElement = $(`#${this.name}`)
      this.dropdownToggle = this.vSelectElement.find('.vs__dropdown-toggle')
      this.search = this.dropdownToggle.find('.vs__selected-options').find('.vs__search')
    }
  },
  mounted () {
    this.addElements()
    this.dropdownToggle.mousedown(this.handlePaddingClick)
  },
  beforeDestroy () {
    this.dropdownToggle.unbind()
  }
}
