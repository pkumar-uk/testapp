import { Meteor } from 'meteor/meteor';
import '../imports/api/api.js';
import { ToDo } from '../imports/api/api';
Meteor.startup(() => {
  // code to run on server at startup
  ToDo.insert({code:'111',person:'Others'});
});
