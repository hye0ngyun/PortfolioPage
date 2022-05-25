// eslint-disable-next-line no-lone-blocks
{
  const fadeInElems = document.querySelectorAll('.bl_section');

  const fadeInOffsets = [];
  fadeInElems.forEach(i => {
    fadeInOffsets.push(i.offsetTop);
  });

  // 윈도우 크기
  const { innerHeight } = window; // 브라우저 안쪽 화면 높이
  window.addEventListener('scroll', e => {
    const currScrollTop = window.scrollY;
    const bottomScrollOffset = currScrollTop + innerHeight;
    for (let i = 0; i < fadeInOffsets.length; i += 1) {
      if (bottomScrollOffset > fadeInOffsets[i]) {
        fadeInElems[i].classList.add('js_fadein_active');
      }
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    const currScrollTop = window.scrollY; // 현재 스크롤 탑 위치
    const bottomScrollOffset = currScrollTop + innerHeight; // 현재 스크롤 바텀 위치
    for (let i = 0; i < fadeInOffsets.length; i += 1) {
      if (bottomScrollOffset > fadeInOffsets[i]) {
        fadeInElems[i].classList.add('js_fadein_active');
      }
    }
  });
}
