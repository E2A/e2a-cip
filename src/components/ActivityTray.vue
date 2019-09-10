<template>
  <div :class="base.activityTray" v-if="activityId">
    <BaseHeading
      :level="6"
      :centered="false"
      :class="type.leadingDefault"
      weight="regular"
      sub
    >{{getActivityType()}}</BaseHeading>

    <BaseHeading color="dark" :level="4" :centered="false" weight="bold" :class="type.leadingDefault">{{getActivityTitle()}}</BaseHeading>

    <div :class="base.gutter">
      <BaseDataGrid :data="expandedData" :class="base.dataList" :condensed="true" />
    </div>

    <div :class="base.gutter">
      <BaseGutterWrapper
        v-if="isYouthCentric()"
        :class="base.icons"
        el="ul"
        gutterX=""
        gutterY="xnarrow"
      >
        <li v-for="(bestPractice, index) of bestPractices" :key="index" :class="base.listIcon">
          <BestPracticeIconSelect
            :id="bestPractice.id"
            :activityID="activity.id"
            :align="'center'"
            editable
          />
        </li>
      </BaseGutterWrapper>
    </div>
    <div :class="[base.gutter]">
      <BaseGutterWrapper :class="[base.commentSection, base.paddingHorizontalNone, base.paddingTopNone, base.flushHorizontalNarrow]" :flush="false">
        <BaseHeading
          :level="5"
          :centered="false"
          :class="space.paddingBottomXnarrow"
          scale="zeta"
          weight="bold"
          color="dark"
        >{{$t('addComment')}}</BaseHeading>
        <div :class="[space.paddingVerticalNarrow]">
          <!-- Show comments first -->
          <ActivityComment
              v-for="comment of comments"
              :key="comment.id"
              :comment="comment"
              :activityId="activity.id"
              @click="deleteComment"
            />
        </div>
          <!-- By default start showing a recommendation -->
          <ActivitiesItemInput
            :activityInstance="activity"
            action="insert"
            inputType="comments"
            :isActive="false"
            :key="inputKey"
            @change="updateInputText"
          />
        <BaseButton
          @click="addComment"
          :class="space.marginLeft"
          :label="$t('addAnotherComment')"
          size="small"
          role="primary"
        />
      </BaseGutterWrapper>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { dataMethods } from '@/components/mixins/dataMethods'
import BaseHeading from '@/components/BaseHeading.vue'
import BaseBodyText from '@/components/BaseBodyText.vue'
import BaseDataGrid from '@/components/BaseDataGrid.vue'
import { activityTypes } from '@/components/mixins/activityTypes'
import BestPracticeIconSelect from '@/components/BestPracticeIconSelect.vue'
import BaseGutterWrapper from '@/components/BaseGutterWrapper.vue'
import { bestPracticeData } from '@/components/mixins/bestPracticeData'
import BaseButton from '@/components/BaseButton'
import ActivityComment from '@/components/ActivityComment'
import ActivitiesItemInput from '@/components/ActivitiesItemInput'

export default {
  name: 'ActivityTray',
  mixins: [bestPracticeData, dataMethods, activityTypes],
  components: {
    BaseBodyText,
    BaseHeading,
    BaseDataGrid,
    BestPracticeIconSelect,
    BaseGutterWrapper,
    BaseButton,
    ActivitiesItemInput,
    ActivityComment
  },
  computed: {
    ...mapState({
      activityId: state => state.mountedActivity
    }),
    activity: function () {
      return this.$store.getters['entities/activities/query']()
        .with('comments')
        .whereId(this.activityId)
        .first()
    },
    comments: function () {
      return this.activity.comments
    },
    commentsNotPresent: function () {
      return this.comments.length === 0
    },
    expandedData: function () {
      return {
        [this.$t('activityTable.defaultID')]: this.activity.id,
        [this.$t('activityTable.defaultBudget')]: `${
          this.activity.budget
        } <small>${this.getItemValue('setup', 'currencyCode')}</small>`,
        [this.$t('activityTable.defaultYouthCentered')]: this.activity
          .youthCentric
          ? this.$t('yesRaw')
          : this.$t('noRaw')
      }
    }
  },
  data: function () {
    return {
      inputKey: 0,
      inputText: ''
    }
  },
  methods: {
    addComment: function () {
      const data = {
        activity_id: this.activityId,
        text: this.inputText
      }
      this.$store.dispatch('entities/comments/insert', { data })
      this.emptyInput()
    },
    deleteComment: function (event, commentId) {
      this.$store.dispatch('entities/comments/delete', commentId)
    },
    getActivityType: function () {
      if (!this.activityId) {
        return null
      }
      const needle = this.activity.type
      const type = this.activityTypeDataset.find(item => {
        return item.key === needle
      })

      return type.title
    },
    getActivityTitle: function () {
      return this.activity.text
    },
    isYouthCentric: function () {
      return this.activity.youthCentric
    },
    updateInputText: function (newValue) {
      this.inputText = newValue
    },
    emptyInput: function () {
      this.inputKey++
      this.inputText = ''
    }
  }
}
</script>

<style src="styles/type.scss" lang="scss" module="type"></style>
<style src="styles/spacing.scss" lang="scss" module="space"></style>

<style lang="scss" module="base">
@import "~styleConfig/color";
@import "~styleConfig/spacing";

.paddingHorizontalNone {
  padding-left: 0;
  padding-right: 0;
}

.paddingTopNone {
  padding-top: 0;
}

.flushHorizontalNarrow {
  margin-left: -(space("narrow"));
  margin-right: -(space("narrow"));
}

.gutter {
  width: 100%;
}

.activityTray {
  composes: default round from "styles/borders.scss";
  composes: whiteBg shadow from "styles/color.scss";
  flex: 0 0 calc(33% - 1.5rem);
  margin-left: 1.5rem;
  padding: 1rem 1rem 0 1rem;

}

.icons {
  padding-inline-start: 0px;
  display: flex;
  justify-content: space-between;
}

.listIcon {
  display: inline-block;
  position: relative;
}

.dataList {
  display: flex;
  padding: space('narrow') space('xnarrow');
  margin-bottom: space('narrow');
  border-bottom: 1px solid color('midtone', $grade: 50);
  :global {
    .dataItem {
      width: 100%;
      display: block;
    }
  }
}

.commentSection {
  composes: top from "styles/borders.scss";
  margin-top: space("medium");
  background-color: color("light");
}
</style>
