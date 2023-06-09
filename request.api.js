import axios from 'axios'

export const RequestApi = {
    getSickRequests: async () => {
        return await axios.get('http://localhost:4500/getSickRequests',
        )
            .then(response => response.data)
            .catch(error => error.response.data)
    },
    setRequest: async (createemail, policytype, RequestFrom, RequestTo, Description, status) => {
        return await axios.post('http://localhost:4500/setRequest', {
            createemail, policytype, RequestFrom, RequestTo, Description, status
        })
            .catch(error => error.response.data)
    },
    editRequest: async (id, status) => {
        return await axios.post('http://localhost:4500/editRequest', {
            id, status
        })
            .catch(error => error.response.data)
    }
}