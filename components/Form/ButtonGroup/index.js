import css from './index.module.scss';

const ButtonGroup = ({ children }) => (
  <div className={css['lbh-button-group']}>{children}</div>
);

export default ButtonGroup;
