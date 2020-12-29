import { combineReducers } from 'redux';
import { login } from './modules/signIn/signInReducer';
import { pushLogout } from './modules/signIn/signInActions';
import { register } from './modules/signUp/signUpReducer';
import { photoApi } from './modules/photoPixabay/photoReducer';
import { photoActions } from './modules/photoActions/photoActionsReducer';
import { usersKeywords } from './modules/Keywords/KeywordsReducers';

/* Unite all reducers */
const rootReducer = combineReducers({
  login,
  register,
  photoApi,
  photoActions,
  usersKeywords,
});

export default (state, action) => {
  if (action.type === pushLogout.TRIGGER) {
    state = undefined;
  }

  return rootReducer(state, action);
};
