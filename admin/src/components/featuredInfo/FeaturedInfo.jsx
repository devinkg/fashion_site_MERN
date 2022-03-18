import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { userRequest } from "../../requestMethods";

export default function FeaturedInfo() {
  const [income, setIncome] = useState();
  const [perc, setPerc] = useState(0);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("orders/income");
        setIncome(res.data);
        const percValue = await calculatePercentage(res.data);
        setPerc(percValue);
      } catch (e) { }
    }  
    getIncome();
  }, []);

  const calculatePercentage = async (responseData) => {
    const lastIncome = responseData[responseData?.length - 1]?.total;
    const monthBeforeLastIncome = responseData[responseData?.length - 2]?.total;
    let percentagevalue = Number((lastIncome * 100) / monthBeforeLastIncome - 100)
    return percentagevalue || 0;
  }

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income && Number(income[income?.length - 1]?.total || 0)}</span>
          <span className="featuredMoneyRate">
            %{Number(perc).toFixed(2)}{" "}
            {perc < 0 ?
              (<ArrowDownward className="featuredIcon negative" />) :
              (<ArrowUpward className="featuredIcon" />)}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      {/* <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div> */}
    </div>
  );
}
