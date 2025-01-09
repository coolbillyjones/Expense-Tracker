import { use, useState, useEffect } from "react"
import axios from "axios"
import { useLocation, useNavigate, Link } from "react-router-dom"
import { Sankey } from "./Sankey.tsx"
import { PieChart } from './PieChart.tsx'

export const Home = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [income, setIncome] = useState('')
  const [expense, setExpense] = useState('')
  const [expenseName, setExpenseName] = useState('')
  const [allExpenses, setAllExpenses] = useState([])
  let [data, setData] = useState([["From", "To", "Weight"],[]])
  let [pieData, setPieData] = useState([["Expense", "Percent of Income"]])

  useEffect(() => {
    async function loadData() {
      await axios.get(`http://localhost:3500/data/${location.state.id}`)
      .then(res=> {
        if(res.status===200) {
          setAllExpenses(res.data.expenses)
          setIncome(res.data.income)
        }
      })
    }
    loadData()
  }, [])

  async function submit(e) {
    e.preventDefault()

    if (!income || !allExpenses) {
      return alert('Income and Expenses Required')
    }
    
    await axios.put(`http://localhost:3500/data/${location.state.id}`, {
      income: income, expenses: allExpenses
    })
    .then(res=>{
      if(res.status===200){
        displayData()
      }
      else if(res.status===400){
        alert('Userame Required')
      }
      else if(res.status===201){
        alert('Data Not Found')
      }
    })
    console.log(data)
    console.log(allExpenses)
  }

  async function displayData() {
    if (!income || !allExpenses) {
      alert ('Enter Data')
      return
    }
    let newData = []
    let newPieData = []
    data = [['From', 'To', 'Weight']]
    await axios.get(`http://localhost:3500/data/${location.state.id}`)
    .then(res=>{
      if(res.status===400){
        alert('Username Required')
      }
      else if(res.status===401){
        alert('Data Not Found')
      }
      else if(res.status===200){
        document.getElementById('income').innerHTML = income
        for (let i=0; i < allExpenses.length; i++) {
          const newItem = [String(income), allExpenses[i].name, (allExpenses[i].amount/res.data.income)*100]
          newData.push(newItem)
          const newPieItem = [allExpenses[i].name, (allExpenses[i].amount/res.data.income)*100 ]
          newPieData.push(newPieItem)
        }
        const updatedData = [...data,...newData]
        const updatedPieData = [...pieData, ...newPieData]
        setData(updatedData)
        setPieData(updatedPieData)
        
      }
    })
    
  }


  function addExpense(newExpense, newExpenseName) {
    if (!newExpense || !newExpenseName) {
      return alert('Expense Name and Amount Needed')
    }
    let expenses = document.getElementById("expenses")
    let newListItem = document.createElement("li")
    newListItem.textContent = `${newExpenseName}: ${newExpense}`
    expenses.appendChild(newListItem)
    setAllExpenses([...allExpenses, { "name": newExpenseName, "amount": newExpense }])
  }

  return (
    <>
      <div>
          <h1>Welcome {location.state.id}</h1>
          <form action="Post">
            <input type="number" onChange={(e)=>{setIncome(e.target.value)}} placeholder="Income" id="text" />
            <form action="Post">
              <p>New Expenses:</p>
              <ul id="expenses"></ul>
              <input type="text" onChange={(e)=>{setExpenseName(e.target.value)}} placeholder="Expense Name" id="text" />
              <input type="number" onChange={(e)=>{setExpense(e.target.value)}} placeholder="Expense Amount" id="text" />
              <button type="reset" onClick={(e)=>addExpense(expense, expenseName)} id="button" >Add Expense</button>
            </form>
            <button type="reset" onClick={submit}>Add New Data</button>
            <button type="reset" onClick={displayData}>Display Data</button>
          </form>
      </div>
      <div>
        <p>Income: <span id='income'></span></p>
        <div><Sankey data={data} /></div>
        <div><PieChart data = {pieData} /></div>
        
      </div>
    </>
  )
}

export default Home
