import axios from 'axios'

export const MeetingsApi = {
    getMeetings: async () => {
        return await axios.get('http://localhost:4500/getMeetings',
        )
            .then(response => response.data)
            .catch(error => error.response.data)
    },
    addMeeting: async (email, title, description, date, participants, link) => {
        return await axios.post('http://localhost:4500/addMeeting', {
            email, title, description, date, participants, link
        })
            .catch(error => error.response.data)
    }
}