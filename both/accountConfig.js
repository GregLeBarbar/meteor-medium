T9n.setLanguage('fr');

// On supprime les champs pour les re-ajouter à la fin
// On fait ceci pour choisir l'ordre des champs
let email = AccountsTemplates.removeField('email');
let password = AccountsTemplates.removeField('password');

// On fixe ainsi pour faciliter le développement
password.minLength = 3;

AccountsTemplates.addField({
    _id: 'fullname',
    type: 'text',
    displayName: 'Nom complet',
    placeholder: 'Nom complet',
    required: true,
    minLength: 3,
    trim: true
});

AccountsTemplates.addField(email);
AccountsTemplates.addField(password);