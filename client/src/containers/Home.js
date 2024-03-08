import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Modal } from "antd";
import {
  DeleteFilled,
  EditFilled,
  CloudDownloadOutlined,
} from "@ant-design/icons";
import {
  asyncSetExpenses,
  asyncGetExpenses,
  asyncUpdateExpenses,
  asyncSoftDelete,
} from "../actions/expenseAction";
import DonutChart from "./DonutChart";
import PieChart from "./PieChart";
import "../App.css";
import Warning from "./Warning";

//FROM STYLES
import "./../styles/general.css";
import "./../styles/Home.css";

const Home = (props) => {
  const { category, expenses, budget } = useSelector((state) => {
    return state;
  });

  const totalAmount = expenses.data.reduce((total, currentValue) => {
    return (total = total + currentValue.amount);
  }, 0);

  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [select, setSelect] = useState("");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(asyncGetExpenses());
  }, [dispatch]);

  const handleChange = (e) => {
    const text = e.target.name;
    if (text === "expenseName") {
      setName(e.target.value);
    } else if (text === "expenseAmount") {
      setAmount(e.target.value);
    } else if (text === "expenseDescription") {
      setDescription(e.target.value);
    } else if (text === "selectName") {
      setSelect(e.target.value);
    } else if (text === "expenseDate") {
      setDate(e.target.value);
    }
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Expense-Data",
    //onAfterPrint: () => alert("print Success"),
  });

  const tableData = () => {
    const result = [];
    for (let i = 0; i <= expenses.data.length - 1; i++) {
      const data = category.data.find(
        (categoryItem) => categoryItem._id === expenses.data[i].categoryId
      );

      if (data)
        result.push({
          key: expenses.data[i]._id,
          category: data.name,
          itemname: expenses.data[i].name,
          amount: expenses.data[i].amount,
          expenseDate: expenses.data[i].expenseDate.slice(0, 10),
          description: expenses.data[i].description,
          id: expenses.data[i]._id,
        });
    }
    return result;
  };

  const filterData = () => {
    return tableData().filter((element) => {
      return element.category
        .toLowerCase()
        .includes(search.toLocaleLowerCase());
    });
  };

  const columns = [
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "ItemName", dataIndex: "itemname", key: "itemname" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "ExpenseDate", dataIndex: "expenseDate", key: "expenseDate" },
    {
      title: "SoftDelete",
      dataIndex: "",
      key: "x",
      render: (item) => (
        <Button
          onClick={() => {
            //dispatch(asyncDeleteExpenses(item.id));
            dispatch(asyncSoftDelete(item.id));
          }}
        >
          <DeleteFilled />
        </Button>
      ),
    },
    {
      title: "Invoice",
      dataIndex: "",
      key: "x",
      render: () => (
        <Button style={{ color: "green" }} onClick={handlePrint}>
          <CloudDownloadOutlined />
        </Button>
      ),
    },
    {
      title: "Edit",
      dataIndex: "",
      key: "x",
      render: (item) => (
        <Button
          onClick={() => {
            setAmount(item.amount);
            setName(item.itemname);
            setDescription(item.description);
            setDate(item.expenseDate);
            setSelect(item.category);
            setId(item.id);
            setIsModalOpen(true);
          }}
        >
          <EditFilled style={{ color: "darkblue" }} />
        </Button>
      ),
    },
  ];

  const handleOk = (e) => {
    setIsModalOpen(false);
    e.preventDefault();

    const result = category.data.find((category) => category.name === select);

    const formData = {
      name: name,
      amount: Number(amount),
      categoryId: result._id,
      description: description,
      expenseDate: date,
      categoryname: result.name,
    };
    if (id === "") {
      dispatch(asyncSetExpenses(formData));
    } else {
      dispatch(asyncUpdateExpenses(id, formData));
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const serachHandleChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="container">
      <div className="chart-container">
        <div className="add-charts">
          <DonutChart />
          <PieChart />
        </div>
      </div>
      <div className="warning-show">
        {totalAmount > budget.data.amount && <Warning />}
      </div>
      <div className="main-btn">
        <Button
          className="add-btn"
          onClick={() => {
            setName("");
            setAmount("");
            setDescription("");
            setDate("");
            setSelect("");
            setIsModalOpen(true);
          }}
        >
          AddExpenses &rarr;
        </Button>
        <input
          className="search-form"
          type="search"
          value={search}
          placeholder="search on category...."
          onChange={serachHandleChange}
        />
      </div>
      <div>
        <Modal
          title="Add Expenses Here"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div>
            <form className="expense-form">
              <div>
                <label className="expense-label">name:</label>
                <input
                  className="input-type"
                  type="text"
                  value={name}
                  name="expenseName"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="expense-label">amount:</label>
                <input
                  type="text"
                  value={amount}
                  name="expenseAmount"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="expense-label">description:</label>
                <textarea
                  value={description}
                  name="expenseDescription"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label className="expense-label">ExpenseDate:</label>
                <input
                  type="date"
                  value={date}
                  onChange={handleChange}
                  name="expenseDate"
                />
              </div>
              <div>
                <label className="expense-label">category:</label>
                <select
                  onChange={handleChange}
                  name="selectName"
                  defaultValue={select} // initial value
                  value={select} // set value
                >
                  <option value="select">select</option>
                  {category.data.map((category) => {
                    return <option key={category._id}>{category.name}</option>;
                  })}
                </select>
              </div>
            </form>
          </div>
        </Modal>
      </div>
      <div className="data-table">
        {expenses.data.length > 0 && (
          <Table
            ref={componentRef}
            size="small"
            columns={columns}
            expandedRowRender={(record, index) => (
              <p style={{ margin: 0 }}>{record.description}</p>
            )}
            dataSource={filterData()}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
