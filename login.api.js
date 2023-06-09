import axios from 'axios'

export const LoginApi = {
    getUser: async (email) => {
        return await axios.post('http://localhost:4500/check/user', {
            email: email
        })
            .then(response => response.data)
            .catch(error => error.response.data)
    },
    getUsers: async () => {
        return await axios.get('http://localhost:4500/getUsers',
        )
            .then(response => response.data)
            .catch(error => error.response.data)
    },
    setNewUser: async (fullname, emailAddress, password, post, phone, role) => {
        return await axios.post('http://localhost:4500/new', {
            fullname: fullname,
            email: emailAddress,
            password: password,
            post: post,
            phone: phone,
            role
        })
            .catch(error => error.response.data)
    }
}