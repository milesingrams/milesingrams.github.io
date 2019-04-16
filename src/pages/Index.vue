<template>
  <Layout>
    <div class="logo-wrap">
      <logo :effect="effect" color="#000000" :progress="scrollProgress"></logo>
    </div>

    <color-section :color="colorAtIndex(0)">
      <h2 class="about-text">
        Hi, I'm Miles
      </h2>
    </color-section>
    <color-section :color="colorAtIndex(1)">
      <h2 class="about-text">
        I Like
      </h2>
      <div>
        <span class="tag">Bits</span> <span class="tag">Bots</span> <span class="tag">Bio</span> <span class="tag">Battlestar Galactica</span>
      </div>
    </color-section>
    <color-section :color="colorAtIndex(2)">
      <h2 class="about-text">
        NYC born and raised, I started dabbling with programming at a young age by making silly Flash games and clunky Lego Mindstorms.
      </h2>
    </color-section>
    <color-section :color="colorAtIndex(3)">
      <h2 class="about-text">
        Many years later I'm still doing the same thing, just with MUCH cooler equiptment.
      </h2>
    </color-section>
    <color-section v-for="(experience, index) in $page.experiences.edges" :color="colorAtIndex(4 + index)" :key="index">
  </color-section>
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
import ColorSection from '~/components/ColorSection'

export default {
  components: {
    Logo,
    ColorSection
  },
  data () {
    return {
      effects: ['EffectDroplets', 'EffectGradient', 'EffectSlices', 'EffectWebs'],
      effectsToView: [],
      effect: null,
      colors: ['#FFFFFF', '#DEEEF9', '#DEF9EB'],
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
    },
    updateScrollProgressTarget () {
      this.scrollProgressTarget = Math.max(1 - window.pageYOffset / window.innerHeight, 0)
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

.about-text {
  font-weight: 400;
  font-family: 'Averia Serif Libre';
  text-align: center;
}

.tag {
  color: white;
  padding: $spacing-xxxs $spacing-xxs;
  margin-left: 0.5rem;
  font-size: 1rem;
  background-color: black;
}

.experience-section {
}
</style>
