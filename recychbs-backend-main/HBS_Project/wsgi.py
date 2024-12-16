"""
WSGI config for HBS_Project project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/wsgi/
"""

import os
from django.core.wsgi import get_wsgi_application
from whitenoise import WhiteNoise
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'HBS_Project.settings')

application = get_wsgi_application()
# application = WhiteNoise(application, root=os.path.join(os.path.dirname(__file__), 'staticfiles'))
application = WhiteNoise(application, root=os.path.join(settings.BASE_DIR, 'staticfiles'))

# Add the React build directory to WhiteNoise
application.add_files(os.path.join(settings.BASE_DIR, 'dist'), prefix='')  # Serve React's index.html and other root files

# Optionally, add React's static assets
application.add_files(os.path.join(settings.BASE_DIR, 'dist/assets'), prefix='assets/')
