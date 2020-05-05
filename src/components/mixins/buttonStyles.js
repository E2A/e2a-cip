export const buttonStyles = {
  props: {
    label: String,
    size: {
      type: String,
      default: "default",
      validator: function (value) {
        return ["small", "default", "large"].indexOf(value) !== -1;
      },
    },
    role: {
      type: String,
      default: "default",
      validator: function (value) {
        return ["default", "primary"].indexOf(value) !== -1;
      },
    },
    weight: {
      type: String,
      default: "bold",
      validator: function (value) {
        return ["light", "regular", "bold"].indexOf(value) !== -1;
      },
    },
    iconLeft: {
      type: String,
      default: "none",
    },
    iconRight: {
      type: String,
      default: "none",
    },
    reverseColors: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    // note: add the button stylesheet to your component with the module name "button"
    sizeClass: function () {
      return this.size !== "default" && this.button[this.size];
    },
    roleClass: function () {
      return this.role !== "default" && this.button[this.role];
    },
    weightClass: function () {
      return this.weight !== "bold" && this.button[this.weight];
    },
    iconClass: function () {
      if (this.iconLeft !== "none") {
        return this.button.hasIconLeft;
      }
      if (this.iconRight !== "none") {
        return this.button.hasIconRight;
      }
    },
    reverseClass: function () {
      return this.reverseColors && this.button.reverse;
    },
    defaultClassList: function () {
      return [
        this.button.default,
        this.sizeClass,
        this.roleClass,
        this.weightClass,
        this.iconClass,
        this.reverseClass,
      ];
    },
  },
  data() {
    return {
      iconSize: "0.8em",
    };
  },
};
