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
      <section class="timeline-section">
        <div class="timeline-section-content">
          is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </div>
      </section>
    </div>

    <div class="page-footer">
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

  .logo-wrap {
    width: 200px;
    height: 200px;
    margin-bottom: 40px;
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
}

.timeline {
  position: relative;
  width: 100%;
  min-height: 3000px;

  &::before {
    content: '';
    position: absolute;
    width: 3px;
    background-color: white;
    top: 0;
    height: 0%;
    left: 8%;
    margin-left: -1.5px;
    animation: timelineGrow 1s var(--ease-in-quad) forwards 3s;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 8%;
    margin-top: -12px;
    margin-left: -12px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: var(--page-bg-color);
    border: 3px solid white;
    transform: scale(0);
    animation: timelineDotAppear .5s var(--ease-out-back) forwards 2s;
  }

  .timeline-section {
    padding-left: 16%;
    padding-right: 20px;
    width: 100%;

    &::before {
      content: '';
    }

    @include media(">desktop") {
      padding-left: 40px;
      padding-right: 60px;
      width: 50%;
    }
  }

  .timeline-section-content {
  }

  @include media(">desktop") {
    .timeline-section-content {
      font-size: 20px;
    }

    &::before, &::after {
      left: 50%;
    }
  }
}

.bottom-fade {

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
