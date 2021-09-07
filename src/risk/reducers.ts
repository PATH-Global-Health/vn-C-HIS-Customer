import { combineReducers } from '@reduxjs/toolkit';

import risk from './QuestionTemplate/question-template.slice';
import surveySession from './SurveySession/survey-session.slice';

export default combineReducers({
  surveySession,
  risk,
});
