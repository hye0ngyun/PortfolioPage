{
  // 입력받은 선택자에 슬라이드 기능 구현하는 클래스
  class BlSlide {
    constructor(selector, setting) {
      // parameter init
      this.selector = selector;
      this.setting = setting;
      // DOM init
      this.slideContainer = document.querySelector(
        `${this.selector}_cont_items`,
      );
      this.leftArrow = document.querySelector(`${this.selector} .el_leftArrow`);
      this.rightArrow = document.querySelector(
        `${this.selector} .el_rightArrow`,
      );
      this.slideProgess = document.querySelector(
        `${this.selector} .el_slideBar_progress`,
      );
      // 필터 DOM
      this.filter = document.querySelectorAll(
        `${this.selector} .el_select .el_select_options`,
      );

      // 그리드 순서
      this.items = document.querySelectorAll(`${this.selector}_cont_item.show`);
      let seq = 0;
      this.items.forEach(i => {
        seq += 1;
        i.setAttribute('data-seq', seq);
      });

      /* toggle start */
      // 토글 이벤트
      this.toggle = document.querySelector(`${this.selector} .el_toggle`);
      this.blCont = document.querySelector(`${selector}`);
      if (this.toggle != null) {
        this.toggle.addEventListener('click', () => {
          this.blCont.classList.toggle('js_grid');
          if (!this.blCont.classList.contains('js_grid')) {
            // slide
            this.getSlideSize();
          } else {
            // grid
            this.getGridSize();
          }
        });
      }
      /* toggle end */

      /* filter start */
      // 필터 태그 추가 삭제
      this.filter.forEach(ii => {
        [...ii.children].forEach(jj => {
          jj.addEventListener('click', () => {
            jj.classList.toggle('js_check');
            const innerElem = document.createElement('span');
            innerElem.innerHTML = `
              <span>${jj.innerHTML}</span>
              <img
                src="./img/close_black_24dp.svg"
                alt="close button"
                class="js_close el_ico"
              />
              `;
            innerElem.classList.add('el_tag');
            // 필터 태그 X버튼 누를 때
            innerElem.childNodes[3].addEventListener('click', () => {
              innerElem.remove();
              jj.classList.toggle('js_check');
              this.getitems();
            });

            if (jj.classList.contains('js_check')) {
              // 필터 태그 추가
              document.querySelector(`${this.selector}_tags`).append(innerElem);
              this.getitems();
            } else {
              // 필터 태그 삭제
              document
                .querySelectorAll(`${this.selector}_tags > .el_tag > span`)
                .forEach(kk => {
                  if (kk.innerHTML.trim() === jj.innerHTML.trim()) {
                    kk.parentElement.remove();
                    this.getitems();
                  }
                });
            }
          });
        });
      });
      this.deleteAll = document.querySelector(`${this.selector} .un_deleteAll`);
      if (this.deleteAll != null) {
        this.deleteAll.addEventListener('click', () => {
          document.querySelectorAll('.bl_projects_tags > span').forEach(ii => {
            ii.remove();
          });
          this.filter.forEach(jj => {
            [...jj.children].forEach(kk => {
              kk.classList.remove('js_check');
            });
          });
          this.getitems();
        });
      }
      /* filter end */

      // slide variable init
      this.leftOffset = 0;
      this.maxSlide = 3;
      this.containerWidth = this.slideContainer.clientWidth;
      this.slideItemWidth = this.containerWidth / this.maxSlide;
      this.slideCurrShow = 0;
      this.slideTotalCount = this.items.length;
      this.maxOffset =
        (this.slideTotalCount - this.maxSlide) * this.slideItemWidth;
      this.start = 0;
      this.end = 0;
      this.tempLeftOffset = 0;
      this.currX = 0;
      try {
        this.leftArrow.style.top = `${
          this.slideContainer.clientHeight / 2 - this.leftArrow.clientHeight / 2
        }px`;
        this.rightArrow.style.top = `${
          this.slideContainer.clientHeight / 2 -
          this.rightArrow.clientHeight / 2
        }px`;
      } catch (error) {
        console.log(error);
      }

      // grid variable init
      this.maxRow = 2;
      this.maxCol = 4;
      this.maxItems = this.maxRow * this.maxCol;
      this.gridGap = 50;
      this.gridItemWidth =
        this.containerWidth / this.maxCol - this.gridGap * this.maxCol;

      this.getSlideSize();

      /* binding slide event handler start */
      try {
        this.leftArrow.addEventListener('click', () => {
          this.leftMove();
        });
        this.rightArrow.addEventListener('click', () => {
          this.rightMove();
        });
      } catch (error) {
        console.log(error);
      }
      this.slideContainer.addEventListener('touchstart', e => {
        this.start = e.touches[0].pageX;
      });
      this.slideContainer.addEventListener('touchmove', e => {
        this.currX = e.touches[0].pageX;
        if (this.start !== 0 && this.start < this.currX) {
          // left
          if (this.tempLeftOffset <= 100) {
            this.tempLeftOffset += 10;
          }
          this.items.forEach(item => {
            item.style.left = `${this.leftOffset + this.tempLeftOffset}px`;
          });
        } else if (this.start !== 0 && this.start > this.currX) {
          // right
          if (this.tempLeftOffset >= -100) {
            this.tempLeftOffset -= 10;
          }
          this.items.forEach(item => {
            item.style.left = `${this.leftOffset + this.tempLeftOffset}px`;
          });
        }
      });
      this.slideContainer.addEventListener('touchend', e => {
        this.end = e.changedTouches[0].clientX;
        this.tempLeftOffset = 0;
        this.items.forEach(item => {
          item.style.left = `${this.leftOffset}px`;
        });
        if (this.end - this.start < 0 && this.end - this.start < -100) {
          this.rightMove();
        } else if (this.end - this.start > 0 && this.end - this.start > 100) {
          this.leftMove();
        }
        this.start = 0;
        this.end = 0;
      });
      this.slideContainer.addEventListener('mousedown', e => {
        this.start = e.pageX;
      });
      this.slideContainer.addEventListener('mousemove', e => {
        this.currX = e.pageX;
        if (this.start !== 0 && this.start < this.currX) {
          // left
          if (this.tempLeftOffset <= 100) {
            this.tempLeftOffset += 10;
          }
          this.items.forEach(item => {
            item.style.left = `${this.leftOffset + this.tempLeftOffset}px`;
          });
        } else if (this.start !== 0 && this.start > this.currX) {
          // right
          if (this.tempLeftOffset >= -100) {
            this.tempLeftOffset -= 10;
          }
          this.items.forEach(item => {
            item.style.left = `${this.leftOffset + this.tempLeftOffset}px`;
          });
        }
      });
      this.slideContainer.addEventListener('mouseup', e => {
        this.end = e.pageX;
        this.tempLeftOffset = 0;
        this.items.forEach(item => {
          item.style.left = `${this.leftOffset}px`;
        });
        if (this.end - this.start < 0 && this.end - this.start < -100) {
          this.rightMove();
        } else if (this.end - this.start > 0 && this.end - this.start > 100) {
          this.leftMove();
        }
        this.start = 0;
        this.end = 0;
      });
      /* binding slide event end */

      window.addEventListener('resize', () => {
        if (!this.blCont.classList.contains('js_grid')) {
          // slide
          this.getSlideSize();
        } else {
          // grid
          this.getGridSize();
        }
      });
    }

    leftMove() {
      if (this.leftOffset < 0) {
        this.leftOffset += this.slideItemWidth;
        this.slideCurrShow -= 1;
        this.items.forEach(item => {
          item.style.left = `${this.leftOffset}px`;
        });
        this.progress();
      }
    }

    rightMove() {
      if (this.leftOffset > -this.maxOffset) {
        this.leftOffset -= this.slideItemWidth;
        this.slideCurrShow += 1;
        this.items.forEach(item => {
          item.style.left = `${this.leftOffset}px`;
        });
        this.progress();
      }
    }

    getSlideSize() {
      if (window.innerWidth >= 1240) {
        this.maxSlide = 3;
        if (
          this.slideTotalCount > 2 &&
          this.slideCurrShow === this.slideTotalCount - 2
        )
          this.slideCurrShow -= 1;
      } else if (window.innerWidth >= 768) {
        this.maxSlide = 2;
        if (this.slideCurrShow === this.slideTotalCount - 1)
          this.slideCurrShow -= 1;
      } else {
        this.maxSlide = 1;
      }

      this.items = document.querySelectorAll(`${this.selector}_cont_item.show`);
      this.leftOffset = 0;
      this.slideCurrShow = 0;
      document.querySelector(
        `${this.selector}_cont_items`,
      ).style.minHeight = `400px`;
      this.containerWidth = document.querySelector(
        `${this.selector}_cont`,
      ).clientWidth;
      this.containerHeight = document.querySelector(
        `${this.selector}_cont`,
      ).clientHeight;

      this.slideItemWidth = this.containerWidth / this.maxSlide;
      this.slideTotalCount = this.items.length;
      this.maxOffset =
        (this.slideTotalCount - this.maxSlide) * this.slideItemWidth;
      this.progress();

      this.items.forEach(i => {
        i.style.left = `${this.leftOffset}px`;
        i.style.width = `${this.slideItemWidth}px`;
        i.style.height = `${this.containerHeight}px`;
      });
      this.slideContainer.style.gap = 0;
    }

    getGridSize() {
      if (window.innerWidth >= 1240) {
        this.maxCol = 4;
      } else if (window.innerWidth >= 768) {
        this.maxCol = 3;
      } else {
        this.maxCol = 2;
      }

      this.items = document.querySelectorAll(`${this.selector}_cont_item`);
      this.items.forEach(i => {
        i.setAttribute('data-seq', -1);
      });
      // 그리드 순서
      this.items = document.querySelectorAll(`${this.selector}_cont_item.show`);
      let seq = 0;
      this.items.forEach(i => {
        seq += 1;
        i.setAttribute('data-seq', seq);
      });
      // this.maxCol = 4;
      this.maxItems = this.maxRow * this.maxCol;
      this.gridGap = 30;
      this.gridCurrPage = 1;
      this.containerWidth = document.querySelector(
        `${this.selector}_cont`,
      ).clientWidth;
      this.containerHeight = document.querySelector(
        `${this.selector}_cont_items`,
      ).clientHeight;
      this.gridItemWidth =
        this.containerWidth / this.maxCol -
        (this.gridGap * (this.maxCol - 1)) / this.maxCol;
      this.gridItemHeight =
        this.containerHeight / this.maxRow -
        (this.gridGap * (this.maxRow - 1)) / this.maxRow;
      // 그리드 컨테이너 높이
      document.querySelector(
        `${this.selector}_cont_items`,
      ).style.minHeight = `${
        this.gridItemWidth * this.maxRow + this.gridGap
      }px`;

      this.items.forEach(i => {
        i.style.width = `${this.gridItemWidth}px`;
        i.style.height = `${this.gridItemWidth}px`;
        if (
          // 현재 페이지에서 보여야 하는 경우 js_gridShow로 보여주기
          (this.gridCurrPage - 1) * this.maxItems <
            Number(i.getAttribute('data-seq')) &&
          Number(i.getAttribute('data-seq')) <=
            this.gridCurrPage * this.maxItems
        ) {
          i.classList.add('js_gridShow');
        } else {
          i.classList.remove('js_gridShow');
        }
      });
      this.slideContainer.style.gap = `${this.gridGap}px`;

      this.gridPagination = document.querySelector('.el_pagination');
      this.items = document.querySelectorAll(`${this.selector}_cont_item.show`);
      // 페이지네이션 동적 생성
      const maxGridPagination =
        this.items.length / this.maxItems > 1
          ? parseInt(this.items.length / this.maxItems, 10) + 1
          : 0;
      this.gridPaginationElem = `
                                <li class="js_page">${1}</li>
                                `;
      for (let i = 2; i <= maxGridPagination; i += 1) {
        this.gridPaginationElem += `
                                  <li>${i}</li>
                                  `;
      }
      this.gridPagination.innerHTML = this.gridPaginationElem;
      // this.gridPagination.innerHTML = `
      // <li>${1}</li>
      // <li>${2}</li>
      // `;

      // 그리드 팝업
      document
        .querySelectorAll('.bl_projects.js_grid .bl_projects_cont_item')
        .forEach(ii => {
          ii.addEventListener('click', e => {
            // grid인 경우에만
            if (
              document
                .querySelector(`${this.selector}`)
                .classList.contains('js_grid')
            ) {
              // js_on 추가 - 팝업 열기
              e.target.parentElement.children[1].classList.add('js_on');
              document.querySelector('.el_popupBack').classList.add('js_on');
              document
                .querySelector('.el_popupBack')
                .addEventListener('click', e2 => {
                  // js_on 삭제 - 팝업 닫기
                  e.target.parentElement.children[1].classList.remove('js_on');
                  e2.target.classList.remove('js_on');
                });
            }
          });
        });
      document.querySelectorAll('.un_gridClose').forEach(ii => {
        ii.addEventListener('click', e => {
          // 이벤트 버블링 방지
          e.stopPropagation();
          // js_on 삭제 - 팝업 닫기
          e.target.parentElement.classList.remove('js_on');
          document.querySelector('.el_popupBack').classList.remove('js_on');
        });
      });

      [...this.gridPagination.children].forEach(item => {
        item.addEventListener('click', e => {
          [...this.gridPagination.children].forEach(i =>
            i.classList.remove('js_page'),
          );
          this.gridCurrPage = Number(e.target.innerText);
          e.target.classList.add('js_page');

          this.items = document.querySelectorAll(
            `${this.selector}_cont_item.show`,
          );
          this.items.forEach(i => {
            if (
              (this.gridCurrPage - 1) * this.maxItems <
                Number(i.getAttribute('data-seq')) &&
              Number(i.getAttribute('data-seq')) <=
                this.gridCurrPage * this.maxItems
            ) {
              i.classList.add('js_gridShow');
            } else {
              i.classList.remove('js_gridShow');
            }
          });
        });
      });
    }

    progress() {
      this.slideProgess.style.width =
        this.maxSlide * (100 / this.slideTotalCount) <= 100
          ? `${this.maxSlide * (100 / this.slideTotalCount)}%`
          : `${100}%`;
      this.slideProgess.style.left = `${
        this.slideTotalCount !== 0
          ? this.slideCurrShow * (100 / this.slideTotalCount)
          : 0
      }%`;
    }

    getitems() {
      const totalItem = document.querySelectorAll(`${this.selector}_cont_item`);
      totalItem.forEach(item => {
        item.classList.remove('js_gridShow');
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
      this.items = document.querySelectorAll(`${this.selector}_cont_item.show`);
      if (!this.blCont.classList.contains('js_grid')) {
        // slide
        this.slideTotalCount = this.items.length;

        if (this.slideTotalCount === 0) {
          // slide 결과 없는 경우 elem 생성해 보여주기
          const elem = document.createElement('div');
          elem.innerHTML = `
            <div>조건에 해당하는 결과가 존재하지 않습니다.</div>
          `;
          elem.classList.add(`${this.selector.slice(1)}_cont_item`);
          elem.classList.add('show');
          elem.classList.add('noresult');
          this.slideContainer.append(elem);
        } else {
          this.items.forEach(i => {
            // slide 결과 없는 경우 생성한 elem 삭제
            if (i.classList.contains('noresult')) {
              i.remove();
            }
          });
        }
        this.getSlideSize(); // slide 크기 재조정
      } else {
        // grid
        this.getGridSize();
        // grid 페이지네이션 조정 로직 필요
        // 차후 slide와 grid 구분하여 로직 처리 필요
      }
    }

    getFilters() {
      const tags = document.querySelectorAll(`${this.selector} .el_tag > span`);
      const arr = [];
      tags.forEach(item => {
        arr.push(item.innerHTML.trim());
      });
      return arr;
    }
  }

  // 인스턴스 생성 - 슬라이드 기능 구현
  const blProjectsSlide = new BlSlide('.bl_projects');
  const blStacksSlide = new BlSlide('.bl_stacks');
}
