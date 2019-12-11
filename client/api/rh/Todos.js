const Todos = [{
    employ: '001',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ludwiczakpawel/128.jpg',
    name: 'Template PSD',
    deadline: '2 days later',
    points: 90,
    color: 'pink',
  },
  {
    employ: '001',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/suprb/128.jpg',
    name: 'Logo Design',
    deadline: '1 weeks later',
    points: 70,
    color: 'success'
  },
  {
    employ: '001',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ludwiczakpawel/128.jpg',
    name: 'REST API',
    deadline: '1 Month later',
    points: 50,
    color: 'info'
  },
  {
    employ: 'A001',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/damenleeturks/128.jpg',
    name: 'API Unit Test',
    deadline: '2 Month later',
    points: 30,
    color: 'teal'
  },
  {
    employ: 'A001',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/caspergrl/128.jpg',
    name: 'Project Deploy',
    deadline: 'half year later',
    points: 15,
    color: 'grey'
  },

];

const getTodos = (limit) => {
  return (limit) ? Todos.slice(0, limit) : Todos;
};


export {
    Todos,
  getTodos
};
