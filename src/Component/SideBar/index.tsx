import React from "react";
import { Row, Col, Image, Divider } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";

const CompanyInfo = () => {
  return (
    <div className={styles['company-info']}>
      <Row wrap={false}>
        <Col>
          <Image
            width={50}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </Col>
        <Col className={styles['company-name']}>北京京東叁佰陸拾電子商務有限公司</Col>
      </Row>
      <Row className={styles.mt10}>
        <Col span={6}>企业码：</Col>
        <Col>1234567891234536</Col>
      </Row>
      <Row>
        <Col span={6}>账号：</Col>
        <Col>123456789</Col>
      </Row>
    </div>
  );
};

const CommonProblem: React.FC = () => {
  return (
    <ul className={styles.problem}>
      <li className={styles.title}>常见问题</li>
      <li>
        <a href="https://www.taobao.com/">怎么成为采购商</a>
      </li>
      <li>
        <a href="https://www.taobao.com/">网站购买该如何支付</a>
      </li>
      <li>
        <a href="https://www.taobao.com/">我的采购货物到哪里了？</a>
      </li>
    </ul>
  );
};

const SideBar: React.FC<any> = (props: any) => {
  const { onClose } = props || {};
  return (
    <div className={styles.app}>
      <CompanyInfo />
      <Divider className={styles.divider} />
      <CommonProblem />
      <CloseOutlined style={{ fontSize: 20 }} className={styles['im-close']} onClick={onClose} />
    </div>
  );
};

export default SideBar;
