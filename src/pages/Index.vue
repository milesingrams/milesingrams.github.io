<template>
  <Layout>
    <section class="my-info">
      <div class="logo-wrap">
        <logo></logo>
      </div>
      <h1 class="my-name">Miles Ingram</h1>
      <p class="my-pitch">Bits, Bio, Bots, Battlestar Galactica</p>
    </section>
    <div class="timeline">
      <div class="timeline-start"></div>
    </div>
  </Layout>
</template>

<page-query>
{
  experiences: allExperience (sortBy: "date", order: DESC) {
    edges {
      node {
        title
        date
        dateText
        tags
        description
      }
    }
  }
}
</page-query>

<script>
import Logo from '~/components/logos/Logo'

export default {
  components: {
    Logo
  },
  metaInfo: {
    title: 'Miles Ingram'
  }
}
</script>

<style lang="scss" scoped>
.my-info {
  height: 65vh;
  width: 100%;
  max-height: 800px;
  padding-bottom: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
}

.logo-wrap {
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
  position: relative;
}

.my-name {
  text-align: center;
  font-weight: 500;
  margin-bottom: 6px;
  opacity: 0;
  animation: fadeIn .75s var(--ease-in-out-quad) forwards 0.5s;
}

.my-pitch {
  text-align: center;
  font-weight: 300;
  opacity: 0;
  animation: fadeIn .75s var(--ease-in-out-quad) forwards 0.75s;
}

.timeline {
  position: relative;
  width: 100%;
  min-height: 3000px;

  &::before {
    content: '';
    position: absolute;
    width: 4px;
    background-color: white;
    top: 0;
    height: 0%;
    left: 50%;
    margin-left: -2px;
    animation: timelineGrow 1s var(--ease-in-quad) forwards 4s;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    margin-top: -12px;
    margin-left: -12px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #151830;
    border: 4px solid white;
    transform: scale(0);
    animation: timelineDotAppear .5s var(--ease-out-back) forwards 3s;
  }

  @include media("<tablet") {
    &::before, &::after {
      left: 30px;
    }
  }
}

@keyframes timelineDotAppear {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

@keyframes timelineGrow {
  from {
    height: 0;
  }
  to {
    height: 100%;
  }
}
</style>
