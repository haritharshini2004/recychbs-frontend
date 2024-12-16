from django.contrib.auth.models import AbstractUser, AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, Permission
from django.db import models
from django.utils import timezone


# Extend the User model
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # Define constants at the top of the class
    USER = 'USER'
    DEALER = 'DEALER'
    ADMIN = 'ADMIN'

    ROLE_CHOICES = (
        (USER, 'User'),
        (DEALER, 'Dealer'),
        (ADMIN, 'Admin'),
    )

    username = models.CharField(max_length=150, unique=False)  # Non-unique username
    phone_number = models.CharField(max_length=15, unique=True)  # Unique phone number
    email = models.EmailField(unique=True)  # Email is unique
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default=USER)

    # Add related_name attributes to avoid clashes
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_groups',  # Avoids clash with auth.User.groups
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_permissions',  # Avoids clash with auth.User.user_permissions
        blank=True
    )

    USERNAME_FIELD = 'email'  # Use email as the login field
    REQUIRED_FIELDS = ['phone_number']  # Fields required during user creation
  # Fields required when creating a superuser

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"


# User profile (for normal users)
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, limit_choices_to={'role': User.USER})
    User_Name = models.CharField(max_length=255)
    Email = models.EmailField(unique=True,null=True)
    Address=models.CharField(max_length=120,null=True)
    Nationality = models.CharField(max_length=50,null=True)
    Phone_Number=models.CharField(max_length=120,null=True)
    active = models.BigIntegerField(default=True)

# Dealer profile
class DealerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, limit_choices_to={'role': User.DEALER})
    Dealer_ID = models.AutoField(primary_key=True)
    Dealer_Name = models.CharField(max_length=255)   
    Email = models.EmailField(unique=True,null=True)
    Address=models.CharField(max_length=120,null=True)
    Natioanality = models.CharField(max_length=50,null=True)
    Phone_Number=models.CharField(max_length=120,null=True)
    Total_Scrap_Collected=models.IntegerField(null=True)

# Admin profile
class AdminProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, limit_choices_to={'role': User.ADMIN})
    role_description = models.TextField()

    def __str__(self):
        return self.user.email

    class Meta:
        verbose_name = 'Admin Profile'
        verbose_name_plural = 'Admin Profiles'


# class CustomUserManager(BaseUserManager):
#     def create_user(self, username, email=None,  Phone_Number=None, Address=None,password=None, **extra_fields):
#         if not username:
#             raise ValueError('The Username field must be set')
#         user = self.model(username=username,email=email,Phone_Number=Phone_Number, Address=Address,**extra_fields)
#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def create_superuser(self, username, password=None, **extra_fields):
#         extra_fields.setdefault('is_staff', True)
#         extra_fields.setdefault('is_superuser', True)

#         if extra_fields.get('is_staff') is not True:
#             raise ValueError('Superuser must have is_staff=True.')
#         if extra_fields.get('is_superuser') is not True:
#             raise ValueError('Superuser must have is_superuser=True.')

#         return self.create_user(username, password, **extra_fields)


# class CustomUser(AbstractBaseUser, PermissionsMixin):
#     username = models.CharField(max_length=30, unique=True)
#     email = models.EmailField(blank=True, null=True,unique=True)
#     first_name = models.CharField(max_length=30)
#     last_name = models.CharField(max_length=30)
#     is_active = models.BooleanField(default=True)
#     is_staff = models.BooleanField(default=False)
#     date_joined = models.DateTimeField(auto_now_add=True)

#     objects = CustomUserManager()

#     USERNAME_FIELD = 'username'
#     REQUIRED_FIELDS = []

#     class Meta:
#         abstract = True

# class Customer(CustomUser):
#     User_ID = models.AutoField(primary_key=True)
#     Address = models.CharField(max_length=40)
#     Phone_Number = models.BigIntegerField(null=True)
#     groups = models.ManyToManyField(Group, related_name='customer_groups' )
#     user_permissions = models.ManyToManyField(Permission, related_name='customer_permissions')


# #  Dealers Registration Details
# class Dealer_Table(CustomUser):
#     Dealer_ID = models.AutoField(primary_key=True)
#     Address=models.CharField(max_length=120,null=True)
#     Phone_Number=models.CharField(max_length=120,null=True)
#     Total_Scrap_Collected=models.IntegerField(null=True)
#     groups = models.ManyToManyField(Group, related_name='dealer_groups' )
#     user_permissions = models.ManyToManyField(Permission, related_name='dealer_permissions')


class Scrap_Type(models.Model):
    Scrap_ID = models.AutoField(primary_key=True)
    Scrap_Name = models.CharField(max_length=50)
    Current_Price_Per_KG = models.CharField(max_length=50,default=False)
    Scrap_Image = models.TextField()
    Price_Updated_At = models.DateTimeField(auto_now=True)

