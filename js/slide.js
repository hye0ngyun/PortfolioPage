{
  // 입력받은 선택자에 슬라이드 기능 구현하는 클래스
  class BlSlide {
    constructor(slideSelector, setting) {
      // parameter init
      this.slideSelector = slideSelector;
      this.setting = setting;
      // DOM init
      this.slideContainer = document.querySelector(
        `${this.slideSelector}_slide_items`,
      );
      this.slideItems = document.querySelectorAll(
        `${this.slideSelector}_slide_item.show`,
      );
      this.leftArrow = document.querySelector(
        `${this.slideSelector} .el_leftArrow`,
      );
      this.rightArrow = document.querySelector(
        `${this.slideSelector} .el_rightArrow`,
      );
      this.slideProgess = document.querySelector(
        `${this.slideSelector} .el_slideBar_progress`,
      );
      this.filter = document.querySelectorAll(
        `${this.slideSelector} .el_select .el_select_options`,
      );
      this.filter.forEach(i => {
        // console.log([...i.children]);
        [...i.children].forEach(i2 => {
          i2.addEventListener('click', () => {
            // console.log(i2);
            i2.classList.toggle('js_check');
            const innerElem = document.createElement('span');
            innerElem.innerHTML = `
              <span>${i2.innerHTML}</span>
              <img
                src="./img/close_white_24dp.svg"
                alt="close button"
                class="js_close"
              />
              `;
            innerElem.classList.add('el_tag');
            // console.log(innerElem.childNodes[3]);
            innerElem.childNodes[3].addEventListener('click', () => {
              innerElem.remove();
              i2.classList.toggle('js_check');
              this.getSlides();
            });
            if (i2.classList.contains('js_check')) {
              // 추가
              document
                .querySelector('.bl_projects_filters_tags')
                .append(innerElem);
              this.getSlides();
            } else {
              // 삭제
              document
                .querySelectorAll('.bl_projects_filters_tags > .el_tag > span')
                .forEach(i3 => {
                  if (i3.innerHTML.trim() === i2.innerHTML.trim()) {
                    i3.parentElement.remove();
                    this.getSlides();
                  }
                });
            }
          });
        });
      });
      // variable init
      this.leftOffset = 0;
      this.maxSlide = 3;
      this.slideContainerWidth = this.slideContainer.clientWidth;
      this.slideItemWidth = this.slideContainerWidth / this.maxSlide;
      this.currShow = 0;
      this.slideTotalCount = this.slideItems.length;
      this.maxOffset =
        (this.slideTotalCount - this.maxSlide) * this.slideItemWidth;
      this.start = 0;
      this.end = 0;
      this.resize();

      // binding event handler
      this.leftArrow.addEventListener('click', () => {
        this.leftMove();
      });
      this.rightArrow.addEventListener('click', () => {
        this.rightMove();
      });
      this.slideContainer.addEventListener('touchstart', e => {
        this.start = e.touches[0].pageX;
      });
      this.slideContainer.addEventListener('touchend', e => {
        this.end = e.changedTouches[0].clientX;
        if (this.end - this.start < 0) {
          this.rightMove();
        } else {
          this.leftMove();
        }
      });
      this.slideContainer.addEventListener('mousedown', e => {
        this.start = e.pageX;
      });
      this.slideContainer.addEventListener('mouseup', e => {
        this.end = e.pageX;
        if (this.end - this.start < 0) {
          this.rightMove();
        } else {
          this.leftMove();
        }
      });
      window.addEventListener('resize', () => {
        this.resize();
      });
    }

    leftMove() {
      if (this.leftOffset < 0) {
        this.leftOffset += this.slideItemWidth;
        this.currShow -= 1;
        this.slideItems.forEach(item => {
          item.style.left = `${this.leftOffset}px`;
        });
        this.progress();
      }
    }

    rightMove() {
      if (this.leftOffset > -this.maxOffset) {
        this.leftOffset -= this.slideItemWidth;
        this.currShow += 1;
        this.slideItems.forEach(item => {
          item.style.left = `${this.leftOffset}px`;
        });
        this.progress();
      }
    }

    resize() {
      if (window.innerWidth >= 1240) {
        this.maxSlide = 3;
        if (
          this.slideTotalCount > 2 &&
          this.currShow === this.slideTotalCount - 2
        )
          this.currShow -= 1;
      } else if (this.slideTotalCount > 1 && window.innerWidth >= 768) {
        this.maxSlide = 2;
        if (this.currShow === this.slideTotalCount - 1) this.currShow -= 1;
      } else {
        this.maxSlide = 1;
      }

      this.slideItems = document.querySelectorAll(
        `${this.slideSelector}_slide_item.show`,
      );
      this.leftOffset = 0;
      this.currShow = 0;
      this.slideContainerWidth = this.slideContainer.clientWidth;
      this.slideItemWidth = this.slideContainerWidth / this.maxSlide;
      this.slideTotalCount = this.slideItems.length;
      this.maxOffset =
        (this.slideTotalCount - this.maxSlide) * this.slideItemWidth;
      this.progress();
      console.log(this.slideTotalCount);
      const elem = document.createElement('div');
      elem.innerHTML = `
          <div>조건에 해당하는 결과가 존재하지 않습니다.</div>
        `;
      if (this.slideTotalCount === 0) {
        elem.classList.add('bl_projects_slide_item');
        elem.classList.add('show');
        elem.classList.add('noresult');
        this.slideContainer.append(elem);
      } else {
        this.slideItems.forEach(i => {
          console.log(i.classList.contains('noresult'));
          if (i.classList.contains('noresult')) {
            i.remove();
            this.resize();
          }
        });
      }

      this.slideItems.forEach(i => {
        i.style.left = `${this.leftOffset}px`;
        i.style.width = `${this.slideItemWidth}px`;
      });
      this.leftArrow.style.top = `${
        this.slideContainer.clientHeight / 2 - this.leftArrow.clientHeight / 2
      }px`;
      this.rightArrow.style.top = `${
        this.slideContainer.clientHeight / 2 - this.rightArrow.clientHeight / 2
      }px`;
    }

    progress() {
      this.slideProgess.style.width =
        this.maxSlide * (100 / this.slideTotalCount) <= 100
          ? `${this.maxSlide * (100 / this.slideTotalCount)}%`
          : `${100}%`;
      this.slideProgess.style.left = `${
        this.currShow * (100 / this.slideTotalCount)
      }%`;
    }

    getSlides() {
      const slideItem = document.querySelectorAll(
        `${this.slideSelector}_slide_item`,
      );
      slideItem.forEach(item => {
        const slideTags = String(item.dataset.tag)
          .split(',')
          .map(i => i.trim());
        if (
          slideTags.filter(i => this.getFilters().includes(i)).length ===
          this.getFilters().length
        ) {
          item.classList.add('show');
        } else {
          item.classList.remove('show');
        }
      });
      this.resize();
    }

    getFilters() {
      const tags = document.querySelectorAll(
        `${this.slideSelector} .el_tag > span`,
      );
      const arr = [];
      tags.forEach(item => {
        arr.push(item.innerHTML.trim());
      });
      return arr;
    }
  }

  // 인스턴스 생성 - 슬라이드 기능 구현
  const blStacksSlide = new BlSlide('.bl_stacks');
  const blProjectsSlide = new BlSlide('.bl_projects');

  document
    .querySelector('.el_projects_toggle')
    .addEventListener('click', () => {
      document.querySelector('.bl_projects').classList.toggle('grid');
    });
}
