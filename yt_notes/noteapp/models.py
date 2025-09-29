from django.db import models

# Create your models here.

class Note(models.Model):
    CATEGORY = (('BUSINESS','Business'),
                ('PERSONLA','Personal'),
                ('IMPORTANT','Important'))
    

    title = models.CharField(max_length=100)
    body = models.TextField()
    slug = models.SlugField(unique=True)
    category = models.CharField(max_length=15, choices=CATEGORY, default="PERSONAL")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
