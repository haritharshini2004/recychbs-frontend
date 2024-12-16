# from django.contrib.auth.backends import ModelBackend
# from django.contrib.auth import get_user_model
# from django.db.models import Q

# class UsernamePhoneBackend(ModelBackend):
#     """
#     Custom authentication backend that requires both username and phone number
#     for authentication.
#     """

#     def authenticate(self, request,  phone_number=None, username=None, password=None, **kwargs):
#         UserModel = get_user_model()

#         if not username or not phone_number:
#             # Raise an exception for missing credentials
#             raise ValueError('Both username and phone number are required for login.')

#         try:
#             user = UserModel.objects.get(Q(phone_number=phone_number) & Q(username=username))

#             print("user is-",user)

#             if user.check_password(password):
#                 return user
#             return None  # Password doesn't match
#         except UserModel.DoesNotExist:
#             return None  # User not found
#         except UserModel.MultipleObjectsReturned:
#             # Handle multiple users with the same username and phone number
#             # (this should not happen with unique phone numbers)
#             return None

#     def get_user(self, user_id):
#         UserModel = get_user_model()
#         try:
#             return UserModel.objects.get(pk=user_id)
#         except UserModel.DoesNotExist:
#             return None