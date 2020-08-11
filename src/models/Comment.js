import { Model } from "@vuex-orm/core";
import Activity from "./Activity";

export default class Comment extends Model {
  static entity = "comments";

  static fields() {
    return {
      id: this.increment(),
      text: this.string(""),
      activity_id: this.number(0),
      activity: this.belongsTo(Activity, "activity_id")
    };
  }
}
