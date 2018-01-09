const mainReducer = (state = {
    isLogged : 'false',
    userName : '',
    check: '',
    defaultEmployee: '',
    tabnerEmployees: [],
    tabnerVendors: [],
    tabnerClients: [],
}, action) => {
    switch (action.type) {
        case "LOGIN":
            state = {
                ...state,
                isLogged: action.payload
            };
            break;
        case "LOGOUT":
            state = {
                ...state,
                isLogged: action.payload
            };
            break;
        case "USER":
            state = {
                ...state,
                userName: action.payload
            };
            break;
        case "CHECK":
            state = {
                ...state,
                check: action.payload
            };
            break;
        case "TABNER_EMPLOYEES":
            state = {
                ...state,
                tabnerEmployees: action.payload
            };
            break;
        case "DEFAULT_EMPLOYEE":
            state = {
                ...state,
                defaultEmployee: action.payload
            };
            break;
        case "TABNER_VENDORS":
            state = {
                ...state,
                tabnerVendors: action.payload
            };
            break;
        case "TABNER_CLIENTS":
            state = {
                ...state,
                tabnerClients: action.payload
            };
            break;
        case "DELETE_CLIENT":
            var updatedClients = state.tabnerClients.slice();
            updatedClients.splice(action.payload, 1);
            state = {
                ...state,
                tabnerClients : updatedClients
            };
            break;
        case "DELETE_VENDOR":
            var updatedVendors = state.tabnerVendors.slice();
            updatedVendors.splice(action.payload, 1);
            state = {
                ...state,
                tabnerVendors: updatedVendors
            };
            break;

    }
    return state;
};

export default mainReducer;