<template>
  <div :class="base.activityTray" v-if="activityId">
    <div :class="base.closeButton" @click="close" />
    <BaseHeading
      :level="6"
      :centered="false"
      :class="[type.leadingDefault, base.typeHeading]"
      weight="regular"
      sub
    >{{getActivityType()}}</BaseHeading>

    <BaseHeading
      color="dark"
      :level="4"
      :centered="false"
      weight="bold"
      :class="type.leadingDefault"
    >{{getActivityTitle()}}</BaseHeading>

    <BaseBodyText
      :class="base.activityText"
      :content="getActivityText()"
      size="zeta"
      font="display"
      weight="light"
      />

    <div :class="[base.gutter, space.paddingTopNarrow]">
      <BaseDataGrid :data="expandedData" :class="base.dataList" :condensed="true" />
    </div>

    <div :class="[base.gutter, space.paddingVerticalNarrow, space.paddingBottomXnarrow]">
      <BaseHeading
        :level="5"
        :centered="false"
        :class="space.paddingBottomNarrow"
        scale="zeta"
        weight="light"
        color="dark"
      >{{$t('analysis.instructions.heading')}}:</BaseHeading>
      <BaseGutterWrapper :class="base.icons" el="ul" gutterX gutterY="xnarrow">
        <li v-for="(bestPractice, index) of bestPractices" :key="index" :class="base.listIcon">
          <BestPracticeIconSelect
            :id="bestPractice.id"
            :name="`bestPracticeSelect-${bestPractice.id}`"
            :activityID="activity.id"
          />
          <!-- <span :class="base.listIconTitle">{{bestPractice.title}}</span> -->
        </li>
      </BaseGutterWrapper>
    </div>
    <div :class="[base.gutter]">
      <BaseGutterWrapper
        :class="[base.commentSection, base.paddingHorizontalNone, space.paddingTopXnarrow, base.flushHorizontalNarrow]"
        :flush="false"
      >
        <BaseHeading
          :level="5"
          :centered="false"
          :class="space.paddingBottomXnarrow"
          scale="zeta"
          weight="bold"
          color="dark"
        >{{$t('addComment')}}</BaseHeading>
        <div :class="[base.commentsContainer]">
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
      </BaseGutterWrapper>

      <div
        :class="[space.paddingVerticalNarrow, space.paddingHorizontalNarrow, base.activtyFooter, base.flushHorizontalNarrow]"
      >
        <BaseButton
          @click="editActivity"
          :label="$t('editActivity')"
          size="small"
          role="default"
        />
        <BaseButton
          @click="addComment"
          :class="space.marginLeft"
          :label="$t('addAnotherComment')"
          size="small"
          role="primary"
        />
      </div>
    </div>
  </div>
</template>

<script>
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
  props: {
    activityId: [String, Number]
  },
  computed: {
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
    editActivity: function () {
      this.$router.push({
        name: 'activity',
        params: { activityId: this.activityId }
      })
    },
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
      return this.activity.activityNumber
    },
    getActivityText: function () {
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
    },
    close: function () {
      this.$store.commit('SET_MOUNTED_ACTIVITY', 0)
    }
  }
}
</script>

<style src="styles/type.scss" lang="scss" module="type"></style>
<style src="styles/color.scss" lang="scss" module="color"></style>
<style src="styles/spacing.scss" lang="scss" module="space"></style>

<style lang="scss" module="base">
@import "~styleConfig/color";
@import "~styleConfig/spacing";
@import '~styleConfig/scale';
@import '~styleConfig/type';

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

.commentsContainer {
  padding: 0 1rem;
}

.activityTray {
  composes: default round from "styles/borders.scss";
  composes: whiteBg shadow from "styles/color.scss";
  flex: 0 0 calc(33% - 1.5rem);
  margin-left: 1.5rem;
  padding: 1rem 1rem 0 1rem;
  position: relative;
}

.closeButton {
  $size: 0.9em;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTggNi4xNDRsNC43Ni00Ljc2YTEuMzEzIDEuMzEzIDAgMCAxIDEuODU2IDEuODU3TDkuODU2IDhsNC43NiA0Ljc2YTEuMzEzIDEuMzEzIDAgMCAxLTEuODU3IDEuODU2TDggOS44NTZsLTQuNzYgNC43NmExLjMxMyAxLjMxMyAwIDAgMS0xLjg1Ni0xLjg1N0w2LjE0NCA4bC00Ljc2LTQuNzZhMS4zMTIgMS4zMTIgMCAxIDEgMS44NTctMS44NTZMOCA2LjE0NHoiIGZpbGw9IiM4REEzQzAiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvc3ZnPg==) !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
  background-size: contain !important;

  position: absolute;
  z-index: 1; // Subheading blocks pointer events
  top: 1.3rem;
  right: 1.3rem;
  height: $size;
  width: $size;
  cursor: pointer;
}

.icons {
  padding-inline-start: 0px;
  display: flex;
  flex-wrap: wrap;
  margin-left: -(space('xxnarrow'));
}

.listIcon {
  display: inline-block;
  position: relative;
  flex: 1 100%;
  padding: 0;
}

.listIconTitle {
  font-size:  0.65rem;
}

.dataList {
  display: flex;
  padding: space("narrow") space("xnarrow");
  margin-bottom: space("narrow");
  border-bottom: 1px solid color("midtone", $grade: 50);
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
  background-color: color("light", $grade: 50);
}

.activtyFooter {
  background-color: color("light", $grade: 50);
  text-align: right;
  display: flex;
  justify-content: flex-end;
}
</style>
