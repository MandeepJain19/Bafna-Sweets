<template>
  <div class="slide">
    <Transition name="slide">
      <slot></slot>
    </Transition>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.7s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

.slide-enter-to,
.slde-leave-from {
  opacity: 1;
}
</style>
