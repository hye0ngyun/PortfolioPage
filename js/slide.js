{
  // bl_projects slide를 위한 DOM
  const slide_items = document.querySelector('.bl_projects_slide_items');
  const leftArrow = document.querySelector('.el_leftArrow');
  const rightArrow = document.querySelector('.el_rightArrow');
  let slide_item = document.querySelectorAll('.bl_projects_slide_item.show');
  console.log(slide_item);
  // 슬라이드 시 조정되는 오프셋
  let leftOffset = 0;
  let MAX_SLIDE = 3;
  let slideContainerWidth = slide_items.clientWidth;
  let slideWidth = slideContainerWidth / MAX_SLIDE;
  let center = 2;
  let currShow = 0;
  // max offset 최대 오프셋
  console.log('slide_item length', slide_item.length);
  let slideTotalCount = slide_item.length;
  let MAX_OFFSET = (slideTotalCount - MAX_SLIDE) * slideWidth;
  // console.log(MAX_OFFSET);
  // console.log(slide_items.childElementCount);
  // console.log(slide_items.children, slide_items.children[0]);

  // for (let i = 0; i < MAX_SLIDE; i++) {
  //   console.log(slide_items.children[i].classList.add('show'));
  // }
  function setSlideSize(init = false) {
    slide_item = document.querySelectorAll('.bl_projects_slide_item.show');
    if (window.innerWidth >= 1240) {
      MAX_SLIDE = 3;
      // slideWidth = slideContainerWidth / MAX_SLIDE;
      if (slideTotalCount > 2 && currShow === slideTotalCount - 2) currShow -= 1;
    } else if (slideTotalCount > 1 && window.innerWidth >= 768) {
      MAX_SLIDE = 2;
      // slideWidth = slideContainerWidth / MAX_SLIDE;
      if (currShow === slideTotalCount - 1) currShow -= 1;
    } else {
      MAX_SLIDE = 1;
    }

    slideTotalCount = slide_item.length;
    slideContainerWidth = slide_items.clientWidth;
    slideWidth = slideContainerWidth / MAX_SLIDE;
    MAX_OFFSET = (slideTotalCount - MAX_SLIDE) * slideWidth;
    leftOffset = -(slideWidth * currShow);
    if (init === true) {
      leftOffset = 0;
      currShow = 0;
    }

    slide_item.forEach((item) => {
      item.style.width = slideWidth + 'px';
      item.style.left = leftOffset + 'px';
    });

    // 슬라이드 프로그레스바
    el_progress = document.querySelector('.el_slideBar_progress');
    el_progress.style.width = ((MAX_SLIDE * (100 / slideTotalCount)) <= 100) ? ((MAX_SLIDE * (100 / slideTotalCount)) + '%') : (100 + '%');
    console.log(MAX_SLIDE * (100 / slideTotalCount));
    el_progress.style.left = (currShow) * (100 / slide_item.length) + '%';
  }
  {
    // DOM 최초 로드 시 슬라이드 사이즈 세팅
    document.addEventListener('DOMContentLoaded', () => {
      setSlideSize();
    });
  }

  // console.log(slideContainerWidth / 3);
  // 윈도우 크기에 따라 슬라이드 반응형으로 사이즈 조절
  window.addEventListener('resize', () => {
    setSlideSize();
  });
  // slide_item.forEach((item) => {
  //   item.style.width =
  // })

  // slide move function decalration
  function leftMove() {
    leftOffset += slideWidth;
    currShow -= 1;
    if (leftOffset <= 0) {
      slide_item.forEach((item) => {
        item.style.left = leftOffset + 'px';
      });
    } else {
      leftOffset -= slideWidth;
      currShow += 1;
    }
    el_progress.style.left = (currShow) * (100 / slide_item.length) + '%';
  }

  function rigthMove() {
    leftOffset -= slideWidth;
    currShow += 1;
    if (leftOffset >= -MAX_OFFSET) {
      slide_item.forEach((item) => {
        item.style.left = leftOffset + 'px';
      });
    } else {
      leftOffset += slideWidth;
      currShow -= 1;
    }
    el_progress.style.left = (currShow) * (100 / slide_item.length) + '%';
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
  });
  // 마우스 움직인 방향에따라 객체 이동모션을 위한 리스너
  slide_items.addEventListener('mousemove', (e) => {
    // console.log(e.pageX);
  });
  slide_items.addEventListener('mouseup', (e) => {
    // console.log(`end: ${e.pageX}`);
    end = e.pageX;
    if (start === end) {

    } else if (start < end) {
      leftMove();
    } else {
      rigthMove();
    }
  });
}

{
  const selectDOM = document.querySelector(
    ".bl_projects_filters > select"
  );
  const tagsDOM = document.querySelector(".bl_projects_filters_tags");
  const elem3 = document.querySelectorAll(".el_tag > .js_close");
  // console.log(elem.selected);
  selectDOM.addEventListener("change", function () {
    // console.log(this.options[this.selectedIndex].value);
    // 변경으로 선택된 값
    let val = this.options[this.selectedIndex].value;
    console.log(this.selectedIndex);
    // 생성할 태그 앨리먼트
    let innerElem = document.createElement("span");
    innerElem.innerHTML = `
            <span class="el_tag"
            ><span>${val}</span
            ><img src="./img/close_white_24dp.svg" alt=""
          /></span>
          `;
    // tags에 생성한 태그 앨리먼트 추가
    if (!getFilters().includes(val)) {
      tagsDOM.appendChild(innerElem);
    }

    // console.log(innerElem.childNodes[1].childNodes[1]);
    // 변경된 값에 대해 기능 필요
    getSlides();
    innerElem.childNodes[1].childNodes[1].addEventListener(
      "click",
      () => {
        innerElem.remove();
        // 변경된 값에 대해 기능 필요
        getSlides();
      }
    );
    // 필터 선택으로 변경
    this.selectedIndex = 0;
  });
  elem3.forEach((item) => {
    item.addEventListener("click", () => {
      item.parentElement.remove();
    });
  });

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  function getFilters() {
    const filtering = document.querySelectorAll(".el_tag > span");
    let arr = [];
    filtering.forEach((item) => {
      // console.log(a);
      // console.log(item.innerHTML);
      arr.push(item.innerHTML);
    });
    return arr;
  }
  // let b = getFilters();
  // console.log(b);
  function getSlides() {
    const slideItem = document.querySelectorAll(
      ".bl_projects_slide_item"
    );
    slideItem.forEach((item) => {
      let slideTags = String(item.dataset["tag"])
        .split(",")
        .map((i) => i.trim());
      // console.log(
      //   slideTags.filter((i) => getFilters().includes(i)).length ===
      //   getFilters().length;
      // );
      // console.log(getFilters());
      if (
        slideTags.filter((i) => getFilters().includes(i)).length ===
        getFilters().length
      ) {
        item.classList.add("show");
      } else {
        item.classList.remove("show");
      }
    });

    setSlideSize(true);
  }
}