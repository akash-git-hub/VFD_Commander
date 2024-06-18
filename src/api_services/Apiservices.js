import { errorAlert } from "../components/Alert";
import http from "../http"


export const login_API = async (data) => {
    try {
        const resp = await http.post("/login", data);
        if (resp) {
            if (resp && resp.data && resp.data.data) {
                const ur_type = resp.data.data.user_type_id;
                const myid = resp.data.data.id;
                const tokwn = resp.data.data.token;
                localStorage.setItem('Authorization', "Bearer " + tokwn);
                localStorage.setItem('id', myid);
                localStorage.setItem('type',ur_type);
            }
            return resp.data;
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            errorAlert(error.response.data.message);
        } else {
            errorAlert(error.response);
        }
    }
}

export const create_plan_api = async (data) => {
    try {
        const resp = await http.post("/createSubscriptionPlan", data);
        if (resp) {
            return resp.data;
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            errorAlert(error.response.data.message);
        } else {
            errorAlert(error.response);
        }
    }
}

export const create_modal_account_api = async (data) => {
    try {
        const resp = await http.post("/createAccount", data);
        if (resp) {
            return resp.data;
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            errorAlert(error.response.data.message);
        } else {
            errorAlert(error.response);
        }
    }
}

export const update_modal_account_api = async (data) => {
    try {
        const resp = await http.post("/updateAccount", data);
        if (resp) {
            return resp.data;
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            errorAlert(error.response.data.message);
        } else {
            errorAlert(error.response);
        }
    }
}



export const getAccount_API = async (page) => {
    try {
        const resp = await http.get("/getAccount", { params: page });
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            errorAlert(error.response.data.message);
        } else {
            errorAlert(error.response);
        }

    }
}

export const getAccount_by_id_API = async (data) => {
    try {
        const resp = await http.post("/getAccountByID",data);
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            errorAlert(error.response.data.message);
        } else {
            errorAlert(error.response);
        }

    }
}

export const getSubscriptionPlan_api = async () => {
    try {
        const resp = await http.get("/getSubscriptionPlan");
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            errorAlert(error.response.data.message);
        } else {
            errorAlert(error.response);
        }

    }
}




export const create_rolls = async (data) => {
    try {
        const resp = await http.post("/createRoll", data);
        if (resp) {
            return resp.data;
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            errorAlert(error.response.data.message);
        } else {
            errorAlert(error.response);
        }
    }
}

export const getRolls = async (page) => {
    try {
        const resp = await http.get("/getRolls", { params: page });
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            errorAlert(error.response.data.message);
        } else {
            errorAlert(error.response);
        }

    }
}
