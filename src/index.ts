import { renderSearchFormBlock } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { renderUserBlock } from './user.js'
import { renderToast } from './lib.js'

window.addEventListener('DOMContentLoaded', () => {
  localStorage.setItem('user', JSON.stringify({username: 'qweqwe', avatarUrl: "https://i.pinimg.com/originals/d5/63/fe/d563fe87d9dcc15c54f51a68c2c40076.jpg", favoritesAmount: '12'}));
  renderUserBlock()
  renderSearchFormBlock()
  renderSearchStubBlock()
  renderToast(
    {text: 'Это пример уведомления. Используйте его при необходимости', type: 'success'},
    {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
  )
})
