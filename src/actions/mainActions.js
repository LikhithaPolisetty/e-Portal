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