import React, { useEffect, useState } from "react";
import { Row, Col, Image, Divider, Collapse, Empty } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { getI18nText, getLocale } from "../../i18n";
import styles from "./index.module.scss";

const capitalizeFirstLetter = (str: string): string => {
  if (typeof str !== "string" || !str) {
    return str; // 如果输入不是字符串或为空，则直接返回原值
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const locale = capitalizeFirstLetter(getLocale());

const formatProblem = (data: any = []) => {
  const array: any = [];
  data.forEach((el: any) => {
    const question = el[`question${locale}`];
    const answer = el[`answer${locale}`];

    if (question && answer) {
      array.push({
        id: el.id,
        question,
        answer,
        label: question,
        children: answer,
        showArrow: false,
        classNames: styles.question,
      });
    }
  });

  return array;
};

const api = "https://shenzhi-test.kstore.shop/callback/qaConfig/open/list?configNum=";
const getList = () => {
  return fetch(api).then((res: any) => {
    return res.json();
  });
};

const CompanyInfo = (props: any) => {
  const { companyInfo = {} } = props || {};
  const {
    name = "",
    enterpriseCode = "",
    account = "",
    uri = "",
  } = companyInfo || {};
  return (
    <div className={styles["company-info"]}>
      <Row wrap={false}>
        <Col>
          <Image width={50} src={uri} />
        </Col>
        <Col className={styles["company-name"]}>{name}</Col>
      </Row>
      <Row className={styles.mt10}>
        <Col span={7}>{getI18nText("enterprise_code")}：</Col>
        <Col>{enterpriseCode}</Col>
      </Row>
      <Row>
        <Col span={7}>{getI18nText("account")}：</Col>
        <Col>{account}</Col>
      </Row>
    </div>
  );
};

const CommonProblem = (props: any) => {
  const { data = [] } = props || {};

  return (
    <ul className={styles.problem}>
      <li className={styles.title}>{getI18nText("common_problem")}</li>
      {!data || data.length === 0 ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <Collapse accordion ghost items={data} />
      )}
      {/* 
      {data.map((el: any) => {
        const { question, answer, id } = el || {};
        return (
          <Tooltip title={answer} placement="bottomLeft" color="gold" key={id}>
            <li key={id}>
              {question}
            </li>
          </Tooltip>
        );
      })} */}
      {/* <li onClick={() => onSendMessage("怎么成为采购商")}>怎么成为采购商</li> */}
      {/* <li onClick={() => onSendMessage("网站购买该如何支付")}>
        网站购买该如何支付
      </li>
      <li onClick={() => onSendMessage("我的采购货物到哪里了？")}>
        我的采购货物到哪里了
      </li> */}
    </ul>
  );
};

const SideBar: React.FC<any> = (props: any) => {
  const { onClose, companyInfo = {}, onSendMessage } = props || {};
  const [problem, setProblem] = useState([]);

  useEffect(() => {
    getList().then((res: any) => {
      const { context } = res || {};
      const { configVOList = [] } = context || {};

      console.log(111, res);

      setProblem(formatProblem(configVOList));
    });
  }, []);

  return (
    <div className={styles.app}>
      <CompanyInfo companyInfo={companyInfo} />
      <Divider className={styles.divider} />
      <CommonProblem onSendMessage={onSendMessage} data={problem} />
      <CloseOutlined
        style={{ fontSize: 20 }}
        className={styles["im-close"]}
        onClick={onClose}
      />
    </div>
  );
};

export default SideBar;
