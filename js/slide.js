{
  // bl_projects slide를 위한 DOM
  const blProjectsSlideItems = document.querySelector('.bl_projects_slide_items');
  const blProjectsLeftArrow = document.querySelector('.bl_projects .el_leftArrow');
  const blProjectsRightArrow = document.querySelector('.bl_projects .el_rightArrow');
  let blProjectsSlideItem = document.querySelectorAll('.bl_projects_slide_item.show');
  const blProjectsProgress = document.querySelector('.bl_projects .el_slideBar_progress');
  class BlSlide {
    constructor(slideSelector, setting) {
      this.slideSelector = slideSelector;
      this.setting = setting;
      this.slideContainer = document.querySelector(slideSelector + '_slide_items');
      this.slideItems = document.querySelectorAll(slideSelector + '_slide_item.show');
      this.leftArrow = document.querySelector(slideSelector + ' .el_leftArrow');
      this.rightArrow = document.querySelector(slideSelector + ' .el_rightArrow');
      this.slideProgess = document.querySelector(slideSelector + ' ' + '.el_slideBar_progress');
      this.leftOffset = 0;
      this.maxSlide = 3;
      this.slideContainerWidth = this.slideContainer.clientWidth;
      this.slideItemWidth = this.slideContainerWidth / this.maxSlide;
      this.currShow = 0;
      this.slideTotalCount = this.slideItems.length;
      this.maxOffset = (this.slideTotalCount - this.maxSlide) * this.slideItemWidth;
      this.resize();
      this.start = 0;
      this.end = 0;
      {
        // binding event handler
        this.leftArrow.addEventListener('click', () => {
          this.leftMove();
        });
        this.rightArrow.addEventListener('click', () => {
          this.rightMove();
        })
        this.slideContainer.addEventListener('touchstart', (e) => {
          this.start = e.touches[0].pageX;
        })
        this.slideContainer.addEventListener('touchend', (e) => {
          this.end = e.changedTouches[0].clientX;
          if ((this.end - this.start) === 0) {
          } else if ((this.end - this.start) < 0) {
            this.rightMove();
          } else {
            this.leftMove();
          }
        })
        this.slideContainer.addEventListener('mousedown', (e) => {
          this.start = e.pageX;
          console.log(this.start);
        })
        this.slideContainer.addEventListener('mouseup', (e) => {
          this.end = e.pageX;
          if ((this.end - this.start) === 0) {
          } else if ((this.end - this.start) < 0) {
            this.rightMove();
          } else {
            this.leftMove();
          }
        })
        window.addEventListener('resize', () => {
          this.resize();
        })
      }
    }

    leftMove() {
      if (this.leftOffset < 0) {
        this.leftOffset += this.slideItemWidth;
        this.currShow -= 1;
        this.slideItems.forEach((item) => {
          item.style.left = this.leftOffset + 'px';
        });
        this.progress();
      }

    }

    rightMove() {
      if (this.leftOffset > -this.maxOffset) {
        this.leftOffset -= this.slideItemWidth;
        this.currShow += 1;
        this.slideItems.forEach((item) => {
          item.style.left = this.leftOffset + 'px';
        });
        this.progress();
      }

    }

    resize() {
      if (window.innerWidth >= 1240) {
        this.maxSlide = 3;
        if (this.slideTotalCount > 2 && this.currShow === this.slideTotalCount - 2) this.currShow -= 1;
      } else if (this.slideTotalCount > 1 && window.innerWidth >= 768) {
        this.maxSlide = 2;
        if (this.currShow === this.slideTotalCount - 1) this.currShow -= 1;
      } else {
        this.maxSlide = 1;
      }

      this.leftOffset = 0;
      this.slideContainerWidth = this.slideContainer.clientWidth;
      this.slideItemWidth = this.slideContainerWidth / this.maxSlide;
      this.currShow = 0;
      this.slideTotalCount = this.slideItems.length;
      this.maxOffset = (this.slideTotalCount - this.maxSlide) * this.slideItemWidth;
      this.progress();
    }

    progress() {
      this.slideProgess.style.width = ((this.maxSlide * (100 / this.slideTotalCount)) <= 100) ? ((this.maxSlide * (100 / this.slideTotalCount)) + '%') : (100 + '%');
      // console.log(this.maxSlide * (100 / slideTotalCount));
      this.slideProgess.style.left = (this.currShow) * (100 / this.slideTotalCount) + '%';
    }


  }
  const bl_stacks_slide = new BlSlide('.bl_stacks');

  // bl_stacks slide를 위한 DOM
  const blStacksSlideItems = document.querySelector('.bl_stacks_slide_items');
  let slide_qwe = document.querySelectorAll('.bl_stacks_slide_item');

  // 슬라이드 시 조정되는 오프셋
  let leftOffset = 0;
  let maxSlide = 3;
  let slideContainerWidth = blProjectsSlideItems.clientWidth;
  let slideItemWidth = slideContainerWidth / maxSlide;
  let currShow = 0;
  let slideTotalCount = blProjectsSlideItem.length;
  let maxOffset = (slideTotalCount - maxSlide) * slideItemWidth;

  function setSlideSize(init = false) {
    blProjectsSlideItem = document.querySelectorAll('.bl_projects_slide_item.show');
    slide_qwe = document.querySelectorAll('.bl_stacks_slide_item');
    if (window.innerWidth >= 1240) {
      maxSlide = 3;
      // slideItemWidth = slideContainerWidth / maxSlide;
      if (slideTotalCount > 2 && currShow === slideTotalCount - 2) currShow -= 1;
    } else if (slideTotalCount > 1 && window.innerWidth >= 768) {
      maxSlide = 2;
      // slideItemWidth = slideContainerWidth / maxSlide;
      if (currShow === slideTotalCount - 1) currShow -= 1;
    } else {
      maxSlide = 1;
    }

    slideTotalCount = blProjectsSlideItem.length;
    slideContainerWidth = blProjectsSlideItems.clientWidth;
    slideItemWidth = slideContainerWidth / maxSlide;
    maxOffset = (slideTotalCount - maxSlide) * slideItemWidth;
    leftOffset = -(slideItemWidth * currShow);
    if (init === true) {
      leftOffset = 0;
      currShow = 0;
    }

    blProjectsSlideItem.forEach((item) => {
      item.style.width = slideItemWidth + 'px';
      item.style.left = leftOffset + 'px';
    });
    slide_qwe.forEach((item) => {
      item.style.width = slideItemWidth + 'px';
      item.style.left = leftOffset + 'px';
    })

    // bl_projects 슬라이드 프로그레스바
    blProjectsProgress.style.width = ((maxSlide * (100 / slideTotalCount)) <= 100) ? ((maxSlide * (100 / slideTotalCount)) + '%') : (100 + '%');
    console.log(maxSlide * (100 / slideTotalCount));
    blProjectsProgress.style.left = (currShow) * (100 / blProjectsSlideItem.length) + '%';
  }

  // DOM 최초 로드 시 슬라이드 사이즈 세팅
  document.addEventListener('DOMContentLoaded', () => {
    setSlideSize();
  });

  // console.log(slideContainerWidth / 3);
  // 윈도우 크기에 따라 슬라이드 반응형으로 사이즈 조절
  window.addEventListener('resize', () => {
    setSlideSize();
  });
  // blProjectsSlideItem.forEach((item) => {
  //   item.style.width =
  // })

  // slide move function decalration
  function leftMove() {
    leftOffset += slideItemWidth;
    currShow -= 1;
    if (leftOffset <= 0) {
      blProjectsSlideItem.forEach((item) => {
        item.style.left = leftOffset + 'px';
      });
    } else {
      leftOffset -= slideItemWidth;
      currShow += 1;
    }
    blProjectsProgress.style.left = (currShow) * (100 / blProjectsSlideItem.length) + '%';
  }

  function rigthMove() {
    leftOffset -= slideItemWidth;
    currShow += 1;
    if (leftOffset >= -maxOffset) {
      blProjectsSlideItem.forEach((item) => {
        item.style.left = leftOffset + 'px';
      });
    } else {
      leftOffset += slideItemWidth;
      currShow -= 1;
    }
    blProjectsProgress.style.left = (currShow) * (100 / blProjectsSlideItem.length) + '%';
  }

  // pc, mobile 좌 우 버튼 슬라이드 기능
  blProjectsLeftArrow.addEventListener('click', () => leftMove());
  blProjectsRightArrow.addEventListener('click', () => rigthMove());

  // 터치, 드래그 시 계산될 start, end값
  let start = 0;
  let end = 0;

  // mobile 터치 스와이프 슬라이드 기능
  blProjectsSlideItems.addEventListener('touchstart', (e) => {
    start = e.touches[0].pageX;
  })
  blProjectsSlideItems.addEventListener('touchend', (e) => {
    end = e.changedTouches[0].pageX;

    if ((end - start) === 0) {
    } else if ((end - start) < 0) {
      rigthMove();
    } else {
      leftMove();
    }
  })

  // pc 마우스 드래그 앤 드랍 슬라이드 기능
  blProjectsSlideItems.addEventListener('mousedown', (e) => {
    // console.log(`start: ${e.pageX}`);
    start = e.pageX;
  });
  // 마우스 움직인 방향에따라 객체 이동모션을 위한 리스너
  blProjectsSlideItems.addEventListener('mousemove', (e) => {
    // console.log(e.pageX);
  });
  blProjectsSlideItems.addEventListener('mouseup', (e) => {
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