const mainReducer = (state = {
    isLogged : 'false',
    userName : '',
    check: '',
    defaultEmployee: '',
    tabnerEmployees: [],
    defaultVendor: '',
    tabnerVendors: [],
    defaultClient: '',
    tabnerClients: []
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
        case "DEFAULT_VENDOR":
            state = {
                ...state,
                defaultVendor: action.payload
            }
        case "TABNER_CLIENTS":
            state = {
                ...state,
                tabnerClients: action.payload
            };
            break;
        case "DEFAULT_CLIENT":
            state = {
                ...state,
                defaultClient: action.payload
            }
    }
    return state;
};

export default mainReducer;