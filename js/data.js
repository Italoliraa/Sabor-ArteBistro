/*
  Cardápio e textos. Pratos, descrições, preços e etiquetas são EXEMPLOS.
  Etiquetas: veg = vegetariano, vegan = vegano, gf = sem glúten. CONFIRME com a cozinha antes de publicar.
  chef: true marca "Sugestão da casa". Para foto do prato, adicione img: 'img/prato.jpg'.
*/
window.DATA = {
  tags: { veg: 'Vegetariano', vegan: 'Vegano', gf: 'Sem glúten' },
  menu: [
    { id: 'entradas', name: 'Entradas', color: '#C8381F', shape: 'leaf', items: [
      { name: 'Burrata com tomates assados', desc: 'Burrata cremosa, tomates confitados, pesto de manjericão e torradas.', price: 48, tags: ['veg'], chef: true },
      { name: 'Carpaccio de carne', desc: 'Lâminas finas, rúcula, lascas de parmesão e molho de mostarda.', price: 52, tags: ['gf'] },
      { name: 'Bruschetta de cogumelos', desc: 'Mix de cogumelos salteados no alho sobre pão artesanal.', price: 38, tags: ['veg', 'vegan'] },
      { name: 'Croquetes de bacalhau', desc: 'Seis unidades crocantes, acompanhadas de maionese de limão.', price: 44, tags: [] }
    ]},
    { id: 'principais', name: 'Pratos principais', color: '#2F6B4F', shape: 'blob', items: [
      { name: 'Risoto de limão siciliano com camarões', desc: 'Arroz arbóreo, camarões salteados e raspas de limão.', price: 92, tags: ['gf'], chef: true },
      { name: 'Filé ao vinho tinto', desc: 'Filé alto grelhado, molho de vinho tinto e purê de batata-baroa.', price: 98, tags: ['gf'] },
      { name: 'Salmão grelhado', desc: 'Salmão com legumes assados e azeite de ervas.', price: 94, tags: ['gf'] },
      { name: 'Ravióli de abóbora', desc: 'Massa fresca recheada, manteiga de sálvia e nozes tostadas.', price: 72, tags: ['veg'] },
      { name: 'Moqueca de legumes', desc: 'Legumes no leite de coco e dendê, com arroz e farofa.', price: 68, tags: ['veg', 'vegan', 'gf'] }
    ]},
    { id: 'sobremesas', name: 'Sobremesas', color: '#E0A21C', shape: 'half', items: [
      { name: 'Petit gâteau', desc: 'Bolinho quente de chocolate com sorvete de baunilha.', price: 32, tags: ['veg'], chef: true },
      { name: 'Tarte de limão', desc: 'Massa amanteigada, creme de limão e merengue maçaricado.', price: 28, tags: ['veg'] },
      { name: 'Pudim de leite da casa', desc: 'Receita clássica, calda de caramelo.', price: 24, tags: ['veg', 'gf'] }
    ]},
    { id: 'bebidas', name: 'Bebidas', color: '#1F2430', shape: 'drop', items: [
      { name: 'Limonada de frutas vermelhas', desc: 'Refrescante, com hortelã.', price: 16, tags: ['veg', 'vegan', 'gf'] },
      { name: 'Suco natural', desc: 'Sabores do dia.', price: 14, tags: ['veg', 'vegan', 'gf'] },
      { name: 'Vinho em taça', desc: 'Tinto ou branco, selecionados pela casa.', price: 28, tags: ['veg', 'vegan', 'gf'] },
      { name: 'Cerveja artesanal', desc: 'Pergunte pelos rótulos disponíveis.', price: 24, tags: ['veg'] },
      { name: 'Café espresso', desc: 'Grão selecionado, extração na hora.', price: 9, tags: ['veg', 'vegan', 'gf'] }
    ]}
  ],
  about: 'Aqui, o prato é uma pequena obra: ingredientes frescos, técnica e um toque de cor em cada detalhe. Venha almoçar, jantar ou comemorar sem pressa.'
};
