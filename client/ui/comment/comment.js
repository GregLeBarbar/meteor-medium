import './comment.html'
import { Comments } from '../../../both';

Template.comment_form.events({
    'submit .js-create-comment'(event, instance){
        event.preventDefault();

        if (!Meteor.userId()) {
            Modal.show('login_modal');
            return;
        }

        const content = event.target.content.value;
        const articleId = FlowRouter.getParam('articleId');

        // call meteor methods
        Meteor.call(
            'insertComment', 
            {articleId: articleId, content: content}, 
            function(error, result){
                if (!error) {
                    event.target.content.value = '';
                }                
            }
        );
    }
});

Template.comment_list.helpers({
    comments() {
        return Comments.find({articleId: FlowRouter.getParam('articleId')}, {sort:{createdAt: 1}});
    }
});