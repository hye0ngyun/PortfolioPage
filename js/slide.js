{
  const slide_items = document.querySelector('.bl_projects_slide_items');
  console.log(slide_items.childElementCount);
  console.log(slide_items.children, slide_items.children[0]);
  const MAX_SLIDE = 3;
  for (let i = 0; i < MAX_SLIDE; i++) {
    console.log(slide_items.children[i].classList.add('show'));
  }
  const leftArrow = document.querySelector('.el_leftArrow');
  const rightArrow = document.querySelector('.el_rightArrow');

  const slide_item = document.querySelectorAll('.bl_projects_slide_item');

  let leftOffset = 0;
  const MAX_OFFSET = (slide_items.childElementCount - MAX_SLIDE) * 300;
  // console.log(totalWidth); // 1500

  leftArrow.addEventListener('click', () => {
    console.log('left arrow clicked');
    leftOffset += 300;
    console.log(leftOffset);
    slide_item.forEach((item) => {
      if (leftOffset <= 0) {
        item.style.left = leftOffset + 'px';
      } else {
        leftOffset -= 300;
      }
    })
  })
  rightArrow.addEventListener('click', () => {
    console.log('right arrow clicked');
    leftOffset -= 300;
    console.log(leftOffset);
    slide_item.forEach((item) => {
      if (leftOffset >= -MAX_OFFSET) {
        item.style.left = leftOffset + 'px';
      } else {
        leftOffset += 300;
      }
    })
  })
}