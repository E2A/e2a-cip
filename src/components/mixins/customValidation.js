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
  }
}
