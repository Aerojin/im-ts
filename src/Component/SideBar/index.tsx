import React, { useEffect } from "react";
import { Row, Col, Image, Divider } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import apiClient from "../../Service/APIClient";
import { getI18nText } from "../../i18n";
import styles from "./index.module.scss";

const api = "https://shenzhi.kstore.shop/callback/qaConfig/open/list";
const getList = () => {
  apiClient.shared.post(api, { configNum: 10 }).then((res: any) => {
    console.log(555, res);
  });
};

const CompanyInfo = (props: any) => {
  const { companyInfo = {} } = props || {};
  const { name = "", enterpriseCode = "", account = "" } = companyInfo || {};
  return (
    <div className={styles["company-info"]}>
      <Row wrap={false}>
        <Col>
          <Image
            width={50}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </Col>
        <Col className={styles["company-name"]}>{name}</Col>
      </Row>
      <Row className={styles.mt10}>
        <Col span={12}>{getI18nText("enterprise_code")}：</Col>
        <Col>{enterpriseCode}</Col>
      </Row>
      <Row>
        <Col span={12}>{getI18nText("account")}：</Col>
        <Col>{account}</Col>
      </Row>
    </div>
  );
};

const CommonProblem = (props: any) => {
  const { onSendMessage } = props || {};

  return (
    <ul className={styles.problem}>
      <li className={styles.title}>{getI18nText("common_problem")}</li>
      <li onClick={() => onSendMessage('怎么成为采购商')}>
        怎么成为采购商
      </li>
      <li onClick={() => onSendMessage('网站购买该如何支付')}>
        网站购买该如何支付
      </li>
      <li onClick={() => onSendMessage('我的采购货物到哪里了？')}>
        我的采购货物到哪里了
      </li>
    </ul>
  );
};

const SideBar: React.FC<any> = (props: any) => {
  const { onClose, companyInfo = {}, onSendMessage } = props || {};

  useEffect(() => {
    // getList();
  }, []);

  return (
    <div className={styles.app}>
      <CompanyInfo companyInfo={companyInfo} />
      <Divider className={styles.divider} />
      <CommonProblem onSendMessage={onSendMessage} />
      <CloseOutlined
        style={{ fontSize: 20 }}
        className={styles["im-close"]}
        onClick={onClose}
      />
    </div>
  );
};

export default SideBar;
