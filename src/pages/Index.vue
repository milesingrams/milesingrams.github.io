<template>
  <Layout>
    <div class="logo-wrap">
      <logo :effect="effect" :color="color" :progress="scrollProgress"></logo>
    </div>

    <logo-section>
      <h1 class="my-name">
        Miles Ingram
      </h1>
    </logo-section>
    <logo-section>
      <h2 class="my-pitch">
        Bits, Bots, Bio, Battlestar Galactica
      </h2>
    </logo-section>
    <logo-section>
      <h2 class="my-about">
        NYC born and raised, I started dabbling with programming by making silly flash games and bizzare lego mindstorms.
      </h2>
    </logo-section>
    <logo-section v-for="(experience, index) in $page.experiences.edges" :key="index">
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
import Logo from '~/components/Logo'
import LogoSection from '~/components/LogoSection'

export default {
  components: {
    Logo,
    LogoSection
  },
  data () {
    return {
      effects: ['EffectDroplets', 'EffectGradient', 'EffectSlices', 'EffectWebs'],
      effectsToView: [],
      effect: null,
      colors: ['#fc4a1a', '#f7b733', '#228ae6'],
      colorsToView: [],
      color: null,
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
    rotateLogo () {
      if (!this.effectsToView.length) {
        this.effectsToView = this.effects.filter((effect) => {
          return effect !== this.effect
        })
      }
      let randomEffectIndex = Math.floor(Math.random() * this.effectsToView.length)
      this.effect = this.effectsToView[randomEffectIndex]
      this.effectsToView.splice(randomEffectIndex, 1)

      if (!this.colorsToView.length) {
        this.colorsToView = this.colors.filter((color) => {
          return color !== this.color
        })
      }
      let randomColorIndex = Math.floor(Math.random() * this.colorsToView.length)
      this.color = this.colorsToView[randomColorIndex]
      this.colorsToView.splice(randomColorIndex, 1)
    },
    updateScrollProgressTarget () {
      this.scrollProgressTarget = Math.max(1 - (window.pageYOffset / (window.innerHeight * 1)), 0)
    },
    updateScrollProgress () {
      this.scrollProgress += (this.scrollProgressTarget - this.scrollProgress) * this.scrollEase
      this.scrollAnimation = window.requestAnimationFrame(this.updateScrollProgress)
    }
  },
  created () {
    if (process.isClient) {
      this.rotateLogo()
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
.logo-wrap {
  position: fixed;
  left: 50vw;
  top: 50vh;
  width: 30vh;
  height: 30vh;
  transform: translate(-50%, -50%);
}

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
