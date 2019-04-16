<template>
  <Layout>
    <logo-section :effect="effect" :color="colorAtIndex(0)" :progress="scrollProgress">
      <h1 class="my-name">
        Miles Ingram
      </h1>
    </logo-section>
    <logo-section :effect="effect" :color="colorAtIndex(1)" :progress="scrollProgress">
      <h2 class="my-pitch">
        Bits, Bots, Bio, Battlestar Galactica
      </h2>
    </logo-section>
    <logo-section :effect="effect" :color="colorAtIndex(2)" :progress="scrollProgress">
      <h2 class="my-about">
        NYC born and raised, I started dabbling with programming by making silly flash games and bizzare lego mindstorms.
      </h2>
    </logo-section>
    <logo-section :effect="effect" :color="colorAtIndex(index + 3)" :progress="scrollProgress" v-for="(experience, index) in $page.experiences.edges" :key="index">
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
      colors: ['#4abdac', '#fc4a1a', '#f7b733', '#228ae6'],
      scrollProgressTarget: 0,
      scrollProgress: 0,
      scrollEase: 0.1,
      scrollAnimation: null
    }
  },
  methods: {
    colorAtIndex (index) {
      let moduloIndex = index % this.colors.length
      return this.colors[moduloIndex]
    },
    rotateEffect () {
      if (!this.effectsToView.length) {
        this.effectsToView = this.effects.filter((effect) => {
          return effect !== this.effect
        })
      }
      let randomIndex = Math.floor(Math.random() * this.effectsToView.length)
      this.effect = this.effectsToView[randomIndex]
      this.effectsToView.splice(randomIndex, 1)
    },
    updateScrollProgressTarget () {
      this.scrollProgressTarget = 1 - (window.pageYOffset / (document.body.clientHeight - window.innerHeight))
    },
    updateScrollProgress () {
      this.scrollProgress += (this.scrollProgressTarget - this.scrollProgress) * this.scrollEase
      this.scrollAnimation = window.requestAnimationFrame(this.updateScrollProgress)
    }
  },
  created () {
    if (process.isClient) {
      this.rotateEffect()
      window.addEventListener('scroll', this.updateScrollProgressTarget)
      window.addEventListener('resize', this.updateScrollProgressTarget)
      this.updateScrollProgressTarget()
      this.updateScrollProgress()
    }
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.updateScrollProgressTarget)
    window.removeEventListener('resize', this.updateScrollProgressTarget)
  },
  metaInfo: {
    title: 'Miles Ingram'
  }
}
</script>

<style lang="scss" scoped>
.my-name {
  text-transform: uppercase;
}

.my-name, .my-pitch, .my-about {
  font-weight: 400;
  text-align: center;
}

.experience-section {
}
</style>
