import React from "react";
import {Header} from "./Header.tsx";
import {GetUserButton} from "./GetUserButton.tsx";
import {useUser} from "../model/useUser.ts";
import {UserInfo} from "./UserInfo.tsx";
import {useThrottle} from "../hooks/useThrottle.ts";


function App(): JSX.Element {
    const {user, receiveRandomUser} = useUser();

    const handleButtonClick = React.useCallback((
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.stopPropagation();
        receiveRandomUser();
    }, [receiveRandomUser])

    const handleThrottleButtonClick = useThrottle(handleButtonClick);

    return (
        <div>
            <Header/>
            <GetUserButton onClick={handleThrottleButtonClick}/>
            <UserInfo user={user}/>
        </div>
    );
}

export default App;
