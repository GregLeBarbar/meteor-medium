import './navbar.html';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.navbar.events({
    'click .js-open-login-modal'(event, instance) {
        Modal.show('login_modal');
    },
    'click .js-logout'(event, instance) {
        Meteor.logout();
    },
    'click .js-goto-create-article'(event, instance) {
        FlowRouter.go('/article/create');
    }
});

Template.login_modal.onCreated(function(){
    this.autorun(() => {
        if (Meteor.userId()) {
            console.log("Cacher la modal");
            Modal.hide('login_modal');
        } 
    });
});