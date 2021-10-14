"use strict";

const firebase = require("../auth/firebaseDB");
const createTemplate = require("../models/createTemplate");
const firestore = firebase.firestore();

const addTemplate = async (request, response, next) => {
  try {
    const data = request.body;
    await firestore.collection("temp_gen").doc(data.id).set(data);
    response.send("created successfully.");
  } catch (error) {
    response.status(400).send(error.message);
  }
};

const getAllTemplates = async (request, response, next) => {
  try {
    const temp_data = await firestore.collection("temp_gen");
    const data = await temp_data.get();
    let template_list = [];

    if (data.empty) {
      response.status(404).send("List not found");
    } else {
      data.forEach((item) => {
        const template = new createTemplate(
          item.id,
          item.data().temp_name,
          item.data().ad_size,
          item.data().temp_form,
          item.data().file_new_path,
          item.data().file_ori_path
        );
        template_list.push(template);
      });
      response.send(template_list);
    }
  } catch (error) {
    response.status(400).send(error.message);
  }
};

const getTemplate = async (request, response, next) => {
  try {
    const id = request.params.id;
    const template = await firestore.collection("temp_gen").doc(id);
    const data = await template.get();
    if (!data.exists) {
      response.status(404).send("template not found");
    } else {
      response.send(data.data());
    }
  } catch (error) {
    response.status(400).send(error.message);
  }
};

module.exports = {
  addTemplate,
  getAllTemplates,
  getTemplate,
};
