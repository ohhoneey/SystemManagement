import axios from 'axios'

export const PlacesApi = {
    getBookedPlaces: async () => {
        return await axios.get('http://localhost:4500/getBookedPlaces',
        )
            .then(response => response.data)
            .catch(error => error.response.data)
    },
    bookPlace: async (email, place) => {
        return await axios.post('http://localhost:4500/bookPlace', {
            email, place
        })
            .catch(error => error.response.data)
    }
}