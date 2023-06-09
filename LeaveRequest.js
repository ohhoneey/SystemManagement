import { useState, useEffect } from "react";
import { Modal, Button, Select, DatePicker, Space,Input, Typography } from "antd";
import {RequestApi} from "./api/request.api";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

function LeaveRequest({userData}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [policy, setPolicy] = useState('')
    const [leaveDate, setLeaveDate] = useState([])
    const [requests, setRequests] = useState([])
    const [description, setDescription] = useState('')

    const getSickRequests = async () => {
        const requests = await RequestApi.getSickRequests()
        if (userData.role !== 'a') {
            setRequests(requests.data.filter((item) => item.createemail === userData.email))
        }
        else {
            setRequests(requests.data)
        }
    }

    function format(inputDate) {
        let date, month, year;

        date = inputDate.getDate();
        month = inputDate.getMonth() + 1;
        year = inputDate.getFullYear();

        date = date
            .toString()
            .padStart(2, '0');

        month = month
            .toString()
            .padStart(2, '0');

        return `${date}/${month}/${year}`;
    }

    useEffect(() => {
        getSickRequests()
    },[])

    return (
        <>
            <Modal
                title={'Submit request'}
                // style={{ top: 20 }}
                open={isModalOpen}
                onCancel={() => {setIsModalOpen(false);}}
                destroyOnClose
                okText={'Submit'}
                onOk={async () => {
                    await RequestApi.setRequest(userData.email, policy, format(new Date(leaveDate[0])), format(new Date(leaveDate[1])), description, 'Waiting').then(() => getSickRequests());
                    setIsModalOpen(false)
                }}
                // footer={null}
            >
                <Space direction="vertical" size={12} style={{width: '100%', marginTop: '2%'}}>
                    <Typography>Policy</Typography>
                    <Select
                        showSearch
                        placeholder="Select a policy"
                        title={'Policy'}
                        style={{width: '61%'}}
                        onChange={(value, option) => setPolicy(value)}
                        options={[
                            {
                                value: 'sick',
                                label: 'Sick leave',
                            },
                            {
                                value: 'leave',
                                label: 'Leave without documents',
                            },
                        ]}
                    />
                    <Typography>Leave date</Typography>
                    <RangePicker onChange={(value) => {setLeaveDate(value)}} />
                    <Typography>Description</Typography>
                    <TextArea rows={4} onChange={(value) => setDescription(value.target.value)} placeholder="Description"/>
                </Space>
            </Modal>
            <div className="">
                <div className="row" >
                    <div className="col-xs-12" >
                        <div className="table-responsive" data-pattern="priority-columns" >
                            <table
                                className="table table-bordered table-hover" >
                                <thead>
                                <tr>
                                    <th>Status</th>
                                    <th data-priority="1">Policy type</th>
                                    <th data-priority="2">Request Period</th>
                                    <th data-priority="3">Description</th>
                                    {userData.role === 'a' ? <><th data-priority="4"></th> <th data-priority="5"></th></> : <></>}
                                </tr>
                                </thead>
                                <tbody>
                                {requests.sort((a,b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0 ).map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.status }</td>
                                            <td>{item.policytype === 'sick' ? 'Sick leave' : 'Leave without documents'}</td>
                                            <td>{item.requestfrom} - {item.requestto}</td>
                                            <td>{item.description}</td>
                                            {userData.role === 'a' ? <><td><Button onClick={() => RequestApi.editRequest(item.id, 'Approved').then(() => getSickRequests())}>Approve</Button></td> <td><Button onClick={() => RequestApi.editRequest(item.id, 'Rejected').then(() => getSickRequests())}>Reject</Button></td></> : <></>}
                                        </tr>)
                                })}
                                </tbody>
                            </table>
                        </div>
                        <Button onClick={() => setIsModalOpen(true)}>New Request</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LeaveRequest;
