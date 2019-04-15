<template>
  <Layout>
    <logo-section class="section" :effect="effect" :color="colors[index]" v-for="(experience, index) in $page.experiences.edges" :key="index">
    </logo-section>

  </Layout>
</template>

<page-query>
{
  experiences: allExperience (sortBy: "date", order: DESC) {
    edges {
      node {
        title
        date (format: "YYYY")
        tags
        position
        description
      }
    }
  }
}
</page-query>

<script>
import LogoSection from '~/components/LogoSection'

export default {
  components: {
    LogoSection
  },
  data () {
    return {
      effects: ['EffectDroplets', 'EffectGradient', 'EffectSlices', 'EffectWebs'],
      effectsToView: [],
      effect: null,
      colors: ['#4abdac', '#fc4a1a', '#f7b733', '#4abdac', '#fc4a1a', '#f7b733']
    }
  },
  methods: {
    rotateEffect () {
      if (!this.effectsToView.length) {
        this.effectsToView = this.effects.filter((effect) => {
          return effect !== this.effect
        })
      }
      let randomIndex = Math.floor(Math.random() * this.effectsToView.length)
      this.effect = this.effectsToView[randomIndex]
      this.effectsToView.splice(randomIndex, 1)
    }
  },
  created () {
    this.rotateEffect()
  },
  metaInfo: {
    title: 'Miles Ingram'
  }
}
</script>

<style lang="scss" scoped>
</style>
