import { Database } from '@vuex-orm/core'
import Activity from '@/models/Activity'
import activities from './modules/activities'
import Setup from '@/models/Setup'
import setup from './modules/setup'
import Assessment from '@/models/Assessment'
import assessments from './modules/assessments'
import Recommendation from '@/models/Recommendation'
import recommendations from './modules/recommendations'

const database = new Database()

database.register(Activity, activities)
database.register(Setup, setup)
database.register(Assessment, assessments)
database.register(Recommendation, recommendations)

export default database
