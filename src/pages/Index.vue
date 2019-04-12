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
  height: 80vh;
  width: 100%;
  min-height: 400px;
  max-height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
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
}

.my-pitch {
  text-align: center;
  font-weight: 300;
}
</style>
