<template>
  <article>
    <NavBackLink
      :url="{name: 'evidence-informed-practices'}"
      :label="$t('backToBestPractices')"
    />
    <BaseSectionWrapper :class="space.paddingTopNarrow">
      <!-- title -->
      <header :class="space.paddingVerticalWide">
        <BaseHeading
          scale="delta"
          :sub="true"
          :class="[space.paddingBottomXnarrow, color.midtone]"
        >
          {{ $t('bestPracticeSubtitle') }}
        </BaseHeading>
        <BaseHeading>{{ bestPractices[id - 1].title }}</BaseHeading>
      </header>

      <!-- body -->
      <BaseWidthWrapper>
        <BaseBodyText :content="bestPractices[id - 1].body" />
      </BaseWidthWrapper>
    </BaseSectionWrapper>

    <!-- Resources -->
    <BaseSectionWrapper v-if="resources.length > 0" border>
      <BaseHeading
        :class="space.paddingBottom"
        :level="2"
      >
        {{$t('bestPracticeResourceSubtitle')}}
      </BaseHeading>
      <BaseWidthWrapper width="xxwide">
        <BaseGallery size="large" :items="resources" />
      </BaseWidthWrapper>
    </BaseSectionWrapper>
  </article>
</template>

<script>
import { bestPracticeData } from '@/components/mixins/bestPracticeData.js'
import NavBackLink from '@/components/NavBackLink.vue'
import BasePageIntro from '@/components/BasePageIntro.vue'
import BaseHeading from '@/components/BaseHeading.vue'
import BaseButtonLink from '@/components/BaseButtonLink.vue'
import BaseBodyText from '@/components/BaseBodyText.vue'
import BaseSectionWrapper from '@/components/BaseSectionWrapper.vue'
import BaseWidthWrapper from '@/components/BaseWidthWrapper.vue'
import BaseGallery from '@/components/BaseGallery.vue'

export default {
  name: 'BestPractice',
  mixins: [bestPracticeData],
  components: {
    NavBackLink,
    BasePageIntro,
    BaseHeading,
    BaseButtonLink,
    BaseBodyText,
    BaseSectionWrapper,
    BaseWidthWrapper,
    BaseGallery
  },
  props: {
    id: [String, Number]
  },
  computed: {
    resources: function () {
      return this.bestPractices[this.id - 1].resources.map(item => {
        return {
          title: item.resource.title,
          teaser: item.resource.teaser,
          url: item.resource.url
        }
      })
    },
    // FPO for styling - kill for deployment
    dummyResources: function () {
      return [
        {
          title: 'Lorem ipsum dolor sit amet',
          teaser: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Paupertas si malum est, mendicus beatus esse nemo potest, quamvis sit sapiens. Videamus igitur sententias eorum, tum ad verba redeamus. Duo Reges: constructio interrete. Fatebuntur Stoici haec omnia dicta esse praeclare, neque eam causam Zenoni desciscendi fuisse. Quis non odit sordidos, vanos, leves, futtiles? Ita fit cum gravior, tum etiam splendidior oratio.',
          url: '#'
        },
        {
          title: 'Adipiscig elit consectetur tum ad verba',
          teaser: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Qui-vere falsone, quaerere mittimus-dicitur oculis se privasse; Scio enim esse quosdam, qui quavis lingua philosophari possint; Duarum enim vitarum nobis erunt instituta capienda. Piso igitur hoc modo, vir optimus tuique, ut scis, amantissimus.',
          url: '#'
        },
        {
          title: 'Qui autem esse poteris nisi te amor ipse',
          teaser: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eodem modo is enim tibi nemo dabit, quod, expetendum sit, id esse laudabile. Etenim semper illud extra est, quod arte comprehenditur. Nec vero sum nescius esse utilitatem in historia, non modo voluptatem. Quid enim tanto opus est instrumento in optimis artibus comparandis? Duo Reges: constructio interrete. Neque solum ea communia, verum etiam paria esse dixerunt. Qui autem esse poteris, nisi te amor ipse ceperit? Scaevolam M. Non est igitur voluptas bonum.',
          url: '#'
        },
        {
          title: 'Ut conquiescere ne infantes quidem possint',
          teaser: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Atqui haec patefactio quasi rerum opertarum, cum quid quidque sit aperitur, definitio est. Quae quidem vel cum periculo est quaerenda vobis; Quamquam id quidem licebit iis existimare, qui legerint. Ut aliquid scire se gaudeant? Videmus igitur ut conquiescere ne infantes quidem possint. Duo Reges: constructio interrete. Invidiosum nomen est, infame, suspectum. Is ita vivebat, ut nulla tam exquisita posset inveniri voluptas, qua non abundaret. Quicquid porro animo cernimus, id omne oritur a sensibus; Illi enim inter se dissentiunt.',
          url: '#'
        }
      ]
    }
  }
}
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/color.scss" lang="scss" module="color"></style>
<style src="styles/borders.scss" lang="scss" module="border"></style>

<style lang="scss" module="base">
.resourceCard {
  composes: default round from 'styles/borders.scss';
  composes: lightBg from 'styles/color.scss';
}
</style>
