// ===== Config =====
const API = "/api";

// ===== Helpers =====
const formatCurrency = (v) => new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(v||0);
const formatDate = (s) => new Date(s+'T00:00:00').toLocaleDateString('pt-BR');
const byId = (id) => document.getElementById(id);

// ===== Estado carregado do servidor =====
let state = {
  clientes: [],
  dominios: [],
  lancamentos: [],
  saldoCaixaInicial: 0
};

// ===== Elementos =====
const kpi = {
  mrr: byId('kpi-mrr'),
  custoTotal: byId('kpi-custo-total'),
  lucro: byId('kpi-lucro'),
  caixa: byId('kpi-caixa')
};
const formLancamento = byId('form-lancamento');
const formCliente = byId('form-cliente');
const formDominio = byId('form-dominio');
const tblClientes = byId('tabela-clientes-corpo');
const tblDominios = byId('tabela-dominios-corpo');
const tblLanc = byId('tabela-lancamentos-corpo');

// ===== Charts =====
let receitaVsCustoChart, fluxoCaixaChart;
const getMonthLabels = () => {
  const labels=[]; const d=new Date(); d.setDate(1);
  for(let i=0;i<12;i++){ labels.unshift(d.toLocaleString('pt-BR',{month:'short',year:'2-digit'})); d.setMonth(d.getMonth()-1); }
  return labels;
};
function initCharts(){
  const ctx1 = document.getElementById('receitaVsCustoChart').getContext('2d');
  receitaVsCustoChart = new Chart(ctx1, {
    type:'line',
    data:{labels:[],datasets:[
      {label:'Receita',data:[],borderColor:'rgb(34,197,94)',backgroundColor:'rgba(34,197,94,.1)',fill:true,tension:.4},
      {label:'Custo',data:[],borderColor:'rgb(239,68,68)',backgroundColor:'rgba(239,68,68,.1)',fill:true,tension:.4}
    ]},
    options:{responsive:true,maintainAspectRatio:false}
  });
  const ctx2 = document.getElementById('fluxoCaixaChart').getContext('2d');
  fluxoCaixaChart = new Chart(ctx2, {
    type:'bar',
    data:{labels:[],datasets:[
      {label:'Saldo do Mês',data:[],backgroundColor:(c)=> (c.dataset.data[c.dataIndex]>=0?'rgba(59,130,246,.7)':'rgba(239,68,68,.7)')}
    ]},
    options:{responsive:true,maintainAspectRatio:false,scales:{y:{beginAtZero:true}}}
  });
}
function updateCharts(){
  const labels = getMonthLabels();
  const receita = new Array(12).fill(0);
  const custo = new Array(12).fill(0);
  const fluxo = new Array(12).fill(0);
  const hoje = new Date();

  for(let i=0;i<12;i++){
    const ref = new Date(hoje.getFullYear(), hoje.getMonth()-i, 1);
    const m = ref.getMonth(), a = ref.getFullYear(), idx = 11-i;

    const custoDominiosMes = state.dominios.reduce((acc,d)=> acc + Number(d.valor_anual||0)/12, 0);
    const despesasMes = state.lancamentos
      .filter(l=> l.tipo==='despesa' && new Date(l.data).getMonth()===m && new Date(l.data).getFullYear()===a)
      .reduce((acc,l)=> acc + Number(l.valor||0), 0);
    custo[idx] = custoDominiosMes + despesasMes;

    const mrrMes = state.clientes.reduce((acc,c)=> acc + Number(c.mensalidade||0), 0);
    const recMes = state.lancamentos
      .filter(l=> l.tipo==='receita' && new Date(l.data).getMonth()===m && new Date(l.data).getFullYear()===a)
      .reduce((acc,l)=> acc + Number(l.valor||0), 0);
    receita[idx] = mrrMes + recMes;

    fluxo[idx] = receita[idx] - custo[idx];
  }
  receitaVsCustoChart.data.labels = labels;
  receitaVsCustoChart.data.datasets[0].data = receita;
  receitaVsCustoChart.data.datasets[1].data = custo;
  receitaVsCustoChart.update();

  fluxoCaixaChart.data.labels = labels;
  fluxoCaixaChart.data.datasets[0].data = fluxo;
  fluxoCaixaChart.update();
}

