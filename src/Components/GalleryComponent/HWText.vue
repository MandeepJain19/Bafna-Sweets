<template>
  <div class="text-container">
    <h1>Food Gallery</h1>
    <h2>Once you try it, you can't go back</h2>
    <p class="text">
      Indulge your senses in a world of sweetness that will redefine your
      cravings – once you try our delectable treats, there's no turning back.
      Our carefully crafted confections are a symphony of flavors, textures, and
      pure bliss. Each bite is a journey into a realm of irresistible sweetness
      that captivates your taste buds and leaves an indelible mark on your
      dessert expectations. Prepare to be enchanted by our extraordinary
      creations, for once you savor the magic, going back to ordinary sweets
      will be a thing of the past.
    </p>
    <br />
    <p>
      Welcome to a sugary haven where taste knows no bounds. Our sweets are not
      just desserts; they're an experience that transcends the ordinary. Once
      you delve into the world of our culinary delights, you'll find yourself
      hooked on the unparalleled joy that only our treats can provide. Unleash
      your sweet tooth and embark on a journey where every bite is a promise –
      once you try it, you can't go back to the ordinary sweetness you knew
      before.
    </p>
  </div>
</template>

<style scoped>
.text-container {
  padding: 14.4rem 0rem;
}
h1 {
  font-size: 1.6rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  /* color: #0f1841; */
  color: #ffff;
  display: block;
  margin-bottom: 1.6rem;
}
h2 {
  font-size: 4.4rem;
  line-height: 1.2;
  font-weight: 600;
  /* color: #0f1841; */
  color: #ffff;
  margin-bottom: 4.8rem;
}
.text {
  font-size: 2.4rem;
  line-height: 1.6;
  color: #ffff;
}
@media (max-width: 90em) {
  .text {
    font-size: 2rem;
    line-height: 1.4;
  }
}
@media (max-width: 68em) {
  .text-container {
    padding: 0;
  }
}
</style>
