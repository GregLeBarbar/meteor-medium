import { Articles, Comments } from '../both';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import './ui/globalHelpers';
import '../both';

import './ui/layout/layout';
import './startup/router';

if (Meteor.isDevelopment) {
    window.FlowRouter = FlowRouter;
    window.Articles = Articles;
    window.Comments = Comments;
}