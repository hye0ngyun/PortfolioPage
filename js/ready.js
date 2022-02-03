{
  // 윈도우 스크롤 이벤트 리스너
  window.addEventListener('scroll', () => {
    console.log(this.scrollY);
    if (this.scrollY !== 0) {
      document.querySelector('.bl_header').classList.add('js_active')
    } else {
      document.querySelector('.bl_header').classList.remove('js_active')
    }
  })
} 