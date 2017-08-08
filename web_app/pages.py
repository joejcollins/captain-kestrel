import logging
import webapp2
import config
import re
import json
import models
from google.appengine.api import mail

'''
Base controller to deal with 500 errors
'''
class base_page_controller(webapp2.RequestHandler):
    """ Base pag controller """
    def handle_exception(self, exception, debug):
        # Log the error.
        logging.exception(exception)
        # Set a custom message.
        template_values = {'title': 'Internal Server Error!',}
        template = config.jinja_environment.get_template('errors/500.html')
        self.response.out.write(template.render(template_values))
        self.response.set_status(500)
        # If the exception is a HTTPException, use its error code.
        # Otherwise use a generic 500 error code.
        if isinstance(exception, webapp2.HTTPException):
            self.response.set_status(exception.code)
        else:
            self.response.set_status(500)

'''
Show the home page.
'''
class home(base_page_controller):
    def get(self):
        template_values = {'title': 'Home'}
        template = config.jinja_environment.get_template('content/home.html')
        self.response.out.write(template.render(template_values))    
 
'''
Send the email
'''
class send_email(base_page_controller):
    def post(self):
        email = models.Settings.get('EMAIL')
        message = mail.EmailMessage(sender = email,
                                    to = email,
                                    subject = 'Message from www.womerton-farm.co.uk')
        message.reply_to = self.request.get('From')
        message.body = '\n'.join(["%s: %s" % (key, self.request.get(key)) for key in self.request.arguments()])
        message.check_initialized()
        if self.IsEmailAddress(message.reply_to):
            message.send()
            message.to = message.reply_to
            message.send()
            responsePage = '/thanks'
        else:
            responsePage = '/sorry'
        self.redirect(responsePage)
        
    def IsEmailAddress(self, emailAddress):
        emailRegex = '^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$'
        goodEmail = re.match(emailRegex, emailAddress)
        if goodEmail:
            return True
        else:
            return False    

'''
Show the template based on the URL.
'''
class template(base_page_controller):
    def get(self, path): 
        template_values = {'title': path.capitalize(),
                           'active_page': path}
        template = config.jinja_environment.get_template('content/' + path + '.html')
        self.response.out.write(template.render(template_values))   

