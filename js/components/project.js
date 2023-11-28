{
  const projects = [
    {
      img: 'project_momentum-clone.png',
      title: 'Momentum Clone',
      description:
        '바닐라 JavaScript를 이용해 크롬 확장 프로그램인 Momentum의 기능을 클론했습니다. openweatherapi를 이용해 현재 사용자 위치의 실시간 날씨정보를 얻을 수 있고, 실시간 시계 기능, 랜덤 배경과 랜덤 명언, 투두리스트 기능을 구현했습니다. 사용자 정보와 투두리스트는 localStorage를 활용해 브라우저 캐시에 저장하여 정보를 기억하도록 구현했습니다.',
      githubLink: 'https://github.com/hye0ngyun/momentum-clone',
      viewLink: 'https://hye0ngyun.github.io/momentum-clone/',
      dataTag: {
        languages: 'HTML/CSS,JavaScript',
        domains: 'Frontend,Publishing',
        frameworks: '',
      },
    },
    {
      img: 'project_SalSaver.png',
      title: 'Sal Saver',
      description:
        'python으로 공제금 계산 모듈을 만들고, pyscript 라이브러리를 이용해 프론트엔드에서 python 코드를 실행해 DOM을 조작하여 연봉계산기 기능을 클론 했습니다.',
      githubLink: 'https://github.com/hye0ngyun/sal-saver',
      viewLink: 'https://hye0ngyun.github.io/sal-saver/',
      dataTag: {
        languages: 'HTML/CSS,JavaScript',
        domains: 'Frontend,Publishing',
        frameworks: '',
      },
    },
    {
      img: 'vue_todolist_01.png',
      title: 'Vue Todolist',
      description:
        'Vue로 만든 Todolist로 간단한 CRUD기능과 필터링 기능으로 리스트를 랜더링할 수 있습니다. localstorage를 통해 캐시를 이용하여 브라우저에 정보가 저장돼 간단한 할 일을 관리할 수 있습니다.',
      githubLink: 'https://github.com/hye0ngyun/vue-todolistr',
      viewLink: 'https://hye0ngyun.github.io/vue-todolist/',
      dataTag: {
        languages: 'HTML/CSS,JavaScript',
        domains: 'Frontend,Publishing',
        frameworks: '',
      },
    },
    {
      img: 'project_LIO.jpg',
      title: 'LIO',
      description:
        '졸업 프로젝트를 진행할 때 프론트엔드 파트를 맡아 사이트 레이아웃 디자인과 퍼블리싱을 진행했습니다. 구현시 프레임워크를 사용하지 않고 HTML, CSS, JavaScript만을 사용해 구현했습니다.',
      githubLink: 'https://github.com/hye0ngyun/LIO',
      viewLink: '',
      dataTag: {
        languages: 'HTML/CSS,JavaScript',
        domains: 'Frontend,Publishing',
        frameworks: '',
      },
    },
    {
      img: 'project_DataVoucher.png',
      title: 'DataVoucher',
      description:
        '외주 퍼블리싱입니다. HTML, CSS, JavaScript만을 사용해 구현했습니다.',
      githubLink:
        'https://github.com/hye0ngyun/outsourcing-preview/tree/main/DataVoucher',
      viewLink: '',
      dataTag: {
        languages: 'HTML/CSS,JavaScript',
        domains: 'Publishing',
        frameworks: '',
      },
    },
    {
      img: 'project_asset.jpg',
      title: 'EdgeAsset',
      description:
        '외주 퍼블리싱입니다. HTML, CSS, JavaScript만을 사용해 구현했습니다.',
      githubLink:
        'https://github.com/hye0ngyun/outsourcing-preview/tree/main/EdgeAsset',
      viewLink: '',
      dataTag: {
        languages: 'HTML/CSS,JavaScript',
        domains: 'Publishing',
        frameworks: '',
      },
    },
    {
      img: 'project_DreamTech.png',
      title: 'DreamTech',
      description:
        '외주 퍼블리싱입니다. HTML, CSS, JavaScript만을 사용해 구현했습니다.',
      githubLink:
        'https://github.com/hye0ngyun/outsourcing-preview/tree/main/DreamTech',
      viewLink: '',
      dataTag: {
        languages: 'HTML/CSS,JavaScript',
        domains: 'Publishing',
        frameworks: '',
      },
    },
  ];

  let elem = '';
  projects.forEach(project => {
    elem += `<div
  class="bl_projects_cont_item show"
  data-tag="${Object.values(project.dataTag)}"
  >
  <div class="bl_projects_cont_item_imgWrap">
    <img
      src="./img/${project.img}"
      alt=""
      class="bl_projects_cont_item_img"
    />
    <div class="bl_projects_cont_item_img_hov">
      <span class="bl_projects_cont_item_img_hov_span"
        >자세히</span
      >
    </div>
  </div>
  <div class="bl_projects_cont_item_desc">
    <img
      src="./img/close_black_24dp.svg"
      class="un_gridClose"
      alt="popup_close_btn"
    />
    <div class="bl_projects_cont_item_desc_ttl">${project.title}</div>
    <div class="bl_projects_cont_item_desc_p">
      <span class="hp_txt_bold">설명</span>: ${project.description}
    </div>
    <div class="bl_projects_cont_item_desc_linkWrap">
    ${
      project.githubLink &&
      `<a
    href="${project.githubLink}"
    class="el_linkBtn"
    target="_blank"
    >깃허브<img
      src="./img/link_white_24dp.svg"
      alt="link_img"
  /></a>`
    }
  ${
    project.viewLink &&
    `<a
        href="${project.viewLink}"
        class="el_linkBtn"
        target="_blank"
        >View<img src="./img/link_white_24dp.svg" alt="link_img"
      /></a>`
  }
    </div>
    <div class="bl_projects_cont_item_desc_tags">
    ${
      project.dataTag.domains.length
        ? `<div>
        <span class="hp_txt_bold">언어: </span>
        ${project.dataTag.languages
          .split(',')
          .map(el => `<span class="el_tag">${el}</span>`)}
      </div>`
        : ''
    }
      ${
        project.dataTag.domains.length
          ? `<div>
        <span class="hp_txt_bold">분야: </span>
        ${project.dataTag.domains
          .split(',')
          .map(el => `<span class="el_tag">${el}</span>`)}
      </div>`
          : ''
      }
      ${
        project.dataTag.frameworks.length
          ? `<div>
      <span class="hp_txt_bold">프레임워크: </span>
      ${project.dataTag.frameworks
        .split(',')
        .map(el => `<span class="el_tag">${el}</span>`)}
    </div>`
          : ''
      }
    </div>
  </div>
  </div>`;
  });
  document.write(elem);
}
