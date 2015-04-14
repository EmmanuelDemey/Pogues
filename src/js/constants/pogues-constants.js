module.exports = {

  ActionTypes: {
    LOAD_QUESTIONNAIRE_LIST: 'LOAD_QUESTIONNAIRE_LIST',
    QUESTIONNAIRE_LIST_LOADED: 'QUESTIONNAIRE_LIST_LOADED',
    QUESTIONNAIRE_LIST_LOADING_FAILED: 'QUESTIONNAIRE_LIST_LOADING_FAILED',
    SELECT_EXISTING_QUESTIONNAIRE: 'SELECT_EXISTING_QUESTIONNAIRE',
    LOAD_QUESTIONNAIRE: 'LOAD_QUESTIONNAIRE',
    QUESTIONNAIRE_LOADED: 'QUESTIONNAIRE_LOADED',
    QUESTIONNAIRE_LOADING_FAILED: 'QUESTIONNAIRE_LOADING_FAILED',
    CREATE_NEW_QUESTIONNAIRE: 'CREATE_NEW_QUESTIONNAIRE',
    ADD_COMPONENT: 'ADD_COMPONENT',
    DELETE_SEQUENCE: 'DELETE_SEQUENCE',
    ADD_QUESTION: 'ADD_QUESTION',
    DELETE_QUESTION: 'DELETE_QUESTION',
    EDIT_COMPONENT : 'EDIT_COMPONENT',
    FILTER_COMPONENTS : 'FILTER_COMPONENTS',
    FILTER_QUESTIONNAIRES: 'FILTER_QUESTIONNAIRES',
    LANGUAGE_CHANGED: 'LANGUAGE_CHANGED',
    SAVE_QUESTIONNAIRE : 'SAVE_QUESTIONNAIRE',
    SWITCH_VIEW_QUESTIONNAIRE: 'SWITCH_VIEW_QUESTIONNAIRE',
    SWITCH_VIEW_PICKER: 'SWITCH_VIEW_PICKER'
  },
  PayloadSources: {
    SERVER_SOURCE: 'SERVER_SOURCE',
    VIEW_SOURCE: 'VIEW_SOURCE'
  },
  StoreEvents: {
    CHANGE_EVENT: 'CHANGE_EVENT'
  },
  General: {
    ENTER_KEY_CODE: 13
  },
  ViewTypes: {
    'PICKER': 'PICKER',
    'QUESTIONNAIRE': 'QUESTIONNAIRE'
  }
};
