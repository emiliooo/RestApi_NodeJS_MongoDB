let expenseamountval = document.getElementById("expenseAmount").value;
let budget = 0;
let expenses = [];

let init = () => {
  setTimeout(() => {
    document.getElementById("budget-cash").innerHTML = budget
  }, 1000)
  actuallySaldo();
}

let fetchingData = () => {
  fetch('http://localhost:3000/posts', {
      mode: 'cors'
    })
    .then(function (response) {
      return response.json()
    })
    .then(function (res) {
      console.log(res);
      expenses = res;
      listExpenses();
    })
    .catch(function (error) {
      log('Request failed', error)
    });
}
fetchingData();


let mybudget = () => {
  budget = document.getElementById("budget").value;
  console.log(budget)
  init();
}


let myexpense = () => {
  let expenseval = document.getElementById("expense").value;
  let expenseamountval = document.getElementById("expenseAmount").value;

  document.getElementById("expense").value = '';
  document.getElementById("expenseAmount").value = '';

  let task = {
    expense: expenseval,
    title: expenseamountval
  }

  expenses.push(task)

  Postdata(task)
  listExpenses();
  init();
}

let Postdata = (task) => {
  fetch("http://localhost:3000/posts", {
      method: "post",
      body: JSON.stringify(task),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res => {
      console.log("Dodałem użytkownika:");
      console.log(res);
    })
}

let listExpenses = () => {
  document.getElementById("expensesCash").innerHTML = "";
  expenses.forEach(el => {
    var div = document.createElement("li");
    div.innerHTML = 'Cash:<input type="text" id="expenseInput" name="expense" class="form-control" value=" ' + el.expense + '">  Title: :<input type="text" id="titleInput" name="title" class="form-control" value=" ' + el.title + '"> <button id="' + el._id +
     '" onClick="deleteTask(this.id)" type="button" class="btn btn-warning">delete</button><button id="' + el._id +
     '" onClick="saveTask(this.id)" type="button" class="btn btn-info">Save</button>'
    document.getElementById("expensesCash").appendChild(div)
  })
}

let saveTask = (itemID) => {
  let expenseval = document.getElementById("expenseInput").value;
  let expenseamountval = document.getElementById("titleInput").value;

  let task = {
    expense: expenseval,
    title: expenseamountval
  }

  fetch('http://localhost:3000/posts/' + itemID, {
    method: 'PATCH',
    body: JSON.stringify(task),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    mode: 'cors'
  })
  .then(res => res.text())
  .then(res => console.log(res))

  expenses = [];

}

let deleteTask = (item) => {
  let deleteOnServer = () => {
    expenses = expenses.filter(el => {
      console.log(item)
      return el._id !== item
    })
    listExpenses()
  }

  fetch('http://localhost:3000/posts/' + item, {
      method: 'DELETE',
      mode: 'cors'
    })
    .then(deleteOnServer())
    .then(res => res.text())
    .then(res => console.log(res))
}


let actuallySaldo = () => {
  let expensed = 0;

  if (budget !== 0) {
    expenses.forEach(el => {
      expensed += +el.expense;
    })
    let finished = (budget - expensed);

    setTimeout(() => {
      document.getElementById("balance-cash").innerHTML = finished;
    }, 1000);
  } else {
    alert('budget is ZERO')
  }
}