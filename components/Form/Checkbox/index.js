import { useState } from 'react';

const Checkbox = ({ checked, label, name, onClick, hidden, ...others }) => {
  const [checkedValue, setCheckedValue] = useState(checked ? checked : false);
  return (
    <div className="govuk-form-group">
      <div className="govuk-checkboxes">
        <div className="govuk-checkboxes__item">
          <input
            className="govuk-checkboxes__input"
            id={name}
            name={name}
            type="checkbox"
            onClick={onClick}
            defaultChecked={checkedValue}
            {...others}
          />
          <label className="govuk-label govuk-checkboxes__label" htmlFor={name}>
            <span hidden={hidden}>{label}</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Checkbox;
