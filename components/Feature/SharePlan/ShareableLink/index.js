import css from '../index.module.scss';
import { useState } from 'react';
import { Button } from 'components/Form';

const ShareableLink = ({ customerUrl }) => {
  const [visuallyHiddenButton, setVisuallyHiddenButton] = useState(false);

  const generateButtonClick = async () => {
    setVisuallyHiddenButton(true);
    return;
  };

  console.log(customerUrl);
  return (
    <>
      <Button
        className={`${css['generate-link-to-plan__button']} ${
          visuallyHiddenButton ? 'visually_hidden' : ''
        }`}
        data-module="govuk-button"
        onClick={generateButtonClick}
        text="Show customer link"
      />
      <a
        href={customerUrl}
        className={`${visuallyHiddenButton ? '' : 'visually_hidden'} ${
          css['generate-link-to-plan__link']
        }`}
      >
        {customerUrl}
      </a>
      <br />
    </>
  );
};
export default ShareableLink;
