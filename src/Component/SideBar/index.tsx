import React, { useEffect, useState } from "react";
import { Row, Col, Image, Divider, Tooltip } from "antd";

import { CloseOutlined } from "@ant-design/icons";
import apiClient from "../../Service/APIClient";
import { getI18nText, getLocale } from "../../i18n";
import styles from "./index.module.scss";

const capitalizeFirstLetter = (str: string): string => {
  if (typeof str !== "string" || !str) {
    return str; // 如果输入不是字符串或为空，则直接返回原值
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const locale = capitalizeFirstLetter(getLocale());
const mock = [
  {
    extendMap: {},
    id: 1,
    configNum: "8895245602",
    questionCn: "物流信息更新",
    answerCn: "在订单详情页查看物流信息",
    questionEn: "logistics information update",
    answerEn: "View logistics information on the order details page.",
    questionRu: "обновление информации о логистике.",
    answerRu:
      "Просматривать информацию о логистике на странице с подробностями заказа.",
  },
];

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
      });
    }
  });

  return array;
};

const api =
  "https://shenzhi-test.kstore.shop/callback/qaConfig/open/list?configNum=";
const getList = () => {
  apiClient.shared.get(api, { param: {} }).then((res: any) => {
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
  const { data = [] } = props || {};

  return (
    <ul className={styles.problem}>
      <li className={styles.title}>{getI18nText("common_problem")}</li>
      {data.map((el: any) => {
        const { question, answer, id } = el || {};
        return (
          <Tooltip title={answer} placement="bottomLeft" color="gold" key={id}>
            <li key={id}>
              {question}
            </li>
          </Tooltip>
        );
      })}
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

  console.log(555, problem);

  useEffect(() => {
    // getList();
    setProblem(formatProblem(mock));
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
