import { renderBlock } from './lib.js';
import { User, Place } from './interfaces.js'

export function renderUserBlock() {
  const user = getUserData();

  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src="${user.avatarUrl}" alt="Wade Warren" />
      <div class="info">
          <p class="name">${user.username}</p>
          <p class="fav">
            <i class="heart-icon${getFavoritesAmount() ? ' active' : ''}"></i>${getFavoritesAmount()}
          </p>
      </div>
    </div>
    `
  );
}

function getUserData(): User {
  const localStorageUser: User = JSON.parse(localStorage.getItem('user'));

  let user;
  
  if (localStorageUser)
    user = {
      username: localStorageUser.username,
      avatarUrl: localStorageUser.avatarUrl ? localStorageUser.avatarUrl : '/img/avatar.png',
    }
  else {
    user = {
      username: 'no user',
      avatarUrl: '/img/avatar.png',
    }
  }

  return user;
}

export function getFavoritesAmount () {
  const favorites = getFavorites()

  return favorites.length
}

function getFavorites(): Pick<Place, 'id' | 'image' | 'name'>[] { 
  const favoriteItems: unknown = JSON.parse(localStorage.getItem('favoriteItems'))

  if (!Array.isArray(favoriteItems) || favoriteItems.length === 0) {
    return []
  } 

  return favoriteItems
}

export function toggleFavorites(favPlace: Pick<Place, 'id' | 'image' | 'name'>): void { 
  const favorites = getFavorites()

  const filteredFavorites = favorites.filter((fav: Pick<Place, 'id' | 'image' | 'name'>) => fav.id !== favPlace.id)

  filteredFavorites.length === favorites.length ? 
    localStorage.setItem('favoriteItems', JSON.stringify([...favorites, favPlace])) : 
    localStorage.setItem('favoriteItems', JSON.stringify(filteredFavorites))
}

export function isFavorite(placeId: string): boolean { 
  const favorites = getFavorites()

  return favorites.find((fav: Pick<Place, 'id' | 'image' | 'name'>) => fav.id === placeId) ? true : false
}