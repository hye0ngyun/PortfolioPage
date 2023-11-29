interface IStack {
  name: string;
  img: string;
  desc: string;
  domain: 'Frontend' | 'Backend' | 'DevOps';
}
const stacks: IStack[] = [
  {
    name: 'React',
    img: 'react-logo.png',
    desc: 'A JavaScript library for building user interfaces',
    domain: 'Frontend',
  },
];
