// some basic helpers for manipulating strings
// -> used, e.g., to match camel-cased class names
export const stringHelpers = {
  methods: {
    // https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
    capitalize: function(string) {
      return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
    },
    titleCase: function(str) {
      return str
        .toLowerCase()
        .split(" ")
        .map(word => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
    },
    stripWhitespace: function(str) {
      return str.replace(/(^\s+|\s+$)/g, "");
    }
  }
};

// some helpers for generating class names
// -> use these helpers so we can manage class names in one place
export const styleHelpers = {
  methods: {
    // generate a type scale class name, e.g. scaleAlpha
    // usage: in your component, do type[typeScaleClass('alpha')]
    typeScaleClass: function(size) {
      return `scale${stringHelpers.methods.capitalize(size)}`;
    },
    // generate a spacing class name, e.g. scaleAlpha
    // usage: in your component, do space[spaceClass('padding', 'wide', 'top')]
    // 'side' can be 'horizontal' or 'vertical' too
    spaceClass: function({
      prop = "padding",
      size = "medium",
      side = "all",
      between = false
    } = {}) {
      const caps = stringHelpers.methods.capitalize;

      if (side === "all") {
        return `${prop}${size !== "medium" ? caps(size) : ""}`;
      }
      return `${prop}${caps(side)}${between ? "Between" : ""}${
        size !== "medium" ? caps(size) : ""
      }`;
    }
  }
};
/**
 * Parses an integer into a string with the appropriate
 * metric suffix.
 * @param {int} n
 */
export const parseIntWithSuffix = n => {
  const ranges = [
    { divider: 1e18, suffix: "E" },
    { divider: 1e15, suffix: "P" },
    { divider: 1e12, suffix: "T" },
    { divider: 1e9, suffix: "G" },
    { divider: 1e6, suffix: "M" },
    { divider: 1e3, suffix: "k" }
  ];

  for (var i = 0; i < ranges.length; i++) {
    if (n >= ranges[i].divider) {
      return (n / ranges[i].divider).toFixed(1).toString() + ranges[i].suffix;
    }
  }
  return n.toString();
};

/**
 * Returns the currency symbole based on the locale and currency
 * @param {*} locale
 * @param {*} currency
 */
export const getCurrencySymbol = (locale, currency) =>
  (0)
    .toLocaleString(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    .replace(/\d/g, "")
    .trim();
