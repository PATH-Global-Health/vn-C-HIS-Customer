import { combineReducers } from '@reduxjs/toolkit';

import profile from './profile/profile.slice';
import securityQuestion from './security-question/security-question.slice';

export default combineReducers({
  profile,
  securityQuestion
});
