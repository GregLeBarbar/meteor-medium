import { Articles, Comments, articlesUpsertSchema, commentInsertSchema } from './collections';
import { check } from 'meteor/check'; 

Meteor.methods({

    insertArticle(article){

        articlesUpsertSchema.validate(article);

        if (!this.userId) {
            throw new Meteor.Error('not connected');
        }

        let articleDocument = {
            title: article.title,
            content: article.content,
            createdAt: new Date(),
            ownerId: this.userId
        };

        return Articles.insert(articleDocument);
    },
    
    updateArticle(article){

        articlesUpsertSchema.validate(article);

        if (!this.userId) {
            throw new Meteor.Error('not connected');
        }

        let articleFound = Articles.findOne({_id: article.articleId});
        if (articleFound.ownerId !== this.userId) {
            throw new Meteor.Error('unauthorized', 'L\'utilisateur doit être l\'auteur de l\'article');
        }

        Articles.update(
            {_id: article.articleId}, 
            { $set: {title: article.title, content: article.content}
        });

    },
    
    removeArticle(articleId){

        check(articleId, String);

        if (!this.userId) {
            throw new Meteor.Error('not connected');
        }

        let articleFound = Articles.findOne({_id: articleId});
        if (articleFound.ownerId !== this.userId) {
            throw new Meteor.Error('unauthorized', 'L\'utilisateur doit être l\'auteur de l\'article');
        }

        Articles.remove({_id: articleId});

    },
    
    insertComment(comment){

        commentInsertSchema.validate(comment);

        if (!this.userId) {
            throw new Meteor.Error('not connected');
        }

        let commentDocument = {
            content: comment.content,
            articleId: comment.articleId,
            createdAt: new Date(),
            ownerId: this.userId
        }

        Comments.insert(commentDocument);
    }
});