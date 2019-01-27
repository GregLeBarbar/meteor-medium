import './comment.html'
import { Comments } from '../../../both';

Template.comment_form.events({
    'submit .js-create-comment'(event, instance){
        event.preventDefault();

        const content = event.target.content.value;

        let commentDocument = {
            content: content,
            articleId: FlowRouter.getParam('articleId'),
            createdAt: new Date(),
            ownerId: Meteor.userId()
        }

        Comments.insert(commentDocument);

        event.target.content.value = '';
    }
});

Template.comment_list.helpers({
    comments() {
        return Comments.find({articleId: FlowRouter.getParam('articleId')}, {sort:{createdAt: 1}});
    }
})