<template>
  <footer class="slide-footer">
    <span>Logic Design Seminar</span>
    <Link to="toc" class="footer-contents">Contents</Link>
    <span class="footer-position">
      <span v-if="$nav.clicksTotal > 0" class="step-progress" :data-step="$nav.clicks" :data-total="$nav.clicksTotal">STEP {{ $nav.clicks }} / {{ $nav.clicksTotal }}</span>
      <span><SlideCurrentNo /> / <SlidesTotal /></span>
    </span>
  </footer>
</template>
