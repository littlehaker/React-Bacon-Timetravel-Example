function filterAction(action_type) {
    return function(action) {
        return action.type === action_type;
    };
}

module.exports.filterAction = filterAction;
