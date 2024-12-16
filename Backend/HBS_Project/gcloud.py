from django.conf import settings
from storages.backends.gcloud import GoogleCloudStorage
from storages.utils import setting
from urllib.parse import urljoin


class GoogleCloudMediaStorage(GoogleCloudStorage):
    bucket_name = setting('GS_BUCKET_NAME')
    def url(self,name):
        return urljoin(settings.MEDIA_URL,name)