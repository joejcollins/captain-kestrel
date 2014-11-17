import webapp2
import logging
import config
import re
import json
from google.appengine.api import mail

'''
Base controller to deal with 500 errors
'''
class base_page_controller(webapp2.RequestHandler):
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
        f = open('secrets.json', 'r')
        secrets = json.loads(f.read())
        f.close()

        message = mail.EmailMessage(sender = "secrets['email']",
                                    to = "secrets['email']",
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

'''
Show the a gallery item
'''
class gallery_item(base_page_controller):
    def get(self, item): 
        gallery_items = [['BBQ.jpg','Enjoy a BBQ on the deck'],
                         ['Entrance.jpg', 'Come inside'],
                         ['Lounge.jpg', 'Relax in the lounge'],
                         ['Kitchen.jpg', 'Fully equipped kitchen'],
                         ['BreakfastBar.jpg', 'Plenty of seating at the breakfast bar'],
                         ['Wifi.jpg', 'Free WiFi Internet access'],
                         ['Shower.jpg', 'Two wet rooms with showers'],
                         ['Bunks.jpg', 'Six bunks and two sofa beds'],
                         ['PressureWash.jpg', 'Pressure Washer Available']]
        index = int(item)
        template_values = {'title': 'Gallery',
                           'active_page': 'gallery',
                           'caption': gallery_items[index][1],
                           'image': gallery_items[index][0]}
        template = config.jinja_environment.get_template('gallery/item.html')
        self.response.out.write(template.render(template_values))   
