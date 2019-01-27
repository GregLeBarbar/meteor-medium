import { Meteor } from 'meteor/meteor';
import '../both';

// Permet d'interdire l'update des users directement côté client
Meteor.users.deny({
  update() {
    return true;
  }
})
