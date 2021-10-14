"use strict";

const template_api = "http://localhost:3001/api/template/1";
const file_api = "http://localhost:3001/create/file/1";
const getFormContianer = document.getElementById("get_form");

async function getapi(url) {
  // Storing response
  const response = await fetch(url);

  // Storing data in form of JSON
  var data = await response.json();
  if (response) {
    show(data);
  }
}

getapi(template_api);

function show(data) {
  const d = data.temp_form;
  let content = "";
  // console.log(d)

  d.forEach((item) => {
    if (item === "image_backup" || item === "image_banner") {
      content += `<label for='${item}'>${item}</label><input name='${item}' type='file' id='${item}' value=''><br/>`;
    } else {
      content += `<label for='${item}'>${item}</label><input name='${item}' type='text' id='${item}' value=''><br/>`;
    }
  });
  content += ` <input type="submit" id="handle_submit">`;

  getFormContianer.innerHTML = content;
}

async function handleForm(e) {
  e.preventDefault();
  let dataForm = new FormData(e.target);

  dataForm.append(
    "image_backup",
    document.getElementById("image_backup").files[0]
  );
  dataForm.append(
    "image_banner",
    document.getElementById("image_backup").files[0]
  );
  dataForm.append(
    "image_poster",
    document.getElementById("image_poster").files[0]
  );
  dataForm.append(
    "image_banner_name",
    document.getElementById("image_banner").value.replace(/^.*[\\\/]/, "")
  );
  dataForm.append(
    "image_backup_name",
    document.getElementById("image_backup").value.replace(/^.*[\\\/]/, "")
  );
  dataForm.append(
    "image_poster_name",
    document.getElementById("image_poster").value.replace(/^.*[\\\/]/, "")
  );

  await fetch(file_api, {
    method: "POST",
    body: dataForm,
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("api data: " + data);
    })
    .catch((err) => {
      console.log("api err: " + err);
    });
}

getFormContianer.addEventListener("submit", handleForm);

document.getElementById("listFile").addEventListener("click", async (e) => {
  e.preventDefault();

  await fetch(
    "http://localhost:3001/create/getFile/b4e94c40-3be7-4cf1-bede-c78d733047fc",
    {
      method: "POST",
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("api data: " + data);
    })
    .catch((err) => {
      console.log("api err: " + err);
    });
});
