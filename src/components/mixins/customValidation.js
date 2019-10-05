import { Validator } from 'vee-validate'

// Uniqueness validator
// use: uniqueness: entityField,entityType,entityId(optional),fieldFormat(optional)
// 1 required = entity field (ie text, etc)
// 2 required = entity type (ie activites, recommendation)
// 3 = entity ID
// 4 = the format of the field - ie number or string, default = string

export const customValidation = {

  created () {
    Validator.extend('uniqueness', {
      getMessage: (field, args) => {
        const entityType = args[1]
        return this.$t('uniquenessError', { field: field, entityType: entityType })
      },
      validate: (value, args) => {
        const fieldFormat = args[3]
        const entityId = args[2]
        const entityType = args[1]
        const entityField = args[0]
        var existingEntity = 0

        // Ensure field format is correct
        if (fieldFormat === 'number') {
          value = Number(value)
        }

        // Exclude existing entity
        if (entityId) {
          existingEntity = this.$store.getters[`entities/${entityType}/query`]()
            .where(entityField, value)
            .where(record => record.id !== Number(entityId))
            .count()
        } else {
          existingEntity = this.$store.getters[`entities/${entityType}/query`]().where(entityField, value).count()
        }

        return (existingEntity === 0)
      }
    })

    Validator.extend('decimal', {
      validate: value => {
        const hasCorrectDecimal = decimal => {
          const valueString = String(value)
          const excludedDecimal = decimal === '.' ? ',' : '.'
          console.log('validation', valueString, valueString.indexOf(excludedDecimal) === -1 && !valueString.match(/[a-z]/i))

          const hasWrongDecimal = valueString.indexOf(excludedDecimal) !== -1
          const hasLetters = valueString.match(/[a-z]/i)
          const hasMultipleDecimals = valueString.indexOf(decimal) !== valueString.lastIndexOf(decimal)

          return (!hasWrongDecimal && !hasLetters && !hasMultipleDecimals)
        }

        // Check if decimal is correct
        if (this.$i18n.locale === 'en') return hasCorrectDecimal('.')
        else if (this.$i18n.locale === 'fr') return hasCorrectDecimal(',')
      }
    })
  }
}
