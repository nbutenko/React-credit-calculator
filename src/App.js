import {useState} from 'react';
import './App.css';
import Calculator from "./Calculator";

function App() {
  const[creditValues, setCreditValues] = useState([]);
  const [monthly, setMonthly] = useState(0);
  const [overPayment, setOverPayment] = useState(0);
  const[total, setTotal] = useState(0);

  // Credit values calculation function:
  const countCreditValues = (sum, numberOfPayments, yearlyPercent) => {
      let currentBalance = sum;
      const monthlyPercent = yearlyPercent / 100 / 12;
      const monthlyPayment = +(sum * (monthlyPercent + monthlyPercent / (Math.pow((1 + monthlyPercent), numberOfPayments) - 1))).toFixed(2);
      let percentPartInMonthlyPayment = 0;
      let creditPayment = 0;
      let balanceAfterPayment = 0;

      const newArr = [];
      for(let i = 0; i < numberOfPayments; i++) {
          percentPartInMonthlyPayment = +(currentBalance * monthlyPercent).toFixed(2);
          creditPayment = +(monthlyPayment - percentPartInMonthlyPayment).toFixed(2);
          balanceAfterPayment = currentBalance > monthlyPayment ? +(currentBalance - monthlyPayment).toFixed(2) : 0;

          newArr.push({
              currentBalance: currentBalance,
              monthlyPayment:monthlyPayment,
              percentPartInMonthlyPayment:percentPartInMonthlyPayment,
              creditPayment:creditPayment,
              balanceAfterPayment:balanceAfterPayment
          })
          currentBalance = +(currentBalance - monthlyPayment).toFixed(2);
      }
      setCreditValues(newArr);
      setMonthly(monthlyPayment);
      setTotal(+(monthlyPayment * numberOfPayments).toFixed(2));
      setOverPayment(+(monthlyPayment * numberOfPayments - sum).toFixed(2));
  }

    const resetTable = () => {
        setMonthly(0);
        setOverPayment(0);
        setTotal(0);
        setCreditValues([]);
    }

  return (
    <div className={"App"}>
      <Calculator countCreditValues={countCreditValues} resetTable={resetTable} creditValues={creditValues} monthly={monthly} total={total} overPayment={overPayment} />
    </div>
  );
}

export default App;
