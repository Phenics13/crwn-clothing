import { all, call } from 'redux-saga/effects';

import { categoriesSaga } from './categories/category.saga';
import { userSagas } from './user/user.saga';
import { wishlistSagas } from './wishlist/wishlist.saga';

export function* rootSaga() {
  yield all([
    call(categoriesSaga), 
    call(userSagas),
    call(wishlistSagas),
  ]);
}

