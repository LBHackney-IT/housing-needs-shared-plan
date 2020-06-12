import css from '../index.module.scss';
import { useState } from 'react';
import { Button } from 'components/Form';

const ShareableLink = ({ customerUrl }) => {
  const [visuallyHiddenButton, setVisuallyHiddenButton] = useState(false);

  const generateButtonClick = async () => {
    setVisuallyHiddenButton(true);
    return;
  };

  return (
    <>
      <Button
        className={`${css['customer-link-to-plan__button']} ${
          visuallyHiddenButton ? 'visually_hidden' : ''
        }`}
        data-module="govuk-button"
        onClick={generateButtonClick}
        text="Show unique link"
      />
      <span>Unique customer link: </span>
      <a
        href={customerUrl}
        data-testid="shareable-link_test"
        className={`${visuallyHiddenButton ? '' : 'visually_hidden'} ${
          css['customer-link-to-plan__link']
        }`}
      >
        {customerUrl}
      </a>
      <br />
    </>
  );
};
export default ShareableLink;
