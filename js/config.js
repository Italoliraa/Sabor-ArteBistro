/*
  CONFIGURAÇÕES DO SABOR & ARTE BISTRO
  Tudo aqui é EXEMPLO (placeholder). Troque pelos dados reais, salve e o Live Server atualiza.
*/
window.SITE = {
  name: 'Sabor & Arte Bistro',
  // WhatsApp para reservas: código do país + DDD + número, só dígitos. Ex.: 5581999999999
  whatsapp: '5500000000000',
  // Telefone para o botão "Ligar" (só dígitos com DDD) e texto exibido
  phoneRaw: '0000000000',
  phone: '(00) 0000-0000 (exemplo)',
  instagramUser: 'saborearte.bistro (exemplo)',
  instagramUrl: 'https://www.instagram.com/',
  // Endereço exibido no site (exemplo fictício)
  address: 'Rua Exemplo, 123, Bairro, Cidade/UF (endereço fictício)',
  // Texto usado para localizar o ponto no Google Maps. Use o endereço REAL do restaurante.
  // (Este é um endereço de exemplo, só para o mapa funcionar na demonstração.)
  mapQuery: 'Avenida Paulista, 1000, São Paulo',
  // Horário: 0 = domingo ... 6 = sábado. null = fechado. Lista de períodos [abre, fecha] em 24h.
  hours: {
    0: [['12:00', '17:00']],
    1: null,
    2: [['12:00', '15:00'], ['19:00', '23:00']],
    3: [['12:00', '15:00'], ['19:00', '23:00']],
    4: [['12:00', '15:00'], ['19:00', '23:00']],
    5: [['12:00', '16:00'], ['19:00', '23:30']],
    6: [['12:00', '16:00'], ['19:00', '23:30']]
  },
  slotMinutes: 30,   // intervalo entre horários de reserva
  maxParty: 10       // acima disso, o cliente é orientado a falar no WhatsApp
};
