import React from "react";
import {User} from "../model/types.ts";


interface IUserInfoProps {
    user: User | null;
}

export const UserInfo = React.memo(function UserInfo({user}: IUserInfoProps): JSX.Element {

    if (!user) {
        return <div>No user data available</div>;
    }

    return (
        <table>
            <thead>
            <tr>
                <th>Username</th>
                <th>Phone number</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>{user.name}</td>
                <td>{user.phone}</td>
            </tr>
            </tbody>
        </table>
    );
});

UserInfo.displayName = "UserInfo";
