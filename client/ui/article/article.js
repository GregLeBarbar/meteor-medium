import { Articles } from '../../../both';
import './article.html';

Template.article_create_form.events({
    'submit form'(event, instance) {

        event.preventDefault();
        event.preventDefault();
        
        console.log("prout");

        const title = event.target.title.value;
        const content = event.target.title.value;

        let articleDocument = {
            title: title,
            content: content,
            createAt: new Date(),
            ownerId: Meteor.userId()
        };

        console.log(articleDocument);

        Articles.insert(articleDocument);

        event.target.title.value = '';
        event.target.content.value = '';
    }
}); 