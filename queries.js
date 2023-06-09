const Pool = require('pg')

const pool = new Pool.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'Warcraft',
    port: 5432
})


const checkUserExist = async (request, response) => {
    const { email } = request.body;
    pool.query(`SELECT * FROM vikaaccounts WHERE email = $1`, [email], (error, results) => {
        if (error) {
            console.log(error)
            return response.status(400).json({ status: 'FAILED', message: 'Error' })
        }
        if (!results.rows.length) {
            return response.status(404).json({ status: 404, message: 'NOT FOUND' })
        }
        return response.status(200).json({ status: 200, message: 'SUCCESS', data: results.rows[0] })
    })
}

const getSickRequests = async (request, response) => {

    response.setHeader('Content-Type', 'application/json');
    pool.query(`SELECT * FROM sickrequests`, (error, results) => {
        if (error) {
            console.log(error)
            return response.status(400).json({ status: 'FAILED', message: 'Error' })
        }
        return response.status(200).json({ status: 200, message: 'SUCCESS', data: results.rows })
    })
}

const setRequest = async (request, response) => {
    const { createemail, policytype, RequestFrom, RequestTo, Description, status } = request.body;

    response.setHeader('Content-Type', 'application/json');

    pool.query(`insert into sickrequests (createemail, policytype, RequestFrom, RequestTo, Description, status) values ($1, $2, $3, $4, $5, $6)`, [createemail, policytype, RequestFrom, RequestTo, Description, status], (error, results) => {
        if (error) {
            console.log(error);
            return response.status(400).json({ status: 'FAILED', message: 'Request add error' })
        }
        return response.status(200).json({ status: 'SUCCESS', message: 'Request added' })
    })
}

const editRequest = async (request, response) => {
    const { id, status } = request.body;

    response.setHeader('Content-Type', 'application/json');

    pool.query(`update sickrequests set status = $1 where id = $2`, [status, id], (error, results) => {
        if (error) {
            console.log(error);
            return response.status(400).json({ status: 'FAILED', message: 'Request edit error' })
        }
        return response.status(200).json({ status: 'SUCCESS', message: 'Request added' })
    })
}

const getUserByEmail = async (email) => {
    return await pool.query('SELECT * FROM vikaaccounts WHERE email = $1', [email]);
}

const setNewUser = async (request, response) => {
    const { email, fullname, password, post, phone, role } = request.body
    const checkIsUserExist = await getUserByEmail(email);

    response.setHeader('Content-Type', 'application/json');

    if (checkIsUserExist && !!checkIsUserExist.rows.length) {
        return response.status(400).json({ status: '400', message: 'User with such credentials already exist' })
    } else {
        pool.query(`insert into vikaaccounts (email, fullname, password, post, phone, role) values ($1, $2, $3, $4, $5, $6)`, [email, fullname, password, post, phone, role], (error, results) => {
            if (error) {
                console.log(error);
                return response.status(400).json({ status: 'FAILED', message: 'User already exist' })
            }
            return response.status(200).json({ status: 'SUCCESS', message: 'User created' })
        })
    }
}

const updateUser = async (request, response) => {
    const { email, fullname, password, post, phone } = request.body

    response.setHeader('Content-Type', 'application/json');

    pool.query(`UPDATE vikaaccounts SET fullname = $2, password = $3, post = $4, phone = $5 WHERE email = $1`, [email, fullname, password, post, phone], (error, results) => {
        if (error) {
            console.log(error);
            return response.status(400).json({ status: 'FAILED', message: 'Something went wrong' });
        }

        return response.status(200).json({ status: 'SUCCESS', message: 'User updated' })
    })
}


const bookPlace = async (request, response) => {
    const { email, place } = request.body;

    response.setHeader('Content-Type', 'application/json');

    pool.query(`insert into places (email, place) values ($1, $2)`, [email, place], (error, results) => {
        if (error) {
            console.log(error);
            return response.status(400).json({ status: 'FAILED', message: 'Place add error' })
        }
        return response.status(200).json({ status: 'SUCCESS', message: 'Place added' })
    })
}

const getBookedPlaces = async (request, response) => {

    response.setHeader('Content-Type', 'application/json');
    pool.query(`SELECT * FROM places`, (error, results) => {
        if (error) {
            console.log(error)
            return response.status(400).json({ status: 'FAILED', message: 'Error' })
        }
        return response.status(200).json({ status: 200, message: 'SUCCESS', data: results.rows })
    })
}

const addMeeting = async (request, response) => {
    const { email, title, description, date, participants, link} = request.body;

    response.setHeader('Content-Type', 'application/json');

    pool.query(`insert into meetings (email, title, description, date, participants, link) values ($1, $2, $3, $4, $5, $6)`, [email, title, description, date, participants, link], (error, results) => {
        if (error) {
            console.log(error);
            return response.status(400).json({ status: 'FAILED', message: 'Meetings add error' })
        }
        return response.status(200).json({ status: 'SUCCESS', message: 'Meetings added' })
    })
}

const getMeetings = async (request, response) => {

    response.setHeader('Content-Type', 'application/json');
    pool.query(`SELECT * FROM meetings`, (error, results) => {
        if (error) {
            console.log(error)
            return response.status(400).json({ status: 'FAILED', message: 'Error' })
        }
        return response.status(200).json({ status: 200, message: 'SUCCESS', data: results.rows })
    })
}

const getUsers = async (request, response) => {

    response.setHeader('Content-Type', 'application/json');
    pool.query(`SELECT * FROM vikaaccounts`, (error, results) => {
        if (error) {
            console.log(error)
            return response.status(400).json({ status: 'FAILED', message: 'Error' })
        }
        return response.status(200).json({ status: 200, message: 'SUCCESS', data: results.rows })
    })
}

module.exports = {
    updateUser,
    setNewUser,
    checkUserExist,
    getSickRequests,
    setRequest,
    editRequest,
    bookPlace,
    getBookedPlaces,
    addMeeting,
    getMeetings,
    getUsers
}