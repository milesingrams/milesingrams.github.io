<template>
  <Layout>
    <div class="logo-wrap">
      <logo color="#000000"></logo>
    </div>

    <div class="sections">
      <section class="color-section">
        <div class="section-content no-pointer-events">
          <h2 class="about-text">
            Hi, I'm Miles
          </h2>
        </div>
      </section>

      <section class="color-section">
        <div class="section-content no-pointer-events">
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
                Read Up
              </h3>
              <p class="belief-text">
                Sure, jumping right in works sometimes, but a little reading goes a long way. Before starting something new I want to know the basics and best practices first. I'll be thankful for it in the long run.
              </p>
            </div>
            <div class="belief">
              <h3 class="belief-header">
                Hack if you must
              </h3>
              <p class="belief-text">
                Most things can be done the <i>right</i> way. But sometimes, to solve an atypical problem within a limited framework you gotta shush the perfectionist and channel Dr. Frankenstein.
              </p>
            </div>
            <div class="belief">
              <h3 class="belief-header">
                Selectively Optimize
              </h3>
              <p class="belief-text">
                5% faster isn't worth it if it takes you 500% longer. Particularly processor-hungry code needs to be addressed, but don't spend an hour sharpening your butter knife.
              </p>
            </div>
            <div class="belief">
              <h3 class="belief-header">
                Make it Fun
              </h3>
              <p class="belief-text">
                Work is only as enjoyable as you make it. Finding ways to get excited about a project can inspire both you and your team to skip the procrastination and face the challenge head-on.
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
      colors: ['#FFFFFF', '#DEEEF9', '#DEF9EB'],
    }
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
    padding: $spacing-xxl $spacing-m;
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
    width: $spacing-xxl;
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
</style>
