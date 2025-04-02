'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let object = { ...state };
  const record = [];

  actions.forEach((action) => {
    switch (action.type) {
      case 'addProperties':
        object = { ...object, ...action.extraData };
        break;

      case 'removeProperties':
        object = Object.fromEntries(
          Object.entries(object).filter(
            ([key]) => !action.keysToRemove.includes(key),
          ),
        );
        break;

      case 'clear':
        object = {};
        break;

      default:
        break;
    }

    record.push({ ...object });
  });

  return record;
}

module.exports = transformStateWithClones;
