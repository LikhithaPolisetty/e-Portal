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

export function setTabnerClients(clients) {
    return {
        type: "TABNER_CLIENTS",
        payload: clients
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

export function setEmployeeRates(employee_rates) {
    return {
        type: "EMPLOYEE_RATES",
        payload: employee_rates
    };

}