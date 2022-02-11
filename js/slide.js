{
  // 입력받은 선택자에 슬라이드 기능 구현하는 클래스
  class BlSlide {
    constructor(slideSelector, setting) {
      // parameter init
      this.slideSelector = slideSelector;
      this.setting = setting;
      // DOM init
      this.slideContainer = document.querySelector(slideSelector + '_slide_items');
      this.slideItems = document.querySelectorAll(slideSelector + '_slide_item.show');
      this.leftArrow = document.querySelector(slideSelector + ' .el_leftArrow');
      this.rightArrow = document.querySelector(slideSelector + ' .el_rightArrow');
      this.slideProgess = document.querySelector(slideSelector + ' ' + '.el_slideBar_progress');
      // variable init
      this.leftOffset = 0;
      this.maxSlide = 3;
      this.slideContainerWidth = this.slideContainer.clientWidth;
      this.slideItemWidth = this.slideContainerWidth / this.maxSlide;
      this.currShow = 0;
      this.slideTotalCount = this.slideItems.length;
      this.maxOffset = (this.slideTotalCount - this.maxSlide) * this.slideItemWidth;
      this.start = 0;
      this.end = 0;
      this.resize();
      {
        // binding event handler
        this.leftArrow.addEventListener('click', () => {
          this.leftMove();
        });
        this.rightArrow.addEventListener('click', () => {
          this.rightMove();
        });
        this.slideContainer.addEventListener('touchstart', (e) => {
          this.start = e.touches[0].pageX;
        });
        this.slideContainer.addEventListener('touchend', (e) => {
          this.end = e.changedTouches[0].clientX;
          if ((this.end - this.start) === 0) {
          } else if ((this.end - this.start) < 0) {
            this.rightMove();
          } else {
            this.leftMove();
          }
        });
        this.slideContainer.addEventListener('mousedown', (e) => {
          this.start = e.pageX;
          console.log(this.start);
        });
        this.slideContainer.addEventListener('mouseup', (e) => {
          this.end = e.pageX;
          if ((this.end - this.start) === 0) {
          } else if ((this.end - this.start) < 0) {
            this.rightMove();
          } else {
            this.leftMove();
          }
        });
        window.addEventListener('resize', () => {
          this.resize();
        });
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

      this.slideItems.forEach(i => {
        i.style.left = this.leftOffset + 'px';
        i.style.width = this.slideItemWidth + 'px';
      })
      this.leftArrow.style.top = (this.slideContainer.clientHeight / 2) - (this.leftArrow.clientHeight / 2) + 'px';
      this.rightArrow.style.top = (this.slideContainer.clientHeight / 2) - (this.rightArrow.clientHeight / 2) + 'px';
    }

    progress() {
      this.slideProgess.style.width = ((this.maxSlide * (100 / this.slideTotalCount)) <= 100) ? ((this.maxSlide * (100 / this.slideTotalCount)) + '%') : (100 + '%');
      this.slideProgess.style.left = (this.currShow) * (100 / this.slideTotalCount) + '%';
    }
  }

  // 인스턴스 생성 - 슬라이드 기능 구현
  const bl_stacks_slide = new BlSlide('.bl_stacks');
  const bl_projects_slide = new BlSlide('.bl_projects');
}

{
  // 필터 기능
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