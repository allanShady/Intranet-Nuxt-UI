const Todos = [{
    employ: '001',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ludwiczakpawel/128.jpg',
    name: 'Template PSD',
    deadline: '2 days later',
    points: 90,
    color: 'pink',
    year: 2019
  },
  {
    employ: '001',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/suprb/128.jpg',
    name: 'Logo Design',
    deadline: '1 weeks later',
    points: 70,
    color: 'success',
    year: 2019
  },
  {
    employ: '001',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ludwiczakpawel/128.jpg',
    name: 'REST API',
    deadline: '1 Month later',
    points: 50,
    color: 'info',
    year: 2018
  },
  {
    employ: 'A001',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/damenleeturks/128.jpg',
    name: 'API Unit Test',
    deadline: '2 Month later',
    points: 30,
    color: 'teal',
    year: 2019
  },
  {
    employ: 'A001',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/caspergrl/128.jpg',
    name: 'Project Deploy',
    deadline: 'half year later',
    points: 15,
    color: 'grey',
    year: 2019
  },

];

const getTodos = (limit) => {
  return (limit) ? Todos.slice(0, limit) : Todos;
};


export {
    Todos,
  getTodos
};
