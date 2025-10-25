const WA_NUMBER = '258877971232'; // alterar para o número real

const products = {
  phones: [
    {id:'p1',name:'iPhone 13 Pro Max',desc:'Armazenamento 256GB, Câmara Tripla, Bateria duradoura.',price:'75.000 MZN',note:'Disponível em várias cores. Garantia 12 meses.'},
    {id:'p2',name:'Samsung Galaxy S23',desc:'Ecrã AMOLED, Bateria de longa duração, Câmara profissional.',price:'68.000 MZN',note:''},
    {id:'p3',name:'Xiaomi Redmi Note 13',desc:'Excelente relação qualidade/preço. Boa bateria e câmara.',price:'25.000 MZN',note:''}
  ],
  computers: [
    {id:'c1',name:'HP Pavilion 15"',desc:'Intel Core i5 • 8GB RAM • 512GB SSD. Ideal para produtividade.',price:'55.000 MZN',note:''},
    {id:'c2',name:'MacBook Air M1',desc:'Processador M1, ótimo desempenho para tarefas diárias e portabilidade.',price:'95.000 MZN',note:''},
    {id:'c3',name:'Dell Inspiron 14"',desc:'Compacto, rápido e ideal para o dia a dia.',price:'45.000 MZN',note:''}
  ],
  accessories: [
    {id:'a1',name:'Fones Bluetooth JBL',desc:'Som potente e conexão estável.',price:'3.500 MZN',note:''},
    {id:'a2',name:'Carregadores Originais',desc:'Carregadores para Samsung, Apple e outras marcas.',price:'A partir de 1.000 MZN',note:''},
    {id:'a3',name:'Capas e Películas',desc:'Protege o teu equipamento com estilo.',price:'A partir de 500 MZN',note:''}
  ]
};

function createCard(item){
  const article = document.createElement('article');
  article.className = 'card';

  const thumb = document.createElement('div');
  thumb.className = 'thumb';
  thumb.innerHTML = `<div>${item.name}<br><small style="font-weight:600">${item.price}</small></div>`;

  const title = document.createElement('h4');
  title.className = 'product-title';
  title.textContent = item.name;

  const price = document.createElement('div');
  price.className = 'price';
  price.textContent = item.price;

  const desc = document.createElement('div');
  desc.style.color = 'var(--muted)';
  desc.style.fontSize = '14px';
  desc.textContent = item.desc;

  const actions = document.createElement('div');
  actions.className = 'actions';

  const btnView = document.createElement('a');
  btnView.href = '#';
  btnView.className = 'btn btn-outline';
  btnView.textContent = 'Ver';
  btnView.addEventListener('click', (e)=>{ e.preventDefault(); showDetails(item); });

  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Olá gostaria de informações sobre: ' + item.name)}`;
  const btnBuy = document.createElement('a');
  btnBuy.href = waLink;
  btnBuy.className = 'btn btn-whatsapp';
  btnBuy.target = '_blank';
  btnBuy.textContent = 'Comprar';

  actions.appendChild(btnView);
  actions.appendChild(btnBuy);

  article.appendChild(thumb);
  article.appendChild(title);
  article.appendChild(price);
  article.appendChild(desc);
  article.appendChild(actions);

  return article;
}

function loadProducts(){
  const phonesGrid = document.getElementById('products-grid');
  products.phones.forEach(p=>phonesGrid.appendChild(createCard(p)));

  const compsGrid = document.getElementById('computers-grid');
  products.computers.forEach(c=>compsGrid.appendChild(createCard(c)));

  const accGrid = document.getElementById('accessories-grid');
  products.accessories.forEach(a=>accGrid.appendChild(createCard(a)));
}

function showDetails(item){
  const modal = document.getElementById('modalBackdrop');
  document.getElementById('modalTitle').textContent = item.name;
  document.getElementById('modalBody').innerHTML = `
    <div class="row">
      <div style="flex:1;min-width:180px">
        <img src="img/product.svg" alt="${item.name}" style="width:100%;border-radius:8px">
      </div>
      <div style="flex:2;min-width:200px">
        <p style="margin-top:0"><strong>Preço:</strong> ${item.price}</p>
        <p style="margin:6px 0">${item.desc}</p>
        ${item.note?`<p style="color:var(--muted)"><em>${item.note}</em></p>`:''}
      </div>
    </div>
  `;

  const wa = document.getElementById('modalWhatsapp');
  wa.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Olá, tenho interesse no produto: ' + item.name + ' — preço: ' + item.price)}`;

  const pedir = document.getElementById('modalPedido');
  pedir.href = wa.href;

  modal.style.display = 'flex';
}

function hideModal(e){
  const modal = document.getElementById('modalBackdrop');
  modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', loadProducts);
