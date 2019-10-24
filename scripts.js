
// const getData = url => {
//   return axios.get(url).then(response => response.data);
// };

const products = axios
  .get('https://acme-users-api-rev.herokuapp.com/api/products')
  .then(response => response.data);
const companies = axios
  .get('https://acme-users-api-rev.herokuapp.com/api/companies')
  .then(response => response.data);
console.log(window.location);

Promise.all([products, companies]).then(response => {
  const [products, companies] = response;
  const table = document.querySelector('#container');
  const mainNav = document.querySelector('#main-nav');
  //   render(products, body);
  renderNav(response, mainNav);
  renderTable(companies, table);
});

const renderTable = (data, container) => {
  //<table class='table table-striped'> </table>
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

const renderNav = (data, container) => {
  const html = data
    .map(arr => {
      return `<li class="nav-item">
     <a class="nav-link active" href="#${2 + 2}">(${arr.length})</a>
     </li>`;
    })
    .join('');
  container.innerHTML = html;
};
