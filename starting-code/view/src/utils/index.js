export const fetchExpenses = async (date) => {
  const selectDate = new Date(date).getTime() || new Date().getTime();
  const res = await fetch(`/api/expense/list/${selectDate}`);
  return res.json();
};

export const resHandler = async (res, status) => {
  if (res.status === status) {
    return null;
  }
  const data = await res.json();
  if (data && data.emptyFields) {
    return data.emptyFields;
  }
  return null;
};

export const createExpense = async (data) => {
  const res = await fetch(`/api/expense/create`, {
    method: 'POST',
    body: data,
  });
  return resHandler(res, 201);
};

export const updateExpense = async (_id, data) => {
  const res = await fetch(`/api/expense/${_id}`, {
    method: 'PUT',
    body: data,
  });
  return resHandler(res, 200);
};

export const fetchExpense = async () => {
  try {
    const res = await fetch('api/expense');
    if(!res.ok) {throw new Error(`HTTP error! status: ${res.status}`);
  }
  const expenses = await res.json();
  return expenses;
  } catch (error){
    console.error('Fetching expenses failed: ', error);
    return [];
  }
};

export const deleteExpense = async (_id) =>
  fetch(`api/expense/${_id}`, {
    method: 'DELETE',
  });

export const formSetter = (data, form) => {
  Object.keys(form).forEach((key) => {
    data.set(key, form[key]);
  });
};

export const expenseByCategory = (expenses) => {
  
  if (!Array.isArray(expenses)) {
    console.error('expenses is not an array:', expenses);
    return [];
  }

  const categoryBreakdown = expenses.reduce((total, num) => {
    const curTotal = total;
    if (Object.keys(total).includes(num.category)) {
      curTotal[`${num.category}`] =
        Number(total[`${num.category}`]) + Number(num.price);
    } else {
      curTotal[`${num.category}`] = Number(num.price);
    }
    return curTotal;
  }, {});
  const data = Object.keys(categoryBreakdown).map((category) => ({
    x: category,
    y: categoryBreakdown[category],
  }));
  return data;
};
