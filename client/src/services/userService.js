import { apiCall } from "./utils";

const uri = "users";

const changeProfile = async (id, formData) => {
    const data = {
        firstName: formData?.firstName,
        lastName: formData?.lastName,
    };
    const service = `${uri}/${id}`;
    return await apiCall().put(service, data);
};

const changePassword = async (id, formData) => {
    const data = { password: formData?.password };
    const service = `${uri}/${id}`;
    return await apiCall().put(service, data);
};

export default { changeProfile, changePassword };
