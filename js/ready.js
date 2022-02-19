// eslint-disable-next-line no-lone-blocks
{
  // 윈도우 스크롤 이벤트 리스너
  window.addEventListener('scroll', () => {
    if (this.scrollY !== 0) {
      document.querySelector('.bl_header').classList.add('js_active');
    } else {
      document.querySelector('.bl_header').classList.remove('js_active');
    }
  });

  document
    .querySelector('.el_projects_toggle')
    .addEventListener('click', () => {
      document.querySelector('.bl_projects').classList.toggle('grid');
    });
}
