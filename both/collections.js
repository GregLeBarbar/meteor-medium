import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check'; 

export const Articles = new Mongo.Collection('articles');
export const Comments = new Mongo.Collection('comments');

export const articlesUpsertSchema = new SimpleSchema({
    title: {
        type: String,
        max: 100,
        min: 3,
    },
    content: {
        type: String,
        max: 1500,
        min: 3,
    },
    articleId: {
        type: String,
        optional: true
    }
}, { check });

export const commentInsertSchema = new SimpleSchema({
    articleId: {
        type: String
    }, 
    content: {
        type: String,
        min: 3,
        max: 500
    }
}, { check });