<template>
  <article>
    <NavBackLink
      :url="{ name: 'activity', params: { activityId: backToActivityId } }"
      :label="$t('backToActivities')"
    />
    <BasePageIntro
      :title="$t('activityTypeTitle')"
      :blurb="$t('activityTypeIntro')"
    />
    <div :class="space.paddingWide">
      <BaseWidthWrapper>
        <BaseVerticalList :items="activityTypeDataset" borders>
          <BaseGutterWrapper
            slot-scope="{ item }"
            :class="base.card"
            el="section"
          >
            <div :class="base.summary">
              <BaseHeading
                :level="2"
                :class="space.paddingBottomXnarrow"
                :centered="false"
                scale="gamma"
              >
                {{ item.title }}
              </BaseHeading>
              <BaseBodyText :content="item.body" size="zeta" />
            </div>
          </BaseGutterWrapper>
        </BaseVerticalList>
      </BaseWidthWrapper>
    </div>
  </article>
</template>

<script>
import { activityTypes } from "@/components/mixins/activityTypes.js";
import { dataMethods } from "@/components/mixins/dataMethods.js";
import NavBackLink from "@/components/NavBackLink.vue";
import BasePageIntro from "@/components/BasePageIntro.vue";
import BaseHeading from "@/components/BaseHeading.vue";
import BaseBodyText from "@/components/BaseBodyText.vue";
import BaseWidthWrapper from "@/components/BaseWidthWrapper.vue";
import BaseVerticalList from "@/components/BaseVerticalList.vue";
import BaseGutterWrapper from "@/components/BaseGutterWrapper.vue";
import BaseButtonLink from "@/components/BaseButtonLink.vue";

export default {
  name: "ActivityTypeInfo",
  components: {
    NavBackLink,
    BasePageIntro,
    BaseHeading,
    BaseBodyText,
    BaseWidthWrapper,
    BaseVerticalList,
    BaseGutterWrapper,
    BaseButtonLink
  },
  mixins: [activityTypes, dataMethods],
  props: {
    backToActivityId: [String, Number]
  }
};
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>

<style lang="scss" module="base">
.card {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

.iconWrapper {
  flex: 1 0 4rem;
  text-align: center;
}

.icon {
  display: inline-block;
  max-width: 6rem;
}

.summary {
  flex: 1 0 26rem;
}
</style>
