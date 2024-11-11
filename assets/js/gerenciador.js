// Função para redirecionar para a página apropriada ao clicar no slide, com verificação da existência do slide
function setupCarouselNavigation() {
  const slides = document.querySelectorAll('.swiper-slide');
  if (slides.length === 0) {
      console.warn("Nenhum slide encontrado para configuração de navegação.");
      return;
  }

  slides.forEach(slide => {
      slide.addEventListener('click', () => {
          const link = slide.getAttribute('data-link');
          if (link) {
              window.location.href = link;
          }
      });
  });
}

// Função para buscar e atualizar a quantidade de itens de cada API
async function fetchDataAndUpdateCards() {
  try {
      const endpoints = {
          membros: 'http://localhost:3000/api/getMembros',
          noticias: 'http://localhost:3000/api/getNoticias',
          projetos: 'http://localhost:3000/api/getProjects',
          laboratorios: 'http://localhost:3000/api/getLaboratorios'
      };

      // Fetch dos dados em paralelo
      const [membrosRes, noticiasRes, projetosRes, laboratoriosRes] = await Promise.all([
          fetch(endpoints.membros),
          fetch(endpoints.noticias),
          fetch(endpoints.projetos),
          fetch(endpoints.laboratorios)
      ]);

      // Verifica se todas as requisições foram bem-sucedidas
      if (!membrosRes.ok) throw new Error('Erro ao obter dados dos membros.');
      if (!noticiasRes.ok) throw new Error('Erro ao obter dados das notícias.');
      if (!projetosRes.ok) throw new Error('Erro ao obter dados dos projetos.');
      if (!laboratoriosRes.ok) throw new Error('Erro ao obter dados dos laboratórios.');

      // Conversão para JSON
      const [membrosData, noticiasData, projetosData, laboratoriosData] = await Promise.all([
          membrosRes.json(),
          noticiasRes.json(),
          projetosRes.json(),
          laboratoriosRes.json()
      ]);

      // Função auxiliar para verificar a existência do elemento e atualizar o conteúdo
      function updateElementTextById(elementId, text) {
          const element = document.getElementById(elementId);
          if (element) {
              element.innerText = text;
          } else {
              console.warn(`Elemento com ID "${elementId}" não encontrado.`);
          }
      }

      // Atualização dos contadores nos cards
      updateElementTextById('membrosCount', membrosData.message.length);
      updateElementTextById('noticiasCount', noticiasData.message.length);
      updateElementTextById('projetosCount', projetosData.message.length);
      updateElementTextById('laboratoriosCount', laboratoriosData.message.length);

  } catch (error) {
      console.error('Erro ao carregar dados:', error);
  }
}

// Chamada das funções ao carregar a página
if (window.location.pathname === "/gerenciador/") {
  setupCarouselNavigation();
  fetchDataAndUpdateCards();
}
