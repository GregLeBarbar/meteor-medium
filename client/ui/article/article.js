import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Articles } from '../../../both';
import './article.html';

Template.article_create_form.events({
    'submit .js-create-article'(event, instance) {

        event.preventDefault();
        
        const title = event.target.title.value;
        const content = event.target.content.value;

        // call meteor methods
        Meteor.call(
            'insertArticle', 
            {title: title, content: content}, 
            function(error, articleId){
                if (!error) {
                    event.target.title.value = '';
                    event.target.content.value = '';
                    FlowRouter.go('/article/:articleId', {articleId: articleId})
                }                
            }
        );
    }
});

Template.article_list.helpers({
    articles() {
        return Articles.find({}, {sort:{createdAt: -1}}).fetch();
    }

});

Template.article_page.helpers({
    article() {
        return Articles.findOne({_id: FlowRouter.getParam('articleId')});
    }
});

Template.article_edit_form.helpers({
    article() {
        return Articles.findOne({_id: FlowRouter.getParam('articleId')});
    }
});

Template.article_edit_form.events({
    'submit .js-edit-article'(event, instance){
        event.preventDefault();

        const title = event.target.title.value;
        const content = event.target.content.value;
        const articleId = FlowRouter.getParam('articleId');

        // call meteor methods
        Meteor.call(
            'updateArticle', 
            {articleId: articleId, title: title, content: content},
            function(error, result) {
                if (!error) {
                    FlowRouter.go('/article/:articleId', {articleId: articleId});    
                }
            }
        );
    },
    'click .js-delete-article'(event, instance) {
        
        const articleId = FlowRouter.getParam('articleId');

        // call meteor methods
        Meteor.call('removeArticle', articleId, function(error, result) {
            if (!error) {
                FlowRouter.go('/');
            }
        });
    }
});
