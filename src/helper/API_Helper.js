import { getAllUsers_API, getEventType_API, getQualification_API } from "../api_services/Apiservices";

export const get_qualification_op = async (setLoder) => {
    const resp = await getQualification_API();
    if (resp) {
        let findata = resp.data;
        findata = findata.filter((e) => e.status === "Active");
        const mydata = findata.map(e => ({ name: e.name, value: e._id }));
        return mydata
    }
}


export const event_type_option = async (setLoder) => {
    const resp = await getEventType_API();
    if (resp && resp.success) {
        setLoder(false);
        const fdata = resp.data;
        const mydata = fdata.map(e => ({ name: e.event_name, value: e._id }));
        return mydata;
    }
}


export const multiSelectUsersOption = async (setLoder) => {
    const resp = await getAllUsers_API();
    if (resp && resp.success) {
        setLoder(false);
        const f_data = resp.data;
        const op_data = f_data.map(e => ({ label: e.last_name + " " + e.first_name, value: e._id }));
        return op_data;
    }
}

