import { Database } from "@vuex-orm/core";
import Activity from "@/models/Activity";
import activities from "./modules/activities";
import Setup from "@/models/Setup";
import setup from "./modules/setup";
import Assessment from "@/models/Assessment";
import assessments from "./modules/assessments";
import Recommendation from "@/models/Recommendation";
import recommendations from "./modules/recommendations";
import Comment from "@/models/Comment";
import comments from "./modules/comments";
import GlobalRecommendation from "@/models/GlobalRecommendation";
import globalrecommendations from "./modules/globalrecommendations";
import BestPracticeIcon from "@/models/BestPracticeIcon";
import bestpracticeicons from "./modules/bestpracticeicons";
import CountryIndicator from "@/models/CountryIndicator";
import countryindicators from "./modules/countryindicators";
import GlobalNotification from "@/models/GlobalNotification";
import globalnotifications from "./modules/globalnotifications";

const database = new Database();

database.register(Activity, activities);
database.register(Setup, setup);
database.register(Assessment, assessments);
database.register(Recommendation, recommendations);
database.register(Comment, comments);
database.register(GlobalRecommendation, globalrecommendations);
database.register(BestPracticeIcon, bestpracticeicons);
database.register(CountryIndicator, countryindicators);
database.register(GlobalNotification, globalnotifications);

export default database;