// ===== Render =====
const calcularProximoVenc = (dataInicio) => {
  const hoje = new Date(); const base = new Date(dataInicio+'T00:00:00');
  let prox = new Date(base); prox.setMonth(hoje.getMonth()); prox.setFullYear(hoje.getFullYear());
  if (prox < hoje) prox.setMonth(prox.getMonth()+1);
  return prox.toISOString().split('T')[0];
};
function render(){
  // KPIs
  const mrr = state.clientes.reduce((a,c)=> a + Number(c.mensalidade||0), 0);
  const custoDom = state.dominios.reduce((a,d)=> a + Number(d.valor_anual||0)/12, 0);
  const hoje = new Date(); const m = hoje.getMonth(); const a = hoje.getFullYear();
  const depMes = state.lancamentos.filter(l=> l.tipo==='despesa' && new Date(l.data).getMonth()===m && new Date(l.data).getFullYear()===a)
                                  .reduce((acc,l)=> acc + Number(l.valor||0), 0);
  const custoTotal = custoDom + depMes;
  const recUnicas = state.lancamentos.filter(l=> l.tipo==='receita' && new Date(l.data).getMonth()===m && new Date(l.data).getFullYear()===a)
                                     .reduce((acc,l)=> acc + Number(l.valor||0), 0);
  const receitaTotal = mrr + recUnicas;
  const lucro = receitaTotal - custoTotal;
  const totalRec = state.lancamentos.filter(l=> l.tipo==='receita').reduce((a,l)=> a + Number(l.valor||0), 0)
                 + state.clientes.reduce((a,c)=> a + Number(c.mensalidade||0), 0);
  const totalDesp = state.lancamentos.filter(l=> l.tipo==='despesa').reduce((a,l)=> a + Number(l.valor||0), 0)
                  + state.dominios.reduce((a,d)=> a + Number(d.valor_anual||0)/12, 0);
  const caixa = state.saldoCaixaInicial + totalRec - totalDesp;

  kpi.mrr.textContent = formatCurrency(mrr);
  kpi.custoTotal.textContent = formatCurrency(custoTotal);
  kpi.lucro.textContent = formatCurrency(lucro);
  kpi.lucro.className = `text-3xl font-bold ${lucro>=0?'text-green-600':'text-red-600'}`;
  kpi.caixa.textContent = formatCurrency(caixa);

  // Tabela clientes
  tblClientes.innerHTML = '';
  state.clientes.forEach(c=>{
    const prox = calcularProximoVenc(c.data_inicio);
    tblClientes.insertAdjacentHTML('beforeend', `
      <tr class="bg-white border-b">
        <td class="px-6 py-4 font-medium text-gray-900">${c.nome}</td>
        <td class="px-6 py-4 text-green-600">${formatCurrency(c.mensalidade)}</td>
        <td class="px-6 py-4">${formatDate(prox)}</td>
        <td class="px-6 py-4 text-sm">
          <button class="font-medium text-indigo-600 hover:text-indigo-900 edit-cliente" data-id="${c.id}">Editar</button>
          <button class="font-medium text-red-600 hover:text-red-900 ml-4 delete-cliente" data-id="${c.id}">Apagar</button>
        </td>
      </tr>`);
  });

  // Tabela dominios
  tblDominios.innerHTML = '';
  state.dominios.forEach(d=>{
    const renov = new Date(d.data_compra+'T00:00:00'); renov.setFullYear(renov.getFullYear()+1);
    tblDominios.insertAdjacentHTML('beforeend', `
      <tr class="bg-white border-b">
        <td class="px-6 py-4 font-medium text-gray-900">${d.dominio}</td>
        <td class="px-6 py-4 text-red-600">${formatCurrency(Number(d.valor_anual||0)/12)}</td>
        <td class="px-6 py-4">${formatDate(renov.toISOString().split('T')[0])}</td>
        <td class="px-6 py-4 text-sm">
          <button class="font-medium text-indigo-600 hover:text-indigo-900 edit-dominio" data-id="${d.id}">Editar</button>
          <button class="font-medium text-red-600 hover:text-red-900 ml-4 delete-dominio" data-id="${d.id}">Apagar</button>
        </td>
      </tr>`);
  });

  // Filtros do extrato
  const di = byId('filtro-data-inicio').value;
  const df = byId('filtro-data-fim').value;
  const cat = byId('filtro-categoria').value;
  let lanc = [...state.lancamentos];
  if (di) lanc = lanc.filter(l=> l.data >= di);
  if (df) lanc = lanc.filter(l=> l.data <= df);
  if (cat) lanc = lanc.filter(l=> l.categoria === cat);
  lanc.sort((a,b)=> new Date(b.data) - new Date(a.data));

  // Tabela de lançamentos
  tblLanc.innerHTML = '';
  lanc.forEach(l=>{
    const cls = l.tipo==='receita' ? 'text-green-600' : 'text-red-600';
    const sg = l.tipo==='receita' ? '+' : '-';
    tblLanc.insertAdjacentHTML('beforeend', `
      <tr class="bg-white border-b">
        <td class="px-6 py-4">${formatDate(l.data)}</td>
        <td class="px-6 py-4 font-medium text-gray-900">${l.descricao||'-'}</td>
        <td class="px-6 py-4">${l.categoria||'-'}</td>
        <td class="px-6 py-4 font-semibold ${cls}">${sg} ${formatCurrency(l.valor)}</td>
        <td class="px-6 py-4 text-sm">
          <button class="font-medium text-red-600 hover:text-red-900 delete-lancamento" data-id="${l.id}">Apagar</button>
        </td>
      </tr>`);
  });

  updateCharts();
}

