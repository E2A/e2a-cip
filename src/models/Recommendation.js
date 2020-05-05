import { Model } from "@vuex-orm/core";
import Activity from "./Activity";

export default class Recommendation extends Model {
  static entity = "recommendations";

  static fields() {
    return {
      id: this.increment(),
      activity_id: this.number(0),
      text: this.string(""),
      activity: this.belongsTo(Activity, "activity_id"),
    };
  }
}
