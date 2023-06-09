import { useState, useEffect } from "react";
import { Modal, Button, Select, DatePicker, Space,Input, Typography } from "antd";
import {RequestApi} from "./api/request.api";
import {MeetingsApi} from "./api/meetings.api";
import {LoginApi} from "./api/login.api";
const { TextArea } = Input;

function Meetings({userData}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [meetings, setMeetings] = useState([])
    const [users, setUsers]= useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState({})
    const [participants, setParticipants] = useState([])
    const [link, setLink] = useState('')

    const getMeetings = async () => {
        const meetings = await MeetingsApi.getMeetings()
        setMeetings(meetings.data.filter((item) => item.participants.includes(userData.email) || item.email === userData.email))
    }

    function format(inputDate) {
        let date, month, year, hours, min;

        date = inputDate.getDate();
        month = inputDate.getMonth() + 1;
        year = inputDate.getFullYear();

        hours = inputDate.getHours()
        min = inputDate.getMinutes()

        hours = hours
            .toString()
            .padStart(2, '0')

        min = min
            .toString()
            .padStart(2, '0')

        date = date
            .toString()
            .padStart(2, '0');

        month = month
            .toString()
            .padStart(2, '0');

        return `${date}/${month}/${year} ${hours}:${min}`;
    }

    const getUsers = async () => {
        const result = await LoginApi.getUsers()
        setUsers(result.data)
    }

    useEffect(() => {
        getMeetings()
        getUsers()
    },[])

    return (
        <>

            <div style={{width: '1500px'}}>
                <div className="row" >
                    <div className="col-xs-6" >
                        <Button onClick={() => {window.open("https://calendar.google.com/calendar/", "_blank");}} style={{position: 'absolute', top: '15%', right: '4.7%'}}>Connect to Google Calendar</Button>
                        <div className="table-responsive" data-pattern="priority-columns" >
                            <table
                                className="table table-bordered table-hover" >
                                <thead>
                                <tr>
                                    <th data-priority="1">Title</th>
                                    <th data-priority="2">Description</th>
                                    <th data-priority="3">Date</th>
                                    <th data-priority="4">Participants</th>
                                    <th data-priority="5">Link</th>
                                </tr>
                                </thead>
                                <tbody>
                                {meetings.sort((a,b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0 ).map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.title }</td>
                                            <td>{item.description}</td>
                                            <td>{item.date}</td>
                                            <td>{JSON.parse(item.participants).join(', ')}</td>
                                            <td>{item.link}</td>
                                        </tr>)
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-xs-6"  >
                        <Space direction="vertical" size={12} style={{width: '60%', margin: '2%'}}>
                            <Typography style={{color: "white"}}>Title</Typography>
                            <Input onChange={(item) => {setTitle(item.target.value)}}/>
                            <Typography style={{color: "white"}}>Description</Typography>
                            <TextArea rows={2} onChange={(value) => setDescription(value.target.value)} placeholder="Description"/>
                            <Typography style={{color: "white"}}>Date</Typography>
                            <DatePicker showTime onChange={(value) => {setDate(value)}} />
                            <Typography style={{color: "white"}}>Participants</Typography>
                            <Select
                                showSearch
                                placeholder="Select participants"
                                mode="multiple"
                                title={'Policy'}
                                style={{width: '61%'}}
                                onChange={(value, option) => setParticipants(value)}
                                options={users.map((user)=>  { return {value: user.email, label: user.fullname}})}
                            />
                            <Typography style={{color: "white"}}>Link</Typography>
                            <Input onChange={(item) => {setLink(item.target.value)}}/>
                            <Button onClick={async () => { await MeetingsApi.addMeeting(userData.email, title, description, format(new Date(date)), JSON.stringify(participants), link); await getMeetings()}}>Submit</Button>
                        </Space>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Meetings;