// ===== API Client =====
async function api(path, opts){
  const r = await fetch(`${API}${path}`, {headers:{'Content-Type':'application/json'}, ...opts});
  if (!r.ok) throw new Error(`${r.status} ${await r.text()}`);
  return r.status===204 ? null : r.json();
}
async function loadAll(){
  const [clientes, dominios, lancamentos] = await Promise.all([
    api('/clientes'),
    api('/dominios'),
    api('/lancamentos')
  ]);
  // normaliza campos do back para o front
  state.clientes = clientes;
  state.dominios = dominios;
  state.lancamentos = lancamentos.map(l => ({ ...l, tipo: l.tipo })); // já vem como 'receita'/'despesa'
}

// ===== Listeners =====
document.addEventListener('DOMContentLoaded', async () => {
  byId('lancamento-data').valueAsDate = new Date();
  byId('cliente-data-inicio').valueAsDate = new Date();
  byId('dominio-data-compra').valueAsDate = new Date();

  ['filtro-data-inicio','filtro-data-fim','filtro-categoria'].forEach(id=>{
    byId(id).addEventListener('change', render);
  });
  byId('btn-limpar-filtros').addEventListener('click', ()=> {
    byId('filtro-data-inicio').value='';
    byId('filtro-data-fim').value='';
    byId('filtro-categoria').value='';
    render();
  });

  initCharts();
  await loadAll();
  render();
});

// Lançamentos
formLancamento.addEventListener('submit', async (e)=>{
  e.preventDefault();
  // usa o primeiro cliente como user_id padrão (ou escolha um select se preferir)
  if (!state.clientes.length) { alert('Cadastre um cliente antes.'); return; }
  const user_id = state.clientes[0].id;
  const payload = {
    user_id,
    descricao: byId('lancamento-descricao').value,
    valor: parseFloat(byId('lancamento-valor').value),
    data: byId('lancamento-data').value,
    tipo: byId('lancamento-tipo').value, // 'receita' | 'despesa'
    categoria: byId('lancamento-categoria').value
  };
  await api('/lancamentos', { method:'POST', body: JSON.stringify(payload) });
  formLancamento.reset();
  byId('lancamento-data').valueAsDate = new Date();
  await loadAll(); render();
});

