const table = document.querySelector('#container');
let id = '';
const renderTitle = (data, container) => {
  data = data[0].toUpperCase() + data.slice(1);
  container.innerHTML = data;
}
const renderTable = (data, container) => {
  const html = `
         <thead>
             <tr>
                 ${Object.keys(data[0])
                   .map(
                     key =>
                       `<th scope='col'> ${key[0].toUpperCase() +
                         key.slice(1)} </th>`
                   )
                   .join('')}
             </tr>
         </thead>
         <tbody>
         ${data
           .map(obj => {
             return `<tr>
                 ${Object.values(obj)
                   .map(value => {
                     return `<td>${value}</td>`;
                   })
                   .join('')}
             </tr>`;
           })
           .join('')}
         </tbody>`;
  container.innerHTML = html;
};

const fetchAndRender = () => {
  let API;
  API = axios
    .get(`https://acme-users-api-rev.herokuapp.com/api/${id}`)
    .then(response => response.data);
  Promise.all([API]).then(response => {
    const [data] = response;
    renderTable(data, table);
  });
}
if (!id) {
  id = 'companies';
  window.location.hash = id;
  renderTitle(id, document.querySelector('#title'));
  fetchAndRender();
}

window.addEventListener('hashchange', ev => {
  id = window.location.hash.slice(1);
  renderTitle(id, document.querySelector('#title'));
  fetchAndRender();
});