import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { errorAlert, successAlert } from '../../components/Alert';
import { account_Access_API } from '../../api_services/Apiservices';
import CryptoJS from 'crypto-js';
import { Loader } from '../../components/Loader';
import { Mycontext } from '../../App';

export default function Access_account() {

    const [loder, setLoder] = useState(false);
    const { contaxtHandler } = useContext(Mycontext);
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(window.location.search);
    const encryptedId = queryParams.get('key');

    const accessHandler = async (key) => {
        if (!key) { errorAlert('Invalid access key'); return; }
        // Decrypt the ID
        const secretKey = 'admin@gmail.com'; // Use the same secret key
        const bytes = CryptoJS.AES.decrypt(key, secretKey);
        const decryptedId = bytes.toString(CryptoJS.enc.Utf8);

        setLoder(true);
        const fdata = { "key": decryptedId, }
        const resp = await account_Access_API(fdata);
        if (resp && resp.success) {
            const data = resp.data;
            contaxtHandler(data);
            setLoder(false);
            successAlert(resp.message);
            const type = data.user_type_id;
            if (parseInt(type) === 1) {
                navigate("/accountmodule", { replace: true });
            } else if (parseInt(type) === 2) {
                navigate("/roleadminstratorlist", { replace: true });
            }
        }
        setLoder(false);
    }
    useEffect(() => {
        if (encryptedId) {
            accessHandler(encryptedId);
        }
    }, [encryptedId])
    return (<Loader show={loder} />)
}
