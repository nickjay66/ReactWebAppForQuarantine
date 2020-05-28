import React from 'react';

const Header = (props) => {
    return (
        <div className="header">
            <div className="container">
            <h1 className="header__title">{props.title}</h1>
            <h2 className="header__subtitle">{props.subTitle}</h2>
            </div>
        </div>
    );
};
//Gives a default if no prop is provided
Header.defaultProps = {
    title: 'Quarantine Challenge'
}

export default Header;