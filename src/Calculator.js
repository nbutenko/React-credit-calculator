import {useState} from "react";

export default function Calculator(props) {

    const [sum, setSum] = useState(0);
    const [yearlyPercent, setYearlyPercent] = useState(0);
    const [numberOfPayments, setNumberOfPayments] = useState(0);

    const resetValues = () => {
        setSum(0);
        setYearlyPercent(0);
        setNumberOfPayments(0);
    }

    return (
        <div>
            <h1>Credit calculator</h1>
            <div>
                <label>Total amount: </label>
                <input value={sum} onChange={event => setSum(Number(event.target.value))} />
            </div>
            <div>
                <label>Number of payments: </label>
                <input value={numberOfPayments} onChange={event => setNumberOfPayments(Number(event.target.value))} />
            </div>
            <div>
                <label>Credit percent: </label>
                <input value={yearlyPercent} onChange={event => setYearlyPercent(Number(event.target.value))} />
            </div>
            <div>
                <button onClick={() => props.countCreditValues(sum, numberOfPayments, yearlyPercent)}>Calculate</button>
                <button onClick={() => {props.resetTable(); resetValues()}}>Reset</button>
            </div>

            <table className={'credit-table'}>
                <thead>
                <tr>
                    <th>Payment number</th>
                    <th>Balance</th>
                    <th>Monthly payment</th>
                    <th>Percent payment</th>
                    <th>Credit payment</th>
                    <th>Balance after payment</th>
                </tr>
                </thead>
                <tbody>
                    {props.creditValues.map((el, index) => <tr key={index}>
                        <td>{index+1}</td>
                        <td>{el.currentBalance}</td>
                        <td>{el.monthlyPayment}</td>
                        <td>{el.percentPartInMonthlyPayment}</td>
                        <td>{el.creditPayment}</td>
                        <td>{el.balanceAfterPayment}</td>
                    </tr>
                    )}
                </tbody>
            </table>
            <h4>Monthly payment: {props.monthly}</h4>
            <h4>Total to pay: {props.total}</h4>
            <h4>Overpayment: {props.overPayment}</h4>
        </div>
    )
}