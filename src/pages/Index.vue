<template>
  <layout>
    <div class="logo-wrap">
      <logo color="#000000"></logo>
    </div>

    <section class="about-wrap">
      <div class="page-section">
        <div class="section-content section-content-center no-pointer-events">
          <h2 class="statement-text">
            Hi, I'm Miles
          </h2>
        </div>
      </div>

      <div class="page-section">
        <div class="section-content section-content-center no-pointer-events">
          <h2 class="statement-text margin-b-5">
            I Like
          </h2>
          <ul class="tag-list like-tags">
            <li class="tag" v-for="tag in tags">
              <component :is="iconForTag(tag)" class="icon margin-r-2"></component>
              {{tag}}
            </li>
          </ul>
        </div>
      </div>

      <div class="page-section">
        <div class="section-content section-content-center">
          <h2 class="statement-text">
            NYC born and raised, I started dabbling with programming at a young age by making silly Flash games and clunky Lego Mindstorms.
          </h2>
          <div class="divider-line"></div>
          <h2 class="statement-text">
            Many years later I'm still doing the same thing, just with MUCH cooler equipment.
          </h2>
        </div>
      </div>

      <div class="page-section">
        <div class="section-content section-content-center">
          <h2 class="statement-text margin-b-5">
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
      </div>

      <div class="page-section" v-animate-visible>
        <div class="section-content section-content-center">
          <h2 class="statement-text">
            Here's what I've worked on so far
          </h2>
          <div class="work-start-arrow"></div>
        </div>
      </div>
    </section>

    <section class="experiences-wrap">
      <experience :experience="experience" v-for="(experience, index) in $page.experiences.edges" :key="index"></experience>
    </section>
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
        achievements
        skills {
          type
          items
        }
        images {
          preview: image (width: 280)
          image (width: 1920)
          caption
        }
        publications {
          title
          journal
          link
        }
        sitelink
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
import IconBattlestarGalactica from '~/assets/icons/IconBattlestarGalactica.svg'
import Experience from '~/components/Experience'

export default {
  components: {
    Logo,
    IconBits,
    IconBots,
    IconBio,
    IconBattlestarGalactica,
    Experience
  },
  data () {
    return {
      tags: ['Bits', 'Bots', 'Bio', 'Battlestar Galactica']
    }
  },
  methods: {
    iconForTag (tagName) {
      return `Icon${tagName.replace(' ', '')}`
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
  z-index: 1;
  pointer-events: none;
}

.about-wrap {
  .page-section {

    .section-content {
      z-index: 10;
    }

    $section-colors: #ffffff, #f3f3f3;

    @for $i from 1 through length($section-colors) {
      &:nth-child(#{length($section-colors)}n + #{$i}) {
        background-color: #{nth($section-colors, $i)};
      }
    }
  }
}

.statement-text {
  font-family: 'Averia Serif Libre';
  font-weight: 500;
  text-align: center;
}

.beliefs-list {
  display: flex;
  flex-wrap: wrap;
  margin: -0.5rem;

  .belief {
    flex-basis: 100%;
    flex-grow: 1;
    padding: 0.5rem;

    .belief-content {
      height: 100%;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .belief-header {
      line-height: 1.2;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid black;
    }

    .belief-text {
      padding-top: 0.5rem;
      font-size: 0.9rem;
    }

    @include media('>=phone') {
      flex-basis: 50%;
    }
  }
}

.work-start-arrow {
  $line-spacing: 13px;
  margin: 0 auto;
  margin-top: -0.25rem;
  height: 75px;
  background: repeating-linear-gradient(180deg, transparent, transparent $line-spacing, black $line-spacing, black ($line-spacing + 1px));
  clip-path: polygon(0 -100%, 50% 0, 100% -100%);
  transition: clip-path 1s var(--ease-out-quad);

  .animate-visible & {
    clip-path: polygon(0 0, 50% 100%, 100% 0);
  }
}

.experience {
  @for $i from 1 through length($site-colors) {
    $sectionColor: nth($site-colors, $i);

    &:nth-child(#{length($site-colors)}n + #{$i}) {
      --section-color: #{$sectionColor};
      --section-color-rgb: #{hexToRGB($sectionColor)};
    }
  }
}
</style>
