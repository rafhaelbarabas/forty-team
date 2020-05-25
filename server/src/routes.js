import AuthController from './controllers/fortyteam/auth/AuthController'
import ContactsController from './controllers/fortyteam/contacts/ContactsController'
import ProfileController from './controllers/fortyteam/profile/ProfileController'
import MessagesController from './controllers/fortyteam/messages/MessagesController'
import SerchUsers from './controllers/fortyteam/searchUsers/SearchUsersController'
import Users from './controllers/fortyteam/users/UsersController'
import Invitations from './controllers/fortyteam/invitations/Invitations'

export default function (app) {
  app.get('/', (req, res) => {
    res.status(200).send({
      message: 'Hello - wellcome to fortyTeam',
      version: '1.0.0.0'
    })
  })

  app.post('/fortyteam/login', AuthController.authenticate)
  app.post('/fortyteam/register-user', Users.registerUser)
  
  app.post('/fortyteam/load-session', AuthController.validateSession, AuthController.loadSession)
  app.get('/fortyteam/contactslist', AuthController.validateSession, ContactsController.contactsList)
  app.get('/fortyteam/profile', AuthController.validateSession, ProfileController.profile)
  app.get('/fortyteam/messages', AuthController.validateSession, MessagesController.messages)
  app.post('/fortyteam/sendmessage', AuthController.validateSession, MessagesController.sendMessage)
  app.get('/fortyteam/search-users', AuthController.validateSession, SerchUsers.userList)
  app.get('/fortyteam/invitations', AuthController.validateSession, Invitations.getInvitations)
  app.post('/fortyteam/acceptInvite', AuthController.validateSession, Invitations.accept)
  app.post('/fortyteam/rejectInvite', AuthController.validateSession, Invitations.reject)

  app.use((req, res) => {
    res.status(404).send({ error: '404 - Not found' })
  })  
}
