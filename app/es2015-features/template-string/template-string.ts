var main = document.querySelector('main');

var todo = {
   id: 89,
   name: 'learn typescript',
   done: false
};

var name = `Todo #${todo.id}`;

main.innerHTML = `
   <header class="page-header">
      <h1>Typescript <small>Just learn it</small></h1>
   </header>
`;