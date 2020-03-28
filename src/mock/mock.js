import fetchMock from "fetch-mock";
import {loginData} from "./data/loginData";

fetchMock.post('/login', loginData, {
    headers: {
        'Content-Type': 'application/json'
    }
});
