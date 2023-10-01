import axios from "axios";
import {API_URL} from "../static/constans";

const getProjectInfo = () => {
    return axios.get(`${API_URL}/init`);
}

const getProjectById = (id: string) => {
    return axios.get(`${API_URL}/project/${id}`);
}

export { getProjectInfo, getProjectById }
