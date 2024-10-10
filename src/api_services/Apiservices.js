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
                const my_image = urdata.image || "";
                localStorage.setItem('proimage', my_image);
                localStorage.setItem('userData', JSON.stringify(urdata));
                localStorage.setItem('Authorization', "Bearer " + tokwn);
                localStorage.setItem('id', myid);
                localStorage.setItem('type', ur_type);
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

export const account_Access_API = async (data) => {
    try {
        const resp = await http.post("/access_account", data);
        if (resp) {
            if (resp && resp.data && resp.data.data) {
                const ur_type = resp.data.data.user_type_id;
                const urdata = resp.data.data;
                const myid = resp.data.data._id;
                const tokwn = resp.data.data.token;
                const my_image = urdata.image || "";
                localStorage.setItem('proimage', my_image);
                localStorage.setItem('userData', JSON.stringify(urdata));
                localStorage.setItem('Authorization', "Bearer " + tokwn);
                localStorage.setItem('id', myid);
                localStorage.setItem('type', ur_type);
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

export const update_plan_api = async (data) => {
    try {
        const resp = await http.post("/update_plan", data);
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

export const createPosition_API = async (data) => {
    try {
        const resp = await http.post("/createPosition", data);
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

export const getPosition_API = async () => {
    try {
        const resp = await http.get("/getPosition");
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

export const getEventType_API = async () => {
    try {
        const resp = await http.get("/getEventType");
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


export const updatePosition_API = async (data) => {
    try {
        const resp = await http.post("/updatePosition", data);
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


export const createQtype_API = async (data) => {
    try {
        const resp = await http.post("/createQtype", data);
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

export const sendMessage_API = async (data) => {
    try {
        const resp = await http.post("/sendMessage", data);
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


export const getQtype_API = async () => {
    try {
        const resp = await http.get("/getQtype");
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

export const getMessage_API = async () => {
    try {
        const resp = await http.get("/getMessage");
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            // errorAlert(error.response.data.message);
        } else {
            errorAlert(error.response);
        }

    }
}


export const updateQtype_API = async (data = "") => {
    try {
        const resp = await http.post("/updateQtype", data);
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

export const getAccount_API = async (page = "") => {
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

export const getSupervisor_API = async () => {
    try {
        const resp = await http.get("/getSupervisor");
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            // errorAlert(error.response.data.message);
        } else {
            errorAlert(error.response);
        }

    }
}


export const gearUsersList_API = async (id = '') => {
    try {
        const resp = await http.get(`/gearUsersList?id=${id}`);
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            // errorAlert(error.response.data.message);
        } else {
            errorAlert(error.response);
        }

    }
}

export const getAllUsers_API = async () => {
    try {
        const resp = await http.get("/getAllUsers");
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        }
    } catch (error) {
        console.log(error.response);
    }
}

export const getAttendees_API = async (id = "", order = "") => {
    try {
        const resp = await http.get(`/getAttendees?id=${id}&order=${order}`);
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        }
    } catch (error) {
        console.log(error);
    }
}


export const getUserAccountById_API = async (id = "") => {
    try {
        const resp = await http.get(`/getUserAccountById?myId=${id}`);
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const getUserByGroup_API = async (grpid) => {
    try {
        const resp = await http.post("/getUserByGroup", { data: grpid });
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            // errorAlert(error.response.data.message);
        } else {
            errorAlert(error.response);
        }

    }
}

export const addUsersEvent_API = async (data) => {
    try {
        const resp = await http.post("/addUsersEvent", data);
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

export const updateEventStatus_API = async (data) => {
    try {
        const resp = await http.post("/updateEventStatus", data);
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


export const multiUpdateEventStatus_API = async (data) => {
    try {
        const resp = await http.post("/multiUpdateEventStatus", data);
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


export const deleteEventUsers_API = async (data) => {
    try {
        const resp = await http.post("/deleteEventUsers", data);
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

export const resetPassword_API = async (data) => {
    try {
        const resp = await http.post("/resetPassword", data);
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


export const updateGrpname_API = async (data) => {
    try {
        const resp = await http.post("/updateGrpname", data);
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

export const groupUpdate_API = async (data) => {
    try {
        const resp = await http.post("/updateGroup", data);
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

export const grpUsersDelete_API = async (data) => {
    try {
        const resp = await http.post("/grpUsersDelete", data);
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

export const getGroups_API = async (page = "") => {
    try {
        const resp = await http.get("/getGroups", { params: page });
        
        if (resp && resp.data && resp.data.success) {
            console.log(resp.data);
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

export const getUserByGroupId_API = async (data) => {
    try {
        const resp = await http.post("/getUserByGroupId", data);
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            // errorAlert(error.response.data.message);
        } else {
            errorAlert(error.response);
        }

    }
}

export const addGroupUser_API = async (data) => {
    try {
        const resp = await http.post("/addGroupUser", data);
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

export const createGroup_API = async (data) => {
    try {
        const resp = await http.post("/createGroup", data);
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        } else {
            console.log(resp.data);
            errorAlert(resp.data.message);
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            // errorAlert(error.response.data.message);
        } else {
            errorAlert(error.response);
        }

    }
}

export const assignGroupUser_API = async (data) => {
    try {
        const resp = await http.post("/assignGroupUser", data);
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        } else {
            console.log(resp.data);
            errorAlert(resp.data.message);
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            // errorAlert(error.response.data.message);
        } else {
            errorAlert(error.response);
        }

    }
}

export const unavailableUsers_API = async (page) => {
    try {
        const resp = await http.get("/unavailableUsers", { params: page });
        if (resp && resp.data && resp.data.success) {
            return resp.data;
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            // errorAlert(error.response.data.message);
        } else {
            errorAlert(error.response);
        }

    }
}

export const getAccount_by_id_API = async (data) => {
    try {
        const resp = await http.post("/getAccountByID", data);
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

export const getTraningById_API = async (data) => {
    try {
        const resp = await http.get("/getTraningByID", { params: data });
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

export const getTrainingByUserID_API = async (id = "") => {
    try {
        const resp = await http.get(`/getTraningByUserID?id=${id}`);
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



export const getAllTrane_API = async () => {
    try {
        const resp = await http.get(`/getAllTrane`);
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
        const resp = await http.post("/updateTraning", data);
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

export const createGearAndApparatusType_API = async (data) => {
    try {
        const resp = await http.post("/createGearAndApparatusType", data);
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

export const getGearAndApparatusType_API = async () => {
    try {
        const resp = await http.get("/getGearAndApparatusType");
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
        const resp = await http.post("/updateGearType", data);
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

export const updateGearAndApparatusType_API = async (data) => {
    try {
        const resp = await http.post("/updateGearAndApparatusType", data);
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
export const getGear_API = async (order = "") => {
    try {
        const resp = await http.get(`/getGear?order=${order}`);
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

export const getGearById_API = async (id = "") => {
    try {
        const resp = await http.get(`/getGearById?id=${id}`);
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

export const getUserGearByGearId_API = async (id = "") => {
    try {
        const resp = await http.get(`/getUserGearByGearId?id=${id}`);
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

export const getApparatusById_API = async (id = "") => {
    try {
        const resp = await http.get(`/getApparatusById?id=${id}`);
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
        const resp = await http.post("/updateGear", data);
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

export const AddNewTrackingInformation_API = async (data) => {
    try {
        const resp = await http.post("/newTrackingInformation", data);
        if (resp) {
            console.log(resp);
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


export const addNewFieldAPI = async (data) => {
    try {
        const resp = await http.post("/addNewField_API", data);
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

export const addNewDropdownValue_API = async (data) => {
    try {
        const resp = await http.post("/addNewDropdownValue", data);
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


export const deleteCustom_API = async (data) => {
    try {
        const resp = await http.post("/deleteCustom", data);
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

export const updateOneCustom_API = async (data) => {
    try {
        const resp = await http.post("/updateOneCustom", data);
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

export const dropdownUpdate_API = async (data) => {
    try {
        const resp = await http.post("/dropdownUpdate", data);
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

export const getApparatus_API = async (data = "") => {
    try {
        const resp = await http.get(`/getApparatus?order=${data}`);
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


export const getTrackingInformation_API = async (data = "") => {
    try {
        const resp = await http.get(`/getTrackingInformation?AP_Id=${data}`);
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

export const getAddNewField_API = async (data = "") => {
    try {
        const resp = await http.get(`/getAddNewField?formName=${data}`);
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
        const resp = await http.post("/updateApparatus", data);
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

export const createMultiUserGear_API = async (data) => {
    try {
        const resp = await http.post("/createMultiUserGear", data);
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
        const resp = await http.post("/getUserGear", id);
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
        const resp = await http.post("/updateUserGear", data);
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

export const multiUpdateUserGear_API = async (data) => {
    try {
        const resp = await http.post("/multiUpdateUserGear", data);
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


export const multiUpdateUserQualification_API = async (data) => {
    try {
        const resp = await http.post("/multiUpdateUserQualification", data);
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
        const resp = await http.post("/deleteUserGear", data);
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
        const resp = await http.post("/getSubscriptonData", id);
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
        const resp = await http.post("/updateQualification", data);
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

export const updateUserQualifiaction_API = async (data) => {
    try {
        const resp = await http.post("/updateUserQualifiaction", data);
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
        const resp = await http.post("/getUserQualifiaction", id);
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


export const deleteQualification_API = async (data) => {
    try {
        const resp = await http.post("/deleteQualification", data);
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

export const deleteUserQualification_API = async (data) => {
    try {
        const resp = await http.post("/deleteUserQualification", data);
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