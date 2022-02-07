{
  // bl_projects slide를 위한 DOM
  const slide_items = document.querySelector('.bl_projects_slide_items');
  const leftArrow = document.querySelector('.el_leftArrow');
  const rightArrow = document.querySelector('.el_rightArrow');
  const slide_item = document.querySelectorAll('.bl_projects_slide_item');

  // 슬라이드 시 조정되는 오프셋
  let leftOffset = 0;
  // max offset 최대 오프셋
  const MAX_SLIDE = 3;
  const MAX_OFFSET = (slide_items.childElementCount - MAX_SLIDE) * 300;
  // console.log(slide_items.childElementCount);
  // console.log(slide_items.children, slide_items.children[0]);

  // for (let i = 0; i < MAX_SLIDE; i++) {
  //   console.log(slide_items.children[i].classList.add('show'));
  // }

  // slide move function decalration
  function leftMove() {
    leftOffset += 300;
    slide_item.forEach((item) => {
      if (leftOffset <= 0) {
        item.style.left = leftOffset + 'px';
      } else {
        leftOffset -= 300;
      }
    });
  }

  function rigthMove() {
    leftOffset -= 300;
    slide_item.forEach((item) => {
      if (leftOffset >= -MAX_OFFSET) {
        item.style.left = leftOffset + 'px';
      } else {
        leftOffset += 300;
      }
    });
  }

  // pc, mobile 좌 우 버튼 슬라이드 기능
  leftArrow.addEventListener('click', () => leftMove());
  rightArrow.addEventListener('click', () => rigthMove());

  // 터치, 드래그 시 계산될 start, end값
  let start = 0;
  let end = 0;

  // mobile 터치 스와이프 슬라이드 기능
  slide_items.addEventListener('touchstart', (e) => {
    start = e.touches[0].pageX;
  })
  slide_items.addEventListener('touchend', (e) => {
    end = e.changedTouches[0].pageX;

    if ((end - start) === 0) {

    } else if ((end - start) < 0) {
      rigthMove();
    } else {
      leftMove();
    }
  })

  // pc 마우스 드래그 앤 드랍 슬라이드 기능
  slide_items.addEventListener('mousedown', (e) => {
    // console.log(`start: ${e.pageX}`);
    start = e.pageX;
  })
  // 마우스 움직인 방향에따라 객체 이동모션을 위한 리스너
  slide_items.addEventListener('mousemove', (e) => {
    // console.log(e.pageX);
  })
  slide_items.addEventListener('mouseup', (e) => {
    // console.log(`end: ${e.pageX}`);
    end = e.pageX;
    if (start === end) {

    } else if (start < end) {
      leftMove();
    } else {
      rigthMove();
    }
  })
}

{
  const slide_items = document.querySelector('.bl_projects_slide_items');
  const slide_item = document.querySelectorAll('.bl_projects_slide_item');

  // 모바일에서만 터치 이벤트 적용
  let start = 0;
  let end = 0;
  let leftOffset = 0;
  // slide_items.addEventListener('touchstart', (e) => {
  //   console.log(e.touches[0].pageX);
  //   start = e.touches[0].pageX;
  //   console.log(start);
  // })
  // slide_items.addEventListener('touchend', (e) => {

  //   console.log(e.changedTouches[0].pageX);
  //   end = e.changedTouches[0].pageX;
  //   if ((end - start) > 0) {
  //     leftOffset += 300;
  //   console.log(leftOffset);
  //   slide_item.forEach((item) => {
  //     if (leftOffset <= 0) {
  //       item.style.left = leftOffset + 'px';
  //     } else {
  //       leftOffset -= 300;
  //     }
  //   })
  //   }
  // })

  // slide_items.addEventListener('mousedown', (e) => {
  //   console.log(`start: ${e.pageX}`);
  //   start = e.pageX;
  // })
  // slide_items.addEventListener('mousemove', (e) => {
  //   // console.log(e.pageX);
  // })
  // slide_items.addEventListener('mouseup', (e) => {
  //   console.log(`end: ${e.pageX}`);
  //   end = e.pageX;
  //   if (start > end) {
  //     leftOffset -= 300;
  //     console.log(leftOffset);
  //     slide_item.forEach((item) => {
  //       if (leftOffset >= -MAX_OFFSET) {
  //         item.style.left = leftOffset + 'px';
  //       } else {
  //         leftOffset += 300;
  //       }
  //     })
  //   }
  // })
}