import React from "react";
// import { Button, Popover } from "antd";
import { getI18nText} from '../../i18n';
import styles from "./index.module.scss";

const Header: React.FC = () => {
  return (
  <div className={styles.app} id="__chat_header__">
    {getI18nText('service')}
  </div>
  );
};

export default Header;
