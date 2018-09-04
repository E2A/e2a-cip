import { Model } from '@vuex-orm/core'

export default class CountryIndicator extends Model {
  static entity = 'countryindicators'

  static fields () {
    return {
      id: this.increment(),
      indicatorId: this.number(0),
      countryCode: this.string(''),
      name: this.string(''),
      description: this.string(''),
      value: this.attr(null),
      unit: this.string('%'),
      sourceUrl: this.string(''),
      citation: this.string(''),
      comparatorOperator: this.string(''),
      comparatorIndicator: this.string(''),
      comparatorTextTrue: this.string(''),
      comparatorTextFalse: this.string(''),
      comparatorTextTrueType: this.string(''),
      comparatorTextFalseType: this.string(''),
      questions: this.attr(null)
    }
  }
}
