import React from 'react';

export const InputLabel = ({divClass, inputClass, _for, title, type, placeholder, inputRef, value, labelClass, checked, required}) => (
    <div className={"form-group " + divClass}>
        <label className={labelClass}>
            {title}
        </label>
        <input type={type} className={"rounded-0 bg-light " + inputClass} defaultValue={value} defaultChecked={checked}
               name={_for} id={_for} placeholder={placeholder} ref={inputRef} required={required}/>
    </div>
);
InputLabel.defaultProps = {
    type: "text",
    placeholder: "",
    inputClass: "form-control",
    required: true
};