import { Articles, Comments } from "../both";
import { check } from "meteor/check";

Meteor.publish('articles.list', function(skip, limit) {

    check(skip, Number);
    check(limit, Number);
    
    let articleCursor = Articles.find(
        {}, 
        {
            fields: {content: 0}, 
            sort: {createdAt: -1}, 
            skip: skip, 
            limit: limit
        }
    );

    // On souhaite récupérer les ids des auteurs des articles
    let arrayArticles = articleCursor.fetch();
    let arrayOwnerId = arrayArticles.map(article => article.ownerId);
    // Pour supprimer les doublons 
    let arrayUniqueOwnerId = Array.from(new Set(arrayOwnerId));

    Counts.publish(this, 'articlesCount', Articles.find({}));

    return [
        articleCursor,
        Meteor.users.find(
            {_id: { $in: arrayUniqueOwnerId}}, 

            // on filtre les champs et on prend que le champ profile
            { fields: { profile: 1}}
        )
    ];
});

Meteor.publish('article.edit', function(articleId) {
    check(articleId, String);
    let articleCursor = Articles.find({_id: articleId});
    return [
        articleCursor,
    ]; 
});

Meteor.publish('article.single', function(articleId) {

    check(articleId, String);

    // Récupération des curseurs pour articles et comments
    let articleCursor = Articles.find({_id: articleId});
    let commentCursor = Comments.find({articleId: articleId});

    // Récupération des ids des auteurs des commentaires
    let arrayComment = commentCursor.fetch();
    let arrayOwnerId = arrayComment.map(comment => comment.ownerId);

    // Récupération de l'auteur de l'article
    let article = articleCursor.fetch().find(article => article._id === articleId);
    arrayOwnerId.push(article.ownerId);
    let arrayUniqueOwnerId = Array.from(new Set(arrayOwnerId));

    return [
        articleCursor,
        commentCursor,
        Meteor.users.find(
            {_id: {$in: arrayUniqueOwnerId}},
            { fields: { profile: 1}}
        )
    ];
});

