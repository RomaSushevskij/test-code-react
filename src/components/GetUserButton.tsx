import React from "react";

interface IButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const GetUserButton = React.memo(function Button({onClick}: IButtonProps): JSX.Element {

    return (
        <button type="button" onClick={onClick}>
            get random user
        </button>
    );
});

GetUserButton.displayName = "GetUserButton";
