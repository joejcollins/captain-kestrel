from controllers import pages

wsgi_routes = [
    (r'/', pages.home),
    (r'/send', pages.send_email),
    (r'/gallery/(\d+)', pages.gallery_item),
    (r'/(\w+)', pages.template),
]
