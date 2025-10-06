from django.db import models
from django.utils.text import slugify
from django.utils.crypto import get_random_string

#have to change the name personla to personal



class Note(models.Model):
    CATEGORY = (('BUSINESS','Business'),
                ('PERSONLA','Personal'),
                ('IMPORTANT','Important'))
    

    title = models.CharField(max_length=100)
    body = models.TextField()
    slug = models.SlugField(unique=True, blank=True,null=True)
    category = models.CharField(max_length=15, choices=CATEGORY, default="PERSONAL")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    
    '''def save(self, *args, **kwargs):
        slug_base = slugify(self.title)
        slug = slug_base

        if self.__class__.objects.filter(slug=slug).exists():
            slug = f'{slug_base}--{get_random_string(5)}'

        self.slug = slug
        super().save(*args, **kwargs)'''
    def save(self, *args, **kwargs):
        if not self.slug:
            slug_base = slugify(self.title)
            slug = slug_base

            while self.__class__.objects.filter(slug=slug).exists():
                slug = f'{slug_base}-{get_random_string(5)}'

            self.slug = slug

        super().save(*args, **kwargs)