class UserScrap_Type(models.Model):
    Scrap_ID = models.AutoField(primary_key=True)
    Scrap_Name = models.CharField(max_length=50)
    Current_Price_Per_KG = models.CharField(max_length=50,default=False)
    Scrap_Image = models.TextField()
    Price_Updated_At = models.DateTimeField(auto_now=True)

# Dealer Model
class Dealer_Details(models.Model):
    # Dealer_Reference = models.OneToOneField(Dealer_Table, on_delete=models.CASCADE)
    id = models.AutoField(primary_key=True)
    Dealer_ID = models.IntegerField(null=False,unique=True)
    Dealer_Name = models.CharField(max_length=50)
    mail_id = models.EmailField(unique=False)
    DOB = models.CharField(max_length=60)
    Address = models.CharField(max_length=100,null=True)
    Street = models.CharField(max_length=50,null=True)
    City = models.CharField(max_length=50,null=True)
    State = models.CharField(max_length=30,null=True)
    Post_Code = models.CharField(max_length=10,null=True)
    Country = models.CharField(max_length=20,null=True)
    Nationality = models.CharField(max_length=30,null=True)
    Phone_Number = models.CharField(max_length=30,null=True)
    Aadhar_No = models.BigIntegerField()
    Aadhar_Front_Photo = models.FileField(upload_to='Dealer_Aadhar_Img')
    Aadhar_Back_Photo = models.FileField(upload_to='Dealer_Aadhar_Img')
    PAN_No = models.CharField(max_length=20)
    PAN_Photo = models.FileField(upload_to='Dealer_Pan_Img')
    LICENSE_No = models.CharField(max_length=20)
    LICENSE_Front_Photo = models.FileField(upload_to='Dealer_License_Img')
    LICENSE_Back_Photo = models.FileField(upload_to='Dealer_License_Img')
    Vehicle_No = models.CharField(max_length=25)
    RC_BOOK_Photo = models.FileField(upload_to='Dealer_RCBook_Img')
    Bank_Acc = models.BigIntegerField(null=True)
    IFSC_CODE = models.CharField(max_length=40,null=True)
    Bank_AccountName = models.CharField(max_length=40,null=True)
    Bank_Statement_Photo = models.FileField(upload_to='Bank_Statement')
    PassBook_Photo = models.FileField(upload_to='PassBook_Photo')
    Vehicle_Type = models.CharField(max_length=30,null = True)
    Fees_Paid = models.CharField(max_length=30,choices=[('notPaid','NotPaid'),('paid','Paid')],default='notpaid')
    application_status = models.CharField(max_length=20,default='waiting')
    requirements = models.TextField(null=True,blank=True)
    extradata_field1 = models.FileField(upload_to='Extra_Images',null=True,blank=True)
    extradata_field2 = models.FileField(upload_to='Extra_Images',null=True,blank=True)
    extradata_field3 = models.FileField(upload_to='Extra_Images',null=True,blank=True)
    extradata_field4 = models.FileField(upload_to='Extra_Images',null=True,blank=True)
    dealer_message = models.TextField(null=True,blank=True)
    aadhar_PDF = models.FileField(upload_to='AadharPDF',null=True,blank=True)


# class order_details(models.Model): 
#     order_details_id=models.AutoField(primary_key=True) 
#     order_id=models.IntegerField() 
#     scrap_type_id=models.IntegerField() 
#     quantity_kg=models.IntegerField() 
#     price_pr_kg=models.IntegerField() 
#     total_price=models.IntegerField()

class scrap_selection(models.Model):
    # scrap_name = models.CharField(max_length=50,null=True)
    # scrap_price = models.IntegerField(null=True)
    scrap_name = models.JSONField(null=True)  # Stores the JSON representation of titles
    scrap_price = models.JSONField(null=True) 
    scrap_image = models.ImageField(upload_to="Scrap_Selection_Images",null=True)
    date = models.CharField(max_length=50,null=True)
    time = models.CharField(max_length=50,null=True)
    address = models.CharField(max_length=50,null=True)
    status = models.CharField(max_length=50,null=True,default='pending')


class Notification(models.Model):
    title = models.CharField(max_length=255)
    message = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)  # Null for global notifications
    is_global = models.BooleanField(default=False)  # True if it's for all users
    created_at = models.DateTimeField(auto_now_add=True)

from django.db import models

class Bankdetails(models.Model):
    id = models.AutoField(primary_key=True)
    account_holder_name = models.CharField(max_length=50)
    account_number = models.IntegerField(null=True)
    bank_name = models.CharField(max_length=50)
    branch = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=20,null=True)

    def __str__(self):
        return f"{self.account_holder_name} - {self.account_number}"

class Base64File(models.Model):
    file_name = models.CharField(max_length=255)
    file_data = models.TextField()