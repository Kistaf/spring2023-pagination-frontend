import { sanitizeStringWithTableRows } from "../../utils.js";

export const load = () => {
  fetchData();
};

const fetchData = async () => {
  const url = `http://localhost:8080/api/people?page=0&take=100`;
  try {
    const res = await fetch(url);
    const data = await res.json();
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
  } catch (err) {
    console.log(err);
  }
};
