<!--
  Global Recommendation Component
  -> use to add an recommendation to an activity
  -> part of Activity Item List
-->

<template>
  <div>
    <!-- recommendations -->
    <ol :class="[base.recommendations, space.paddingVerticalNarrow]">
      <!-- Then show all once its been added -->
      <ActivitiesItemInput
        v-for="recommendation of globalRecommendations"
        :key="recommendation.id"
        :id="recommendation.id"
        action='update'
        inputType="globalrecommendations"
        :existingText="recommendation.text"
      />
      <!-- By default start showing a recommendation -->
      <ActivitiesItemInput
        action='insert'
        inputType="globalrecommendations"
        @change="insertRecommendation"
        :key="inputKey"
      />
      
    </ol>
    <BaseButton
      @click="addRecommendation"
      :class="space.marginLeft"
      :label="$t('addAnotherRecommendation')"
      size="small"
      role="primary"
    />
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue'
import ActivitiesItemInput from '@/components/ActivitiesItemInput.vue'

export default {
  name: 'GlobalRecommendation',
  components: {
    BaseButton,
    ActivitiesItemInput
  },
  props: {
    'insertText': {
      type: String,
    }
  },
  data: function() {
    return {
      inputKey: 1000,
      itemText: this.insertText,
    }
  },
  computed: {
    recommendationsNotPresent: function () {
      return this.globalRecommendations.length === 0
    },
    globalRecommendations: function () {
      // Get all global recommendations
      return this.$store.getters['entities/globalrecommendations/all']()
    }
  },
  methods: {
    insertRecommendation: function(text) {
      this.itemText = text;
    },
    addRecommendation: function () {
      // Add a new recommendation
      this.$store.dispatch('entities/globalrecommendations/insert', {
        data: {
          text: this.itemText
        }
      })

      this.clearText()
    },
    clearText: function() {
      this.inputKey++;
      this.itemText = '';
    }
  }
}
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/type.scss" lang="scss" module="type"></style>

<style lang="scss" module="base">
.wrapper {
  composes: top from 'styles/borders.scss';
  composes: paddingVerticalNarrow from 'styles/spacing.scss';
  display: block;
  position: relative;
}

.expandedWrapper {
  composes: paddingTopNarrow from 'styles/spacing.scss';
  display: block;

  @supports (display: flex) {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
}

.gutter {
  display: inline-block;
  vertical-align: middle;
}

.data {
  display: inline-block;

  @supports (flex: 1) {
    flex: 1;
  }
}

.dot {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: inline-block;
}

.yes {
  background-color: green;
}

.partially {
  background-color: yellow;
}

.no {
  background-color: gray;
}

.icons {
  display: inline-block;
  list-style: none;
  text-align: right;
}

.icon {
  display: inline-block;
}

.recommendations {
  counter-reset: recommendations;
  padding-left: 0;
}
</style>
