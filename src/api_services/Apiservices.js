import { errorAlert } from "../components/Alert";
import http from "../http"


export const login_API = async (data) => {
    try {
        const resp = await http.post("/login", data);
        if (resp) {
            if (resp && resp.data && resp.data.data) {
                const ur_type = resp.data.data.user_type_id;
                const urdata = resp.data.data;
                const myid = resp.data.data._id;
                const tokwn = resp.data.data.token;
                localStorage.setItem('userData',JSON.stringify(urdata));
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



export const update_actice_inactive_API = async (data) => {
    try {
        const resp = await http.post("/activeInActive", data);
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

export const updateRoll_API = async (data) => {
    try {
        const resp = await http.post("/updateRoll", data);
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

export const deleteRoll_API = async (data) => {
    try {
        const resp = await http.post("/deleteRoll", data);
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

export const getRolls_API = async (page) => {
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

export const getRollsAll_API = async () => {
    try {
        const resp = await http.get("/getRollsAll");
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


export const createTraning_API = async (data) => {
    try {
        const resp = await http.post("/createTraning", data);
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


export const getTraningAll_API = async () => {
    try {
        const resp = await http.get("/getTraning");
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

export const updateTraning_API = async (data) => {
    try {
        const resp = await http.post("/updateTraning",data);
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



export const createGearType_API = async (data) => {
    try {
        const resp = await http.post("/createGearType", data);
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


export const getGearType_API = async () => {
    try {
        const resp = await http.get("/getGearType");
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

export const updateGearType_API = async (data) => {
    try {
        const resp = await http.post("/updateGearType",data);
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



export const createGear_API = async (data) => {
    try {
        const resp = await http.post("/createGear", data);
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
export const getGear_API = async () => {
    try {
        const resp = await http.get("/getGear");
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
export const updateGear_API = async (data) => {
    try {
        const resp = await http.post("/updateGear",data);
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


export const createApparatus_API = async (data) => {
    try {
        const resp = await http.post("/createApparatus", data);
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
export const getApparatus_API = async () => {
    try {
        const resp = await http.get("/getApparatus");
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
export const updateApparatus_API = async (data) => {
    try {
        const resp = await http.post("/updateApparatus",data);
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


export const createUserGear_API = async (data) => {
    try {
        const resp = await http.post("/createUserGear", data);
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
export const getUserGear_API = async (id) => {
    try {
        const resp = await http.post("/getUserGear",id);
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
export const updateUserGear_API = async (data) => {
    try {
        const resp = await http.post("/updateUserGear",data);
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

export const deleteUserGear_API = async (data) => {
    try {
        const resp = await http.post("/deleteUserGear",data);
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


export const getSubscriptonData_API = async (id) => {
    try {
        const resp = await http.post("/getSubscriptonData",id);
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



export const createQualification_API = async (data) => {
    try {
        const resp = await http.post("/createQualification", data);
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
export const getQualification_API = async () => {
    try {
        const resp = await http.get("/getQualification");
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
export const updateQualification_API = async (data) => {
    try {
        const resp = await http.post("/updateQualification",data);
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

export const createUserQualification_API = async (data) => {
    try {
        const resp = await http.post("/createUserQualifiaction", data);
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
export const getUserQualification_API = async (id) => {
    try {
        const resp = await http.post("/getUserQualifiaction",id);
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


export const deleteQualification_API = async (data) =>{
    try {
        const resp = await http.post("/deleteQualification",data);
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

export const deleteUserQualification_API = async (data) =>{
    try {
        const resp = await http.post("/deleteUserQualification",data);
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