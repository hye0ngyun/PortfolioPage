{
  const stacks = [
    {
      name: 'HTML',
      img: 'html5.svg',
      desc: 'SEO 태그를 활용한 마크업',
      domain: 'Frontend',
      color: '#E34F26',
    },
    {
      name: 'CSS',
      img: 'css3.svg',
      desc: 'selector 및 media-query활용한 반응형 퍼블리싱',
      domain: 'Frontend',
      color: '#1572B6',
    },
    {
      name: 'Sass',
      img: 'sass.svg',
      desc: 'nesting, BEM 기법 활용으로 구조화된 클래스 작성',
      domain: 'Frontend',
      color: '#CC6699',
    },
    {
      name: 'Bootstrap',
      img: 'bootstrap.svg',
      desc: 'UI 컴포넌트 활용',
      domain: 'Frontend',
      color: '#7952B3',
    },
    {
      name: 'Jquery',
      img: 'jquery.svg',
      desc: '간소화된 DOM select 문법으로 개발시간 단축',
      domain: 'Frontend',
      color: '#0769AD',
    },
    {
      name: 'Javascript',
      img: 'javascript.svg',
      desc: 'ES6이후 모던 자바스크립트 문법 활용',
      domain: 'Frontend',
      color: '#F7DF1E',
    },
    {
      name: 'Typescript',
      img: 'typescript.svg',
      desc: '타입 지정으로 안정적인 개발에 활용',
      domain: 'Frontend',
      color: '#3178C6',
    },
    {
      name: 'React',
      img: 'react.svg',
      desc: 'Hook·Redux·CSS-in-JS 활용',
      domain: 'Frontend',
      color: '#61DAFB',
    },
    {
      name: 'Nextjs',
      img: 'nextdotjs.svg',
      desc: 'React 기반 SSR·SEO 최적화 개발',
      domain: 'Frontend',
      color: '#000000',
    },
    {
      name: 'Svelte',
      img: 'svelte.svg',
      desc: '선언적이고 간결한 구문으로 최적화된 웹 개발',
      domain: 'Frontend',
      color: '#FA3D00',
    },
    {
      name: 'Vuejs',
      img: 'vuedotjs.svg',
      desc: '데이터와 DOM을 연결하여 반응형 웹 개발',
      domain: 'Frontend',
      color: '#4FC08D',
    },
    {
      name: 'Nuxtjs',
      img: 'nuxtdotjs.svg',
      desc: 'Vue 기반 SSR·SEO 최적화 개발',
      domain: 'Frontend',
      color: '#00DC82',
    },
    {
      name: 'Python',
      img: 'python.svg',
      desc: '기본 문법 활용하여 다양한 라이브러리 핸들링',
      domain: 'Backend',
      color: '#3776AB',
    },
    {
      name: 'Django',
      img: 'django.svg',
      desc: 'python 기반 웹 백엔드 프레임워크',
      domain: 'Backend',
      color: '#092E20',
    },
    {
      name: 'Mysql',
      img: 'mysql.svg',
      desc: 'SQL 활용하여 데이터 처리',
      domain: 'Backend',
      color: '#4479A1',
    },
    {
      name: 'Linux',
      img: 'linux.svg',
      desc: '터미널 활용하여 데이터 관리 및 서버 구동',
      domain: 'DevOps',
      color: '#FCC624',
    },
    {
      name: 'AWS',
      img: 'amazonaws.svg',
      desc: '호스팅 서비스 활용',
      domain: 'DevOps',
      color: '#232F3E',
    },
    {
      name: 'Git',
      img: 'git.svg',
      desc: '프로젝트 형상관리로 안정적인 개발 진행',
      domain: 'DevOps',
      color: '#F05032',
    },
    {
      name: 'Github',
      img: 'github.svg',
      desc: 'git 원격 저장소 활용, pull request 및 merge 활용 가능',
      domain: 'DevOps',
      color: '#181717',
    },
    {
      name: 'Gitlab',
      img: 'gitlab.svg',
      desc: 'git 원격 저장소 활용, pull request 및 merge 활용 가능',
      domain: 'DevOps',
      color: '#FC6D26',
    },
    {
      name: 'Notion',
      img: 'notion.svg',
      desc: 'markdown 및 노션 데이터베이스 활용 ',
      domain: 'DevOps',
      color: '#000000',
    },
  ];

  let elem = '';
  stacks.forEach(el => {
    elem += `<li class="list__item" style="--clr: ${el.color}">
    <div class="box">
      <img src="./img/logo/${el.img}" alt="" />
      <div class="content">
        <h3>${el.domain}</h3>
        <h4>${el.name}</h4>
        <p>${el.desc}</p>
      </div>
    </div>
  </li>`;
  });
  document.write(elem);
}

// elem += `<div class="bl_stacks_cont_item show">
//   <div class="bl_stacks_cont_item_tag">${el.domain}</div>
//   <h3 class="bl_stacks_cont_item_ttl">${el.name}</h3>
//   <div class="bl_stacks_cont_item_imgWrap">
//     <!-- <div class="logo" style="--logo-url: url(/img/logo/${el.img})"></div> -->
//   <img
//       src="/img/logo/${el.img}"
//       alt="${el.name}"
//       class="bl_stacks_cont_item_img"
//     />
//     <div class="bl_stacks_cont_item_img_hov">
//       <span class="bl_stacks_cont_item_img_hov_span">자세히</span>
//     </div>
//   </div>
//   <div class="bl_stacks_cont_item_desc">
//     <img
//       src="./img/close_black_24dp.svg"
//       class="un_gridClose"
//       alt="popup_close_btn"
//     />
//     <p>
//       ${el.desc}
//     </p>
//   </div>
// </div>`