document.addEventListener('click', async (e)=>{
  // deletar lançamento
  if (e.target?.classList.contains('delete-lancamento')) {
    const id = e.target.dataset.id;
    // (opcional) criar rota DELETE /lancamentos/:id no back; por enquanto recarrega tudo
    alert('DELETE de lançamentos não implementado no back.'); 
  }
  // editar/deletar cliente
  if (e.target?.classList.contains('delete-cliente')) {
    const id = e.target.dataset.id;
    // (opcional) implemente DELETE /clientes/:id no back
    await api(`/clientes/${id}`, { method:'DELETE' });
    await loadAll(); render();
  }
  if (e.target?.classList.contains('edit-cliente')) {
    const id = e.target.dataset.id;
    const c = state.clientes.find(x=> String(x.id)===String(id));
    if (c) {
      byId('cliente-id').value = c.id;
      byId('cliente-nome').value = c.nome || '';
      byId('cliente-mensalidade').value = c.mensalidade || 0;
      byId('cliente-data-inicio').value = c.data_inicio?.slice(0,10);
      const btn = byId('btn-submit-cliente');
      btn.textContent = 'Salvar Alterações';
      btn.classList.remove('bg-green-600','hover:bg-green-700');
      btn.classList.add('bg-indigo-600','hover:bg-indigo-700');
      byId('form-cliente-title').textContent = 'Editar Cliente (SaaS)';
      formCliente.scrollIntoView({behavior:'smooth'});
    }
  }
  // editar/deletar domínio
  if (e.target?.classList.contains('delete-dominio')) {
    const id = e.target.dataset.id;
    await api(`/dominios/${id}`, { method:'DELETE' }).catch(()=> alert('Implemente DELETE /dominios/:id no back.'));
  }
  if (e.target?.classList.contains('edit-dominio')) {
    const id = e.target.dataset.id;
    const d = state.dominios.find(x=> String(x.id)===String(id));
    if (d) {
      byId('dominio-id').value = d.id;
      byId('dominio-nome').value = d.dominio;
      byId('dominio-valor').value = d.valor_anual || 0;
      byId('dominio-data-compra').value = d.data_compra?.slice(0,10);
      const btn = byId('btn-submit-dominio');
      btn.textContent = 'Salvar';
      btn.classList.remove('bg-blue-600','hover:bg-blue-700','px-3');
      btn.classList.add('bg-indigo-600','hover:bg-indigo-700','px-4');
      byId('form-dominio-title').textContent = 'Editar Domínio';
      formDominio.scrollIntoView({behavior:'smooth'});
    }
  }
});

// Clientes
function resetClienteForm(){
  formCliente.reset();
  byId('cliente-id').value='';
  byId('cliente-data-inicio').valueAsDate = new Date();
  const btn = byId('btn-submit-cliente');
  btn.textContent = 'Adicionar Cliente';
  btn.classList.remove('bg-indigo-600','hover:bg-indigo-700');
  btn.classList.add('bg-green-600','hover:bg-green-700');
  byId('form-cliente-title').textContent = 'Adicionar Cliente (SaaS)';
}
formCliente.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const id = byId('cliente-id').value;
  const payload = {
    nome: byId('cliente-nome').value,
    email: null,
    mensalidade: parseFloat(byId('cliente-mensalidade').value),
    data_inicio: byId('cliente-data-inicio').value
  };
  if (id) {
    await api(`/clientes/${id}`, { method:'PUT', body: JSON.stringify(payload) });
  } else {
    await api('/clientes', { method:'POST', body: JSON.stringify(payload) });
  }
  resetClienteForm();
  await loadAll(); render();
});

// Domínios
function resetDominioForm(){
  formDominio.reset();
  byId('dominio-id').value='';
  byId('dominio-data-compra').valueAsDate = new Date();
  const btn = byId('btn-submit-dominio');
  btn.textContent = '+';
  btn.classList.remove('bg-indigo-600','hover:bg-indigo-700','px-4');
  btn.classList.add('bg-blue-600','hover:bg-blue-700','px-3');
  byId('form-dominio-title').textContent = 'Custos com Domínios';
}
formDominio.addEventListener('submit', async (e)=>{
  e.preventDefault();
  if (!state.clientes.length) { alert('Cadastre um cliente antes para associar o domínio.'); return; }
  // associa ao primeiro cliente (ou adapte para um select)
  const cliente_id = state.clientes[0].id;

  const id = byId('dominio-id').value;
  const payload = {
    cliente_id,
    dominio: byId('dominio-nome').value,
    valor_anual: parseFloat(byId('dominio-valor').value),
    data_compra: byId('dominio-data-compra').value,
    ativo: true
  };
  if (id) {
    // (opcional) implemente PUT /dominios/:id no back
    alert('PUT de domínio não implementado no backend ainda.');
  } else {
    await api('/dominios', { method:'POST', body: JSON.stringify(payload) });
  }
  resetDominioForm();
  await loadAll(); render();
});
