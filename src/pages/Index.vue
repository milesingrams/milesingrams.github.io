<template>
  <Layout>
    <div class="logo-wrap">
      <logo :effect="effect" color="#000000" :progress="scrollProgress"></logo>
    </div>

    <div class="sections">
      <section class="color-section">
        <div class="section-content">
          <h2 class="about-text">
            Hi, I'm Miles
          </h2>
        </div>
      </section>

      <section class="color-section">
        <div class="section-content">
          <h2 class="about-text">
            I Like
          </h2>
          <div class="tag-list">
            <div class="tag">Bits</div>
            <div class="tag">Bots</div>
            <div class="tag">Bio</div>
            <div class="tag">Battlestar Galactica</div>
          </div>
        </div>
      </section>

      <section class="color-section">
        <div class="section-content">
          <h2 class="about-text">
            NYC born and raised, I started dabbling with programming at a young age by making silly Flash games and clunky Lego Mindstorms.
          </h2>
          <div class="divider-line"></div>
          <h2 class="about-text">
            Many years later I'm still doing the same thing, just with MUCH cooler equipment.
          </h2>
        </div>
      </section>

      <section class="color-section">
        <div class="section-content">
          <h2 class="about-text">
            My beliefs are
          </h2>
          <div class="beliefs-list">
            <div class="belief">
              <h3 class="belief-header">
                Belief Header
              </h3>
              <p class="belief-text">
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
            </div>
            <div class="belief">
              <h3 class="belief-header">
                Belief Header
              </h3>
              <p class="belief-text">
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
            </div>
            <div class="belief">
              <h3 class="belief-header">
                Belief Header
              </h3>
              <p class="belief-text">
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
            </div>
            <div class="belief">
              <h3 class="belief-header">
                Belief Header
              </h3>
              <p class="belief-text">
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="color-section">
        <div class="section-content">
          <h2 class="about-text">
            Here's what I've worked on so far
          </h2>
        </div>
      </section>

      <section class="color-section" v-for="(experience, index) in $page.experiences.edges" :key="index">
      </section>
    </div>
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

export default {
  components: {
    Logo
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
      this.scrollProgressTarget = Math.max(1 - window.pageYOffset / window.innerHeight / 1, 0)
    },
    updateScrollProgress () {
      this.scrollProgress += (this.scrollProgressTarget - this.scrollProgress) * this.scrollEase
      this.scrollAnimation = window.requestAnimationFrame(this.updateScrollProgress)
    }
  },
  created () {
    if (process.isClient) {
      this.rotateLogo()
      this.effect = 'EffectWebs'
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

.color-section {
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .section-content {
    max-width: 900px;
    padding: 80px $spacing-l;
    z-index: 1;
  }

  &:nth-child(3n+1) {
    background-color: #FFFFFF;
  }

  &:nth-child(3n+2) {
    background-color: #DEEEF9;
  }

  &:nth-child(3n+3) {
    background-color: #DEF9EB;
  }
}

.about-text {
  font-weight: 400;
  font-family: 'Averia Serif Libre';
  text-align: center;
  margin: 0;
}

.divider-line {
  width: 100%;
  padding: $spacing-m 0;

  &::before {
    position: absolute;
    content: '';
    left: 50%;
    width: 60px;
    transform: translateX(-50%);
    border-bottom: 1px solid black;
  }
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: $spacing-xxs;

  .tag {
    color: white;
    padding: $spacing-xxxs $spacing-xxs;
    margin: 0.25rem;
    background-color: black;
  }
}

.beliefs-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: $spacing-xs;

  .belief {
    width: 280px;
    margin: $spacing-xxs;
    padding: $spacing-s;
    border: 1px solid black;
    flex-grow: 1;

    .belief-header {
      line-height: 1.25;
      font-weight: 600;
      margin-bottom: $spacing-xxxs;
    }

    .belief-text {
      font-size: 0.9rem;
      margin: 0;
    }
  }
}

.experience-section {
}
</style>
