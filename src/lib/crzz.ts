import axios from 'axios';

const CRZZ_HOST = "http://localhost:4000";

class Crzz {

    constructor(private token: string | undefined) {
        this.token = token
    }

    logged_in() {
        if (this.token === undefined) {
            return false;
        }
        return true;
    }

    async login(username: string, password: string) {
        const data = {"email": username, "password": password}
        console.log(data)
        return axios.post(
            CRZZ_HOST + "/api/token",
            data
        ).then(function(resp) {
            console.log(resp)
        })


    }

    events() {
        const events_data = axios.get(
            CRZZ_HOST + "/api/events",
            {
                headers: {"Authorization": "Bearer " + this.token}
            }
        )
    }
}

export default Crzz;
