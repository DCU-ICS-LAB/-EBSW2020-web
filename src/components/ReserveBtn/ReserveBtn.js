import React from 'react';
import './ReserveBtn.css';
import Button from '@enact/moonstone/Button';

const ReserveBtn = ({ onClick, context }) => {
    return (
        <div className="ReserveBtn">
            <Button className="inner" onClick={onClick}>
                <span>{context}</span>
            </Button>
        </div>
    );
};

export default ReserveBtn;