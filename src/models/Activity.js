import { Model } from "@vuex-orm/core";
import Assessment from "./Assessment";
import Recommendation from "./Recommendation";
import BestPracticeIcon from "./BestPracticeIcon";
import Comment from "./Comment";

export default class Activity extends Model {
  static entity = "activities";

  static fields() {
    return {
      id: this.increment(),
      activityNumber: this.string(""),
      text: this.string(""),
      budget: this.number(0),
      youthCentric: this.boolean(false),
      type: this.string(""),
      assessments: this.hasMany(Assessment, "activity_id"),
      recommendations: this.hasMany(Recommendation, "activity_id"),
      icons: this.hasMany(BestPracticeIcon, "activity_id"),
      comments: this.hasMany(Comment, "activity_id"),
    };
  }

  /**
   * Get a shortened activity text
   */
  get shortText() {
    return truncateStr(this.text, 75);
  }

  /**
   * Get a shortened activity number
   */
  get shortNumber() {
    return truncateStr(this.activityNumber, 10);
  }
}

/**
 * Helper function
 */
function truncateStr(str, length, ending = "...") {
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
}
