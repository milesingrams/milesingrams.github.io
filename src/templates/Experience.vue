<template>
  <Layout>
    {{$page.experience}}
  </Layout>
</template>

<page-query>
query Experience ($path: String!) {
  experience: experience (path: $path) {
    title
    tags
    description
    content
  }
}
</page-query>

<script>
export default {
  metaInfo () {
    return {
      title: this.$page.experience.title,
      meta: [
        {
          name: 'description',
          content: this.$page.experience.description
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
