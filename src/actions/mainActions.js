export function login() {
    return {
        type: "LOGIN",
        payload: 'true'
    };
}

export function logout() {
    return {
        type: "LOGOUT",
        payload: 'false'
    };
}

export function setUser(name) {
    return {
        type: "USER",
        payload: name
    };

}

export function setCheck(name) {
    return {
        type: "CHECK",
        payload: name
    };

}

export function setTabnerEmployees(employees) {
    return {
        type: "TABNER_EMPLOYEES",
        payload: employees
    };

}

export function setDefaultEmployee(employee) {
    return {
        type: "DEFAULT_EMPLOYEE",
        payload: employee
    };

}

export function setTabnerVendors(vendors) {
    return {
        type: "TABNER_VENDORS",
        payload: vendors
    };

}

export function setDefaultVendor(vendor) {
    return {
        type: "DEFAULT_VENDOR",
        payload: vendor
    };

}


export function setTabnerClients(clients) {
    return {
        type: "TABNER_CLIENTS",
        payload: clients
    };

}

export function setDefaultClient(client) {
    return {
        type: "DEFAULT_CLIENT",
        payload: client
    };

}


export function deleteClient(index) {
    return {
        type: "DELETE_CLIENT",
        payload: index
    };

}

export function deleteVendor(index) {
    return {
        type: "DELETE_VENDOR",
        payload: index
    };
}
