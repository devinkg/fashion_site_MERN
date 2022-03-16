import "./widgetLg.css";
import { useState, useEffect } from "react";
import { userRequest } from "../../requestMethods";
import moment from 'moment';
import { find } from "lodash";

export default function WidgetLg() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);


  const getOrders = async () => {
    try {
      const res = await userRequest.get("orders");
      setOrders(res.data);
    } catch (e) { console.log(e) };
  }

  const getUsers = async () => {
    try {
      const res = await userRequest.get("users");
      setUsers(res.data);
    } catch (e) { };
  }

  useEffect(() => {
    getOrders();
    getUsers();
  }, []);

  const getUserName = (userId) => {
    const userData = find(users, (uObj) => (uObj?._id === userId));
    return userData?.username || userId;
  }

  const getUserImgUrl = (userId) => {
    const userData = find(users, (uObj) => (uObj?._id === userId));
    return userData?.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
  }

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {orders?.map((orderObj, i) => (
          <tr className="widgetLgTr" key={i}>
            <td className="widgetLgUser">
              <img
                src={getUserImgUrl(orderObj?.userId)}
                alt=""
                className="widgetLgImg"
              />
              <span className="widgetLgName">{getUserName(orderObj?.userId)}</span>
            </td>
            <td className="widgetLgDate">{moment(orderObj?.createdAt).fromNow()}</td>
            <td className="widgetLgAmount">${orderObj?.amount}</td>
            <td className="widgetLgStatus">
              <Button type={orderObj?.status} />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
