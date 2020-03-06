export default {
  data () {
    return {
      intersectionObserver: null,
    }
  },
  mounted () {
    let observerOptions = {
      threshold: 0
    }

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (this.run) {
            this.run()
          }
          this.intersectionObserver.disconnect()
        }
      })
    }, observerOptions)

    this.intersectionObserver.observe(this.$el)
  },
  beforeDestroy () {
    this.intersectionObserver.disconnect()
  }
}
