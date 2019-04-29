export default {
  inserted (el, binding) {
    let observerOptions = {
      threshold: 0.5
    }

    el.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.classList.add('animate-visible')
          el.intersectionObserver.disconnect()
        }
      })
    }, observerOptions)

    el.intersectionObserver.observe(el)
  },
  unbind (el) {
    el.intersectionObserver.disconnect()
  }
}
