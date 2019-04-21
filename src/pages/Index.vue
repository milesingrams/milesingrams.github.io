<template>
  <layout>
    <div class="logo-wrap">
      <logo color="#000000"></logo>
    </div>

    <div class="sections">
      <section class="page-section">
        <div class="section-content no-pointer-events">
          <h2 class="about-text">
            Hi, I'm Miles
          </h2>
        </div>
      </section>

      <section class="page-section">
        <div class="section-content no-pointer-events">
          <h2 class="about-text margin-b-3">
            I Like
          </h2>
          <div class="tag-list like-tags">
            <div class="tag margin-b-2">
              <icon-bits class="icon"></icon-bits>
              Bits
            </div>
            <div class="tag margin-b-2">
              <icon-bots class="icon"></icon-bots>
              Bots
            </div>
            <div class="tag margin-b-2">
              <icon-bio class="icon"></icon-bio>
              Bio
            </div>
            <div class="tag margin-b-2">
              <icon-battlestar class="icon"></icon-battlestar>
              Battlestar Galactica
            </div>
          </div>
        </div>
      </section>

      <section class="page-section">
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

      <section class="page-section">
        <div class="section-content">
          <h2 class="about-text margin-b-3">
            My beliefs are
          </h2>
          <div class="beliefs-list">
            <div class="belief">
              <div class="belief-content">
                <h3 class="belief-header">
                  Read Up
                </h3>
                <p class="belief-text">
                  Sure, jumping right in works sometimes, but a little reading goes a long way. Before starting something new I want to know the basics and best practices first. I'll be thankful for it in the long run.
                </p>
              </div>
            </div>
            <div class="belief">
              <div class="belief-content">
                <h3 class="belief-header">
                  Hack if you must
                </h3>
                <p class="belief-text">
                  Most things can be done the <i>right</i> way. But sometimes, to solve an atypical problem within a limited framework I have to shush the perfectionist and channel Dr. Frankenstein.
                </p>
              </div>
            </div>
            <div class="belief">
              <div class="belief-content">
                <h3 class="belief-header">
                  Selectively Optimize
                </h3>
                <p class="belief-text">
                  5% faster isn't worth it if it takes me 500% longer. Particularly processor-hungry code needs to be addressed, but don't spend an hour sharpening your butter knife.
                </p>
              </div>
            </div>
            <div class="belief">
              <div class="belief-content">
                <h3 class="belief-header">
                  Make it Fun
                </h3>
                <p class="belief-text">
                  Work is only as enjoyable as you make it. Finding ways to get excited about a project can inspire both me and my team to skip the procrastination and face the challenges head-on.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="page-section">
        <div class="section-content">
          <h2 class="about-text">
            Here's what I've worked on so far
          </h2>
        </div>
      </section>

      <section class="experiences-wrap">
        <div class="experience-wrap" v-for="(experience, index) in $page.experiences.edges" :key="index">

          <div class="page-section experience-header">
            <div class="section-content">
              <h2 class="experience-title">
                {{experience.node.title}}
              </h2>
              <div class="divider-line"></div>
              <h2 class="experience-position">
                {{experience.node.position}}
              </h2>
            </div>

            <div class="tag-list experience-tags">
              <div class="tag" v-for="tag in experience.node.tags">
                <component :is="`Icon${tag}`" class="icon"></component>
                {{tag}}
              </div>
            </div>
          </div>
          <div class="page-section">
            <div class="section-content">
              <p class="experience-description margin-b-6">
                {{experience.node.description}}
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  </layout>
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
import IconBits from '~/assets/icons/IconBits.svg'
import IconBots from '~/assets/icons/IconBots.svg'
import IconBio from '~/assets/icons/IconBio.svg'
import IconBattlestar from '~/assets/icons/IconBattlestar.svg'

export default {
  components: {
    Logo,
    IconBits,
    IconBots,
    IconBio,
    IconBattlestar
  },
  metaInfo: {
    title: 'Miles Ingram'
  }
}
</script>

<style lang="scss" scoped>
$section-max-width: 900px;

.logo-wrap {
  position: fixed;
  left: 50vw;
  top: 50vh;
  width: 30vh;
  height: 30vh;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.page-section {
  position: relative;
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .section-content {
    max-width: $section-max-width;
    padding: 4rem 1.5rem;
    z-index: 10;
  }

  $section-colors: #ffffff, #f2f2f2;

  @for $i from 1 through length($section-colors) {
    &:nth-child(#{length($section-colors)}n + #{$i}) {
      background-color: #{nth($section-colors, $i)};
    }
  }
}

.about-text {
  font-family: 'Averia Serif Libre';
  font-weight: 500;
  text-align: center;
}

.like-tags {
  .tag {
    border-radius: 4px;
  }
}

.beliefs-list {
  display: flex;
  flex-wrap: wrap;

  .belief {
    flex-basis: 100%;
    flex-grow: 1;
    padding: 0.5rem;

    .belief-content {
      padding: 1rem;
      border: 1px solid black;
      height: 100%;
    }

    .belief-header {
      line-height: 1.25;
      font-weight: 600;
      margin-bottom: 0.25rem;
    }

    .belief-text {
      font-size: 0.9rem;
    }

    @include media('>phone') {
      flex-basis: 50%;
    }
  }
}

.experience-wrap {
  .experience-header {
    color: white;
    background-color: var(--section-color);
  }

  .experience-title, .experience-position {
    font-family: 'Averia Serif Libre';
    text-transform: uppercase;
    font-weight: 300;
    line-height: 1.2;
    text-align: center;
  }

  .experience-title {
    font-size: 1.7rem;
    letter-spacing: 0.3rem;
  }

  .experience-position {
    font-size: 1.2rem;
    letter-spacing: 0.2rem;
  }

  .experience-tags {
    position: absolute;
    top: 100%;
    z-index: 1;

    .tag {
      color: white;
      background-color: var(--section-color);
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }

  .experience-description {
    max-width: 600px;
    font-size: 1.2rem;
    font-style: italic;
    font-weight: 500;
    text-align: center;
    letter-spacing: 0.025rem;
  }

  @for $i from 1 through length($experience-colors) {
    &:nth-child(#{length($experience-colors)}n + #{$i}) {
      --section-color: #{nth($experience-colors, $i)};
    }
  }
}
</style>
