import mitt from 'mitt'

type Events = {
  // тип ключа глобального события любая строка а отправлять можно толко дом элементы
  // это нужно для плавного скролла
  [key: string]: Element
  // setRefAboutMe: Element,
  // setRefSkills: Element,
  // setRefCertificates: Element,
  // setRefReviews: Element,
  // setRefPortfolio: Element,
  // setRefContact: Element
};

const emitter = mitt<Events>() // inferred as Emitter<Events>

export default emitter

// примеры выполнения
// emitter.on('setRefAboutMe', (e) => {}); // 'e' has inferred type 'string'
//
// emitter.emit('setRefAboutMe', Element); // Error: Argument of type 'number' is not assignable to parameter of type 'string'. (2345)
