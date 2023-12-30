<template>
  <div class="gallery">
    <figure class="gallery-item" v-for="(img, index) in images" :key="index">
      <img :src="img" />
    </figure>
  </div>
</template>

<style scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.6rem;
  padding: 1.6rem;
}
.gallery-item img {
  display: block;
  width: 100%;
  height: 100%;
  transition: all 0.4s;
}

.gallery-item img:hover {
  transform: scale(1.1);
}
.gallery-item {
  overflow: hidden;
}

@media (max-width: 75em) {
  .gallery {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 68em) {
  .gallery {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (max-width: 45em) {
  .gallery {
    gap: 0.8rem;
    padding: 0rem;
  }
  .gallery {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
<script>
export default {
  data() {
    return {
      images: [
        "https://as2.ftcdn.net/v2/jpg/01/70/39/05/1000_F_170390588_KAmillOqlXoct5CsmZBHQM1kFVWEX0Qi.jpg",
        "https://as1.ftcdn.net/v2/jpg/01/20/50/56/1000_F_120505666_bxGq0xtdAJPzqzzGrO3m6OQaLLouia4A.jpg",
        "https://as1.ftcdn.net/v2/jpg/06/46/60/52/1000_F_646605234_UuwRintC73LKK0dj85BuPL9HNCJNPhNt.jpg",
        "https://as2.ftcdn.net/v2/jpg/01/73/41/63/1000_F_173416361_2YCaYyXrVk6nhNoIkg21515HUWseyqyr.jpg",
        "https://as2.ftcdn.net/v2/jpg/06/44/76/83/1000_F_644768392_irhQEcibbHBzeHEc1qVxoGbDrxlo6ghE.jpg",
        "https://as2.ftcdn.net/v2/jpg/02/18/00/59/1000_F_218005988_SEvt7t6uCXEUz2jxN6ICLGTIj4CNukhD.jpg",
        "https://as2.ftcdn.net/v2/jpg/01/66/76/21/1000_F_166762155_FezyRwmysVqcvOI7JEC9PDrVl9D1FXJK.jpg",
        "https://as2.ftcdn.net/v2/jpg/06/39/15/73/1000_F_639157384_PNfdAnOAIKbst8296ZCrHqlL2TjbIfvQ.jpg",
        "https://as1.ftcdn.net/v2/jpg/04/84/94/58/1000_F_484945880_yqcmUlx4PR22FnuLWEknDRji2RLiM8Nh.jpg",
        "https://as2.ftcdn.net/v2/jpg/03/16/57/97/1000_F_316579713_7VEHXeATAtzmpZvWyItCdbMdlVxe2XTz.jpg",
        "https://as1.ftcdn.net/v2/jpg/02/69/69/92/1000_F_269699259_4eOOxZbpsmd91XUodn5VxFtkQmdgNtbH.jpg",
        "https://as2.ftcdn.net/v2/jpg/01/24/41/15/1000_F_124411559_Da0vYElvE25HEZIss9H0anSlIffLEqXI.jpg",
      ],
      length: 12,
    };
  },
};
</script>
