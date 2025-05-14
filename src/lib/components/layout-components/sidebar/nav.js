export const menuData = [
    {
      menuTitle: 'AUTOR'
    },
    {
      type: 'link',
      title: 'Dashboard',
      icon: 'bx bx-home',
      path: '/autor/dashboard',
      selected: false,
      active: false
    },
    {
      type: 'link',
      title: 'Cadastrar Livro',
      icon: 'bx bx-book-add',
      path: '/books/createrbook'
    },
    {
      type: 'link',
      title: 'Escrita / Edição',
      icon: 'bx bx-edit-alt',
      path: '/books/writerbook'
    },
    {
      type: 'link',
      title: 'Biblioteca de Arquivos',
      icon: 'bx bx-folder',
      path: '/filemanager/librarymanager'
    },
    {
      type: 'link',
      title: 'Minhas Publicações',
      icon: 'bx bx-globe',
      path: '/books/publishingbooks'
    },
    {
      type: 'link',
      title: 'Perfil',
      icon: 'bx bx-user',
      path: '/autor/myperfil'
    },
    {
      menuTitle: 'ADMIN'
    },
    {
      type: 'link',
      title: 'Criar Projeto',
      icon: 'bx bx-pie-chart-alt',
      path: '/project/createproject'
    },
    {
      type: 'link',
      title: 'Dashboard Admin',
      icon: 'bx bx-pie-chart-alt',
      path: '/admin/dashboard'
    },
    {
      type: 'link',
      title: 'Gestão de Usuários',
      icon: 'bx bx-group',
      path: '/admin/usuarios'
    },
    {
      type: 'link',
      title: 'Visualizar Livros',
      icon: 'bx bx-book',
      path: '/admin/livros'
    },
    {
      type: 'link',
      title: 'Logs do Sistema',
      icon: 'bx bx-list-check',
      path: '/admin/logs'
    }
  ];
  
  const MOCK_DATA = {
    menuData
  };
  
  export default MOCK_DATA;
  