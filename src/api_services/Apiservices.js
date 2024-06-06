import { errorAlert } from "../components/Alert";
import http from "../http"


export const login = async (data) => {
    try {
        const resp = await http.post("/login", data);
        if (resp) {
            if (resp && resp.data && resp.data.data) {
                const myid = resp.data.data.id;
                const tokwn = resp.data.data.token;
                localStorage.setItem('Authorization', "Bearer " + tokwn);
                localStorage.setItem('id', myid);
            }
            console.log("------------>------", resp.data.data);
            return resp.data;
        }
    } catch (error) {
        errorAlert(error.response.data.message);
    }




}