import React from 'react'

export const Colmd = props => (
    <div className="col-md">
        <div className="icon-info">
            {
                props.children
            }
        </div>
    </div>
);

export const TrTd = ({title, value}) => (
    <tr>
        <td>
            {
                title
            }
        </td>
        <td>
            {
                value
            }
        </td>
    </tr>
);

export const TitleSeparator = () => (
    <div className="separator">
        <div className="first mr-1"></div>
        <div className="second"></div>
    </div>
);