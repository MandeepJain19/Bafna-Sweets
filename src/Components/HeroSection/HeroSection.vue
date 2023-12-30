<template>
  <section ref="hero" class="hero">
    <vue-carousel class="carousel" v-slot="{ currentSlide }">
      <vue-slide v-for="(slide, index) in images" :key="index">
        <div v-show="index + 1 === currentSlide" class="slideInfo">
          <img class="images" :src="`${slide}`" alt="Food Images" />
        </div>
      </vue-slide>
    </vue-carousel>
  </section>
</template>

<script>
import VueCarousel from "./VueCarousel.vue";
import VueSlide from "./VueSlide.vue";
export default {
  components: { VueCarousel, VueSlide },
  data() {
    return {
      // images: ["first", "second", "third"],
      images: [
        "https://as2.ftcdn.net/v2/jpg/01/74/81/21/1000_F_174812118_uhf1HsoWk0SaMtb6dEnHtHPW36HLAetv.jpg",
        "https://as1.ftcdn.net/v2/jpg/04/66/41/98/1000_F_466419884_l0WxlXu6z1ImHiFvWXhpc75KgPNEHtVS.jpg",
        "https://as1.ftcdn.net/v2/jpg/04/53/54/86/1000_F_453548647_Q3AmVyhFGOzgFiYGyQ0Q7ytOF4OPKkPf.jpg",
      ],
      observer: null,
      hero: null,
      header: null,
      navHeight: null,
    };
  },
  methods: {
    stickyNav(entries) {
      // console.log(entries);
      const entry = entries[0];
      if (!entry.isIntersecting) this.header.classList.add("fixed");
      else this.header.classList.remove("fixed");
    },
  },
  created() {
    this.observer = new IntersectionObserver(this.stickyNav, {
      root: null,
      threshold: 0,
      rootMargin: `-${this.navHeight + 104}px`,
    });
  },
  mounted() {
    this.header = document.querySelector(".nav");
    this.navHeight = this.header.getBoundingClientRect().height;
    this.hero = this.$refs.hero;
    this.observer.observe(this.hero);
  },
  beforeUnmount() {
    this.observer.disconnect();
  },
};
</script>

<style scoped>
.hero {
  margin-top: 4rem;
}
.carousel {
  position: relative;
  margin: 0 auto;
  max-width: 130rem;
  height: 60rem;

  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}
.slideInfo {
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* border-radius: 3%; */
}

/* @media (max-width: 56em) {
  .hero-text {
    font-size: 3.6rem;
    line-height: 1.2;
    letter-spacing: 0.1rem;
    width: 60rem;
  }
  p {
    margin-bottom: 1rem;
  }
}
@media (max-width: 45em) {
  .hero-text {
    top: 9.6rem;
    width: 45rem;
  }
  p {
    margin-bottom: 1rem;
  }
}
@media (max-width: 34rem) {
  .hero-text {
    font-size: 2.4rem;
    line-height: 1.2;
    letter-spacing: 0.1rem;
    width: 29rem;
  }
} */
</style>
