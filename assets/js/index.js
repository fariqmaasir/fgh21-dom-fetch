const form = document.getElementById("form");
const tBody = document.getElementById("tableBody");
const url = "https://st2lww-8888.csb.app/fariq/data";
async function getData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    const data = json.results.map((user) => {
      const tr = document.createElement("tr");
      if (user.name !== "") {
        const td = document.createElement("td");
        td.textContent = user.name;
        tr.appendChild(td);
      }
      if (user.age !== "") {
        const td = document.createElement("td");
        td.textContent = user.age;
        tr.appendChild(td);
      }
      if (user.gender !== "") {
        const td = document.createElement("td");
        td.textContent = user.gender;
        tr.appendChild(td);
      }
      if (user.isSmoker !== "") {
        const td = document.createElement("td");
        td.textContent = user.isSmoker;
        tr.appendChild(td);
      }
      if (user.cigarVariant !== "") {
        const td = document.createElement("td");
        td.textContent = user.cigarVariant.join("; ");
        tr.appendChild(td);
      }
      tBody.appendChild(tr);
    });
  } catch (error) {
    console.error(error.message);
  }
}
getData();
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = event.target.name.value;
  const age = event.target.age.value;
  const gender = event.target.gender.value;
  const isSmoker = event.target.smoke.value;
  const cigar = event.target.cigar;
  if (name === "") {
    window.alert("mohon isi nama anda!!");
    return;
  }
  if (/\d/.test(name)) {
    window.alert("mohon isi nama anda dengan benar!!");
    return;
  }
  if (age === "") {
    window.alert("mohon isi umur anda!!");
    return;
  }
  console.log(age);
  if (age.length >= 3) {
    window.alert("mohon isi umur dengan valid!!");
    return;
  }
  if (
    age.includes(".") ||
    age.includes("e") ||
    age.includes("-") ||
    age[0] === "0"
  ) {
    window.alert("mohon isi umur dengan angka yang valid!!");
    return;
  }
  if (gender === "") {
    window.alert("mohon isi jenis kelamin anda!!");
    return;
  }
  if (isSmoker === "") {
    window.alert("mohon jawab apakah anda seorang perokok?!");
    return;
  }
  // if (isSmoker === "Tidak") {
  // }
  let cigarData = [];
  for (let i = 0; i < cigar.length; i++) {
    if (cigar[i].checked) {
      cigarData.push(cigar[i].value);
    }
  }
  const cigarVariant = cigarData.join("; ");
  const formData = new URLSearchParams();
  formData.append("name", name);
  formData.append("age", age);
  formData.append("gender", gender);
  formData.append("isSmoker", isSmoker);
  formData.append("cigarVariant", cigarVariant);

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  if (data.success) {
    window.alert("Terimakasih sudah mengisi survey ini :>");
  } else {
    window.alert("Maaf ada error :<");
  }
});
// getData();
