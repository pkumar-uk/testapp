import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import 'meteor/aldeed:autoform/static'
import './main.html';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'            // optional, default theme
import popper from 'popper.js'

global.Popper = popper 
import { AutoFormThemeBootstrap4 } from 'meteor/communitypackages:autoform-bootstrap4/static'


AutoForm.load();
AutoFormThemeBootstrap4.load();
AutoForm.setDefaultTemplate('bootstrap4');
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);
import { ToDo } from '../imports/api/api';
let id = new ReactiveVar();
let schemaa = new SimpleSchema({
   
  code: {
    type: String,
    optional: true,
    label: "Assessment/Term Id",
  },
  person: {
    type: String,
    label: "Person",
    optional: false,
    autoform: {
      type: "select-radio-inline",
      options: function () {
        return [
          { label: "Student", value: "Student" },
          { label: "Staff", value: "Staff" },
          { label: "Parent", value: "Parent" },
          { label: "Others", value: "Others" },
        ];
      },
    },
  },
   
});


let hooksObj = {
  onSubmit: function (insertDoc, updateDoc, currentDoc) {
    return true;
  },
  onSuccess: function (formType, result) {
    console.log("Updated. ", "Success!");
  },
  // Called when any submit operation fails
  onError: function (formType, error) {
   console.log("Looks like there is a problem ! " + error);
  },
  formToModifier: function (doc) {
     
    return doc;
  },
  formToDoc: function (doc) {
    //console.log('doc ');
     
    return doc;
  },
};

AutoForm.addHooks(
  ["afInsert", "afUpdate"],
  hooksObj,
  true
);
 

Template.hello.helpers({
  schema() {
    return schemaa
  },
  todo() {
    return ToDo
  },
  todolist() {
    return ToDo.find();
  },
  doc() {
    return ToDo.findOne({_id:id.get()});
  },
});

Template.hello.events({
  "click .btnc": function(event, template) {
    id.set(this._id)
    $('#myModalupdate').modal({
        keyboard: false
    })
  },

});
