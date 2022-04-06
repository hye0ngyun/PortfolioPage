{
  const blCareerHeader = document.querySelectorAll(
    '.bl_career_accordion_header',
  );
  blCareerHeader.forEach(i => {
    i.addEventListener('click', e => {
      e.target.parentElement.classList.toggle('js_active');
      if (e.target.parentElement.classList.contains('js_active')) {
        e.target.children[1].src = './img/expand_less_black_24dp.svg';
      } else {
        e.target.children[1].src = './img/expand_more_black_24dp.svg';
      }
    });
  });
}
