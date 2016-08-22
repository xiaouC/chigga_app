
// navigator view list
var navigation_views = new Map();
navigation_views.set('Home', require('./home/home.js'));
navigation_views.set('Login', require('./login/loginView.js'));
navigation_views.set('Register', require('./login/registerView.js'));
navigation_views.set('PersonalInformation', require('./login/personalInformationView.js'));
navigation_views.set('HomeItemDetailView', require('./home_contents/itemContentView.js'));
navigation_views.set('FansView', require('./user_info/fansView.js'));
navigation_views.set('AttentionsView', require('./user_info/attentionsView.js'));

module.exports = navigation_views;
