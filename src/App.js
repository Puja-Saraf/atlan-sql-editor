import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import SQLEditor from "./components/SQLEditor";
import Table from "./components/Table";
import QUERIES from "./constants/constant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState(QUERIES[0]);
  const [showTable, setShowTable] = useState(false);

  const [code, setCode] = useState(
    `select * from ${query.name.toLowerCase()};`
  );

  useEffect(() => {
    setCode(`select * from ${query.name.toLowerCase()};`);
  }, [query]);

  const handleRunQuery = () => {
    const str = code.replaceAll(";", "");
    const arr = str.split(" ");
    let valid = false;
    if (
      arr[0].toLowerCase() === "select" &&
      arr[1] === "*" &&
      arr[2].toLowerCase() === "from"
    ) {
      for (let i = 0; i < QUERIES.length; i++) {
        if (QUERIES[i].name.toLowerCase() === arr[3].toLowerCase()) {
          valid = true;
          if (query.name.toLowerCase() !== arr[3].toLowerCase()) {
            setQuery(QUERIES[i]);
          }
          break;
        }
      }
    }

    if (valid) {
      setShowTable(true);
      notifySuccess("Query run succesfully!");
    } else {
      setShowTable(false);
      notifyError("Please select any of the available queries to run.");
    }
  };

  const notifyError = (error) =>
    toast.error(error, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notifySuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <>
      <ToastContainer
        className="mt-2"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex bg-[#DDF2FD] h-[100%]">
        <Sidebar
          Queries={QUERIES}
          query={query}
          setQuery={setQuery}
          setShowTable={setShowTable}
        />
        <div className="m-auto mt-24 w-[70%]">
          <SQLEditor code={code} setCode={setCode} />
          <button
            className="px-4 py-3 rounded-lg text-white font-bold bg-[#164863] mt-6 hover:bg-opacity-80"
            onClick={handleRunQuery}
          >
            <span>
              <i className="fa-solid fa-play mr-2"></i>
            </span>
            Run Query
          </button>
          <Table tableName={query.name} showTable={showTable} />
        </div>
      </div>
    </>
  );
}

export default App;
