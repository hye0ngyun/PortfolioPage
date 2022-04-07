// eslint-disable-next-line no-lone-blocks
{
  // 윈도우 스크롤 이벤트 리스너
  const blSections = document.querySelectorAll('.bl_section');
  const blNavs = document.querySelectorAll('.bl_nav > ul > li');
  const blSectionOffsetTop = [];
  setTimeout(() => {
    blSections.forEach(i => {
      blSectionOffsetTop.push(i.offsetTop);
    });
  }, 100);
  window.addEventListener('scroll', () => {
    const currScroll = this.scrollY + 30;
    if (currScroll !== 0) {
      document.querySelector('.bl_header').classList.add('js_active');
    } else {
      document.querySelector('.bl_header').classList.remove('js_active');
    }
    if (
      blSectionOffsetTop[0] <= currScroll &&
      currScroll <= blSectionOffsetTop[1]
    ) {
      blNavs.forEach(i => i.classList.remove('js_currNav'));
      blNavs[0].classList.add('js_currNav');
    } else if (
      blSectionOffsetTop[1] <= currScroll &&
      currScroll <= blSectionOffsetTop[2]
    ) {
      blNavs.forEach(i => i.classList.remove('js_currNav'));
      blNavs[1].classList.add('js_currNav');
    } else if (
      blSectionOffsetTop[2] <= currScroll &&
      currScroll <= blSectionOffsetTop[3]
    ) {
      blNavs.forEach(i => i.classList.remove('js_currNav'));
      blNavs[2].classList.add('js_currNav');
    } else if (
      blSectionOffsetTop[3] <= currScroll &&
      currScroll <= blSectionOffsetTop[4]
    ) {
      blNavs.forEach(i => i.classList.remove('js_currNav'));
      blNavs[3].classList.add('js_currNav');
    } else if (blSectionOffsetTop[4] <= currScroll) {
      blNavs.forEach(i => i.classList.remove('js_currNav'));
      blNavs[4].classList.add('js_currNav');
    } else {
      blNavs.forEach(i => i.classList.remove('js_currNav'));
    }
  });
}
