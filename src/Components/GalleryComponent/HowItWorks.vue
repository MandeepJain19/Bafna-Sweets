<template>
  <div class="HW">
    <div class="details">
      <HWText class="text"></HWText>
      <HWGallery class="gallery">gallery</HWGallery>
    </div>
  </div>
</template>
<script>
import HWText from "./HWText.vue";
import HWGallery from "./HWGallery.vue";

export default {
  components: {
    HWText,
    HWGallery,
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>
<style scoped>
.HW {
  margin-top: 4.8rem;
  background-color: #e65a5a;
  max-width: 100%;
  padding-left: 3.2rem;
}
.details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 9.6rem;
}
@media (max-width: 90em) {
  .details {
    gap: 1rem;
  }
}
@media (max-width: 68em) {
  .details {
    grid-template-columns: 1fr;
    gap: 3.2rem;
  }
  .HW {
    padding: 3.2rem 3.2rem;
  }
  .gallery {
    grid-row: 1;
  }
  .textContainer {
    grid-row: 2;
  }
}
@media (max-width: 45em) {
  .HW {
    padding: 1.2rem 1.2rem;
  }
}
@media (max-width: 34em) {
  .HW {
    padding: 0.6rem;
  }
}
</style>
