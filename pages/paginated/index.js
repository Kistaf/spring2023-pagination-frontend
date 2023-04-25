import { sanitizeStringWithTableRows } from "../../utils.js";

let total = 0;
let pageSize = 10;
let currPage = 0;

export const load = () => {
  fetchData();
  updateUI();
  document.getElementById("next").onclick = () => fetchData(currPage + 1);
  document.getElementById("prev").onclick = () => fetchData(currPage - 1);
  document.getElementById("page_size").onchange = (e) => {
    pageSize = e.target.value;
    fetchData();
  };
};

const updateUI = () => {
  document.getElementById("page_status").innerHTML = DOMPurify.sanitize(`${currPage + 1} of ${total}`);
  if (currPage === 0) {
    document.getElementById("prev").classList.add("disabled");
  } else {
    document.getElementById("prev").classList.remove("disabled");
  }

  if (currPage === total - 1) {
    document.getElementById("next").classList.add("disabled");
  } else {
    document.getElementById("next").classList.remove("disabled");
  }
};

const fetchData = async (page = 0) => {
  const url = `http://localhost:8080/api/people?page=${page}&take=${pageSize}`;
  try {
    const res = await fetch(url);
    const data = await res.json();

    total = data.totalPages;
    currPage = data.number;

    const rows = data.content
      .map(
        (person) => `
    <tr>
      <td>${person.id}</td>
      <td>${person.name}</td>
      <td>${person.age}</td>
      </tr>
    `
      )
      .join("");

    document.getElementById("tbody").innerHTML = sanitizeStringWithTableRows(rows);

    updateUI();
  } catch (err) {
    console.log(err);
  }
};
