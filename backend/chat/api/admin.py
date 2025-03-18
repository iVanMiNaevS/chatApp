from django.contrib import admin

from .models import User, Profile, ChatMessage

# Register your models here.

class UserAdmin(admin.ModelAdmin):
    list_display = ["username", 'email']

class ProfileAdmin(admin.ModelAdmin):
    list_display = ["full_name", 'user', 'verified']
    list_editable = ['verified']

class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ["user", 'sender', 'reciever',"is_read","message"]
    list_editable = ['is_read',"message"]

admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(ChatMessage, ChatMessageAdmin)
