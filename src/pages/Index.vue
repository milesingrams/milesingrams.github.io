<template>
  <Layout>
    <section class="my-info">
      <div class="logo-wrap">
        <logo-droplets></logo-droplets>
      </div>
      <h1 class="my-name">Miles Ingram</h1>
      <p class="my-pitch">Bits, Bio, Bots, Battlestar Galactica</p>
    </section>

    {{$page.experiences}}
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
import LogoDroplets from '~/components/logos/droplets/LogoDroplets'

export default {
  components: {
    LogoDroplets
  },
  metaInfo: {
    title: 'Miles Ingram'
  }
}
</script>

<style lang="scss" scoped>
.my-info {
  width: 100%;
  display: flex;
  align-items: center;
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
  font-weight: 600;
  margin-bottom: 6px;
}

.my-pitch {
  text-align: center;
  font-weight: 300;
}
</style>
