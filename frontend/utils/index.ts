
export const generateHelpText = (typeItem: string | ''): string => {
  switch (typeItem) {
    case 'eventName':
      return 'сюда пишем название секции куда будем скролить на английском'
    case 'pageItem':
      return 'сюда пишем название страницы куда будем переходить'
    case 'absolutLink':
      return 'сюда пишем абсолютную ссылку для перезода на сторонную страницу'
    default:
      return 'сюда пишем название секции куда будем скролить на английском'
  }
}
