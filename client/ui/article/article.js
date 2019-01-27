import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Articles } from '../../../both';
import './article.html';

Template.article_create_form.events({
    'submit .js-create-article'(event, instance) {

        event.preventDefault();
        
        const title = event.target.title.value;
        const content = event.target.content.value;

        let articleDocument = {
            title: title,
            content: content,
            createdAt: new Date(),
            ownerId: Meteor.userId()
        };

        console.log(articleDocument);

        Articles.insert(articleDocument);

        event.target.title.value = '';
        event.target.content.value = '';
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

        Articles.update({_id:articleId}, { $set: {title: title, content: content}});

        FlowRouter.go('/article/:articleId', {articleId: articleId});
    },
    'click .js-delete-article'(event, instance) {
        Articles.remove({_id: FlowRouter.getParam('articleId')});
        FlowRouter.go('/');
    }
});
