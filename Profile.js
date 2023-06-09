import * as React from 'react';
import './Profile.css'
import ProfileIcon from './img/user-profile-icon.png'

export default function Profile({userData}) {
    userData = userData.userData
    return (
        <div className="card-container">
            <img className="round" src={ProfileIcon} alt="user"/>
            <h3>{userData.fullname}</h3>
            <h6>{userData.post}</h6>
            <div className="buttons">
                {/*<button className="primary">*/}
                {/*    Edit profile*/}
                {/*</button>*/}

            </div>
            <div className="skills">
                <h6>Contact</h6>
                <ul>
                    <li>{userData.email}</li>
                    <li>+{userData.phone}</li>
                </ul>
            </div>
        </div>
    );
}
