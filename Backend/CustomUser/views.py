from django.contrib.auth import login,authenticate
from .models import *
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.shortcuts import render,get_object_or_404
import logging
import os
from django.views.generic import TemplateView
from django.contrib.auth import login as django_login
from django.contrib.auth.hashers import make_password
from .utils import check_email_validity
from django.core.mail import send_mail
# from django.contrib.auth import views as auth_views
import requests
import random
from twilio.rest import Client
from django.db import connection
# from HBS_Project.backends import EmailBackend


# for email template
from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth import get_user_model
from rest_framework.views import APIView,View
from rest_framework.response import Response
from django.conf import settings
from rest_framework.renderers import JSONRenderer

# for pdf convertion 

from django.core.files import File
import boto3
from io import BytesIO
from PIL import Image
from reportlab.lib.pagesizes import landscape, letter
from reportlab.pdfgen import canvas
from PIL import Image, UnidentifiedImageError
from django.http import HttpResponseServerError,HttpResponseBadRequest
import uuid

# for notification
from plyer import notification

# for location 
# Location
from django.contrib.auth import get_user_model
from geopy.distance import great_circle

User = get_user_model()  # Reference to the User model

from django.contrib.auth import get_user_model
from geopy.distance import great_circle

# from win10toast import ToastNotifier

# class IndexView(TemplateView):
#     def get_template_names(self):
#         # Construct the full path to the index.html file
#         template_path = os.path.join(settings.BASE_DIR, 'dist', 'index.html')
        
#         # Log the path for debugging
#         logging.debug(f"Serving template: {template_path}")
        
#         # Return the template path
#         return [template_path]


# Application Status

@csrf_exempt
def approve_dealer(request):
    try:
        if request.method == 'POST':
            data = json.loads(request.body)
            status = data.get('status')
            dealer_id = data.get('dealer_id') 
            dealer_email = data.get('dealer_email') 
            requirement = data.get('inputValue')

            print(status)
            print(dealer_id)
            print(requirement)
            print(dealer_email)

            table = Dealer_Details.objects.get(id = dealer_id)
            dealer_name = table.Dealer_Name

            table.application_status = status
            table.requirements = requirement
            table.save()

            # message =""
        if status == "approved":
            # Load the HTML template and render it with context
                html_content = render_to_string('email_templates/dealer_AcceptEmail.html', {'dealer_name': dealer_name})
                # Create a plain-text version by stripping HTML tags
                text_content = strip_tags(html_content)
                
                subject = 'Welcome to Our Service!'
                from_email = settings.EMAIL_HOST_USER
                to_email =dealer_email
                
                # Create the email
                email = EmailMultiAlternatives(subject, text_content, from_email, [to_email])
                email.attach_alternative(html_content, "text/html")  # Attach HTML content
        
                # Send the email
                email.send()
        #         send_mail(
        #     "Accepet your request",
        #     message,
        #     settings.EMAIL_HOST_USER,
        #     ["kalai73579@gmail.com"],
        #     fail_silently=False
        # )
        connection.close()
    except Exception as e:
        print("The error is ",e)

    return JsonResponse({"message ":"Updated successfully"},status = 200)


def fetch_approve_dealer(request):
    try:
        user = request.user.id
        id = DealerProfile.objects.get(user_id=user)
        dealer_id = id.Dealer_ID
        print(dealer_id)

        print("User:", request.user)
        print("Authenticated:", request.user.is_authenticated)



        data  = list(Dealer_Details.objects.filter(Dealer_ID=dealer_id).values())
        connection.close()

    except Exception as e:
        print(e)

    return JsonResponse(data,safe=False,status = 200)

def send_extraData(request):
    user = request.user.id
    dealer_data = DealerProfile.objects.get(user_id=user)
    dealer_id = dealer_data.Dealer_ID
        # Access the file(s) from request.FILES
    file1 = request.FILES.getlist('file0')  # Adjust the index if you have multiple files
    file2 = request.FILES.getlist('file1')  # Adjust the index if you have multiple files
    file3 = request.FILES.getlist('file2')  # Adjust the index if you have multiple files
    file4 = request.FILES.getlist('file3')  # Adjust the index if you have multiple files

        # Access the message or boolean from request.POST
    message = request.POST.get('message')
    print('This is Backend Value - ',message)
    print('This is Backend  file1- ',file1)
    print('This is Backend file2 - ',file2)
    print('This is Backend file3 - ',file3)
    print('This is Backend file4 - ',file4)

    table = Dealer_Details.objects.get(Dealer_ID=dealer_id)
    table.dealer_message = message
    # Dynamically assign files or set None if list is empty
    table.extradata_field1 = file1[0] if file1 else None
    table.extradata_field2 = file2[0] if file2 else None
    table.extradata_field3 = file3[0] if file3 else None
    table.extradata_field4 = file4[0] if file4 else None

    table.save()

    print('This is Backend  file1 in DB- ',file1)
    print('This is Backend file2 in DB- ',file2)
    print('This is Backend file3 in DB- ',file3)
    print('This is Backend file4 in DB- ',file4)
    connection.close()
    

    return JsonResponse({'message':'Upload successfuly'},status=200)

# Dealer Register Block
# @csrf_exempt
# def register_form(request):
#     if request.method == 'POST':
#         data = json.loads(request.body)
#         name = data.get('name')
#         contact = data.get('contact')
#         email = data.get('email')
#         password = data.get('password')
#         address = data.get('address')
#         city = data.get('city')
#         state = data.get('state')
#         nationalty = data.get('nationality')
#         pincode = data.get('pincode')
#         terms = data.get('terms')


#         address = f"{address},{city},{state},{nationalty},{pincode}"
#         print(address)
#         if Dealer_Table.objects.filter(username=name).exists():
#             return JsonResponse({"error":"UserName Already Taken"},status=400)
#         elif Dealer_Table.objects.filter(email=email).exists():
#             return JsonResponse({"error":"SomeOne Already Login with this Email"},status=400)
#         elif Dealer_Table.objects.filter(Phone_Number=contact).exists():
#             return JsonResponse({"error":"SomeOne Already Login with this Number"},status=400)

#         dealer = Dealer_Table.objects.create_user(username=name, email=email,Phone_Number=contact, Address=address,password=password)
#         dealer.save()
        
#         return JsonResponse({'message': 'Registered Successfully'})

#     return JsonResponse({'error': 'Invalid request'}, status=400)

# # Dealer Login Block
# @csrf_exempt
# def login_form(request):
#     if request.method == 'POST':
#         data = json.loads(request.body)
#         name = data.get('username')
#         password = data.get('password')


#         print(name,password)

#         dealer = authenticate(request,username=name,password=password)

#         if dealer is not None:
#             print("Authendicated USer",dealer)
#             login(request,dealer)
#             print("Authendicated USer After",request.user.Dealer_ID)
#             print(f"Authenticated: {request.user.is_authenticated}")  # Should be True if logged in

#             user = request.user  # Assuming the user is logged in
#             if Dealer_Details.objects.filter(Dealer_ID=request.user.Dealer_ID).exists():
#                 details_sent = "True"
#                 print("form already sent")
#             else:
#                 details_sent = "False"
#                 print("form doesn't  sent yet")


#         else:
#             return JsonResponse({"error":"Incorrect Username Or Password"},status=400)
#         return JsonResponse({"message":"Login Successfully","form_submitted":details_sent},status=200)
#     return JsonResponse({"error":"Invalid Request","status":"F"},status=400)






@csrf_exempt# OTP Block
def otp_send(request):
    # validated = request.session['validated'] 
    # if validated:
    # try:
        if request.method == 'POST':
            # Prompt user to enter the OTP
            register_data = request.session['data']

            username = register_data.get('name')
            email = register_data.get('email')
            Phone_Number = register_data.get('contact')
            password = make_password(register_data.get('password'))
            role = register_data.get('role')

            print("This is From OTP block  -", email)
            print("This is From OTP block  data-", register_data)





            

            if role == User.USER:
                address = register_data.get('address')
                city = register_data.get('city')
                state = register_data.get('state')
                pincode = register_data.get('pincode')
                Natioanality = register_data.get('country')
                street = register_data.get('street')


                Address = f"{address},{street},{city},{state},{pincode}"
                    # OTP Block
                # response =  request.session['otp_response']
                
                # Check the response
                # if response.status_code == 201:
                # print(response.json())[]

                # Prompt user to enter the OTP
                # entered_otp = input("Enter the OTP you received: ")

                    # Compare the entered OTP with the generated OTP
                data = json.loads(request.body)
                entered_otp = data.get('enteredOtp')

                otp = request.session.get('otp')
        
                print("Generated OTP -",otp)
                print("Generated String  OTP -",str(otp))
                print("Entered String  OTP -",entered_otp)
                # if resend_otp:
                #     if str(resend_otp) == entered_otp:
                #         print("OTP verification successful!")

                #                 # Create user
                #         user = User(username=username, email=email, password=password,phone_number=Phone_Number, role=role)
                #         user.save()

                #         user_creation  =  UserProfile.objects.create(
                #                 user=user,
                #                 User_Name = username,
                #                 Email = email,
                #                 Address = address,
                #                 Phone_Number = Phone_Number,
                #                 Nationality = Natioanality

                #             )
                #         if user_creation:
                #             register_message = "Welcome to RECYCHBS! We’re excited to have you join our community. Your registration has been successfully completed, and you are now ready to start scheduling scrap pickups from your home or business.Explore our app to see how easy it is to dispose of your scrap responsibly while contributing to a greener environment. You can book a dealer, track your orders, and much more, all from the comfort of your device.Thank you for choosing RECYCHBS"
                #             send_mail(
                #                 "Welcome to RECYCHBS- Successful Registration!",
                #                 register_message,
                #                 settings.EMAIL_HOST_USER,
                #                 [email],
                #                 fail_silently=False
                #             )
                #         return JsonResponse({'message': 'User registered successfully'}, status=201)

                #     else:
                #         print("Incorrect OTP. Please try again.")
                #         return JsonResponse({"otp_error":"Incorrect OTP. Please try again."},status=400)
                # else:
                if str(otp) == entered_otp:
                    print("OTP verification successful!")

                            # Create user
                    user = User(username=username, email=email, password=password,phone_number=Phone_Number, role=role)
                    user.save()

                    user_creation  =  UserProfile.objects.create(
                            user=user,
                            User_Name = username,
                            Email = email,
                            Address = Address,
                            Phone_Number = Phone_Number,
                            Nationality = Natioanality

                        )
                    if user_creation:


                        
                                    # Load the HTML template and render it with context
                        html_content = render_to_string('email_templates/user_RegisterEmail.html', {'user_name': username})
                        # Create a plain-text version by stripping HTML tags
                        text_content = strip_tags(html_content)
                        
                        subject = 'Welcome to Our Service!'
                        from_email = settings.EMAIL_HOST_USER
                        to_email = email
                        
                        # Create the email
                        email = EmailMultiAlternatives(subject, text_content, from_email, [to_email])
                        email.attach_alternative(html_content, "text/html")  # Attach HTML content
                
                        # Send the email
                        email.send()
                        # register_message = "Welcome to RECYCHBS! We’re excited to have you join our community. Your registration has been successfully completed, and you are now ready to start scheduling scrap pickups from your home or business.Explore our app to see how easy it is to dispose of your scrap responsibly while contributing to a greener environment. You can book a dealer, track your orders, and much more, all from the comfort of your device.Thank you for choosing RECYCHBS"
                        # send_mail(
                        #     "Welcome to RECYCHBS- Successful Registration!",
                        #     register_message,
                        #     settings.EMAIL_HOST_USER,
                        #     [email],
                        #     fail_silently=False
                        # )
                    return JsonResponse({'message': 'User registered successfully'}, status=201)

                else:
                    print("Incorrect OTP. Please try again.")
                    return JsonResponse({"otp_error":"Incorrect OTP. Please try again."},status=400)
                    

            elif role == User.DEALER:
                address = register_data.get('address')
                city = register_data.get('city')
                state = register_data.get('state')
                pincode = register_data.get('pincode')
                Natioanality = register_data.get('country')
                street = register_data.get('street')

                Address = f"{address},{street},{city},{state},{pincode}"
                
                    # Compare the entered OTP with the generated OTP
                data = json.loads(request.body)
                entered_otp = data.get('enteredOtp')

                otp = request.session.get('otp')
                # resend_otp = request.session['resend_otp']
        
                print("Generated OTP -",otp)
                print("Generated String  OTP -",str(otp))
                print("Entered String  OTP -",entered_otp)

                if str(otp)  == entered_otp:
                    print("OTP verification successful!")
                    # Create user
                    user = User(username=username, email=email, password=password,phone_number=Phone_Number,  role=role)
                    user.save()

                    dealer = DealerProfile.objects.create(
                        user=user,
                        Dealer_Name = username,
                        Phone_Number = Phone_Number,
                        Email = email,
                        Natioanality = Natioanality,
                        Address = Address
                    )
                    if dealer:

                                    # Load the HTML template and render it with context
                        html_content = render_to_string('email_templates/dealer_RegisterEmail.html', {'dealer_name': username})
                        # Create a plain-text version by stripping HTML tags
                        text_content = strip_tags(html_content)
                        
                        subject = 'Welcome to Our Service!'
                        from_email = settings.EMAIL_HOST_USER
                        to_email = email
                        
                        # Create the email
                        email = EmailMultiAlternatives(subject, text_content, from_email, [to_email])
                        email.attach_alternative(html_content, "text/html")  # Attach HTML content
                
                        # Send the email
                        email.send()
                        # registration_message = "We are thrilled to welcome you to RECYCHBS! Your registration has been successfully completed, and you are now part of our trusted network of scrap dealers.With RECYCHBS, you’ll be able to receive scrap collection orders from users in your area, making it easier to grow your business while contributing to environmental sustainability.We are excited to have you on board and look forward to working with you to create a cleaner, greener community."
                        # send_mail(
                        #     "Welcome to RECYCHBS-Successful Registration!",
                        #     registration_message,
                        #     settings.EMAIL_HOST_USER,
                        #     [email],
                        #     fail_silently=False
                        # )
                    return JsonResponse({'message': 'User registered successfully'}, status=201)

                else:
                    print("Incorrect OTP. Please try again.")
                    return JsonResponse({"otp_error":"Incorrect OTP. Please try again."},status=400)
            elif role == User.ADMIN:
                AdminProfile.objects.create(
                    user=user,
                    role_description=data.get('role_description')
                )

            return JsonResponse({'message': 'User registered successfully'}, status=201)
    # except Exception as e:
        # print("Exeption is :", e)
        connection.close()

        return JsonResponse({"error":"Invalid Method!"},status=405)
 
        # return JsonResponse({"error":"Invalid Method!"},status=405)
 

@csrf_exempt
def resend_otp_view(request):
    try:
        if request.method == 'POST':
            register_data = request.session['data']
            Phone_Number = "+91"+register_data.get('contact')
            print("Resend OTP To Phone Number-",Phone_Number)
            # Generate new OTP
            otp = random.randint(100000, 999999)
            request.session['otp'] = otp
                        # OTP Block

            # Generate a random 6-digit OTP
 
            account_sid = 'AC4bd461d7feabbbb3a965be18679e34a7'
            auth_token = '48ca48d86856dac29d4dab1a782a660c'
            client = Client(account_sid, auth_token)
            message = client.messages.create(
            from_='+1 913 270 1336',  # Note the underscore after from
            body = f"Your OTP code is {otp}. Please use this to verify your account.", # OTP message content
            to= Phone_Number
            )

            print(message)

            return JsonResponse({'message': 'OTP resent successfully!'})

                    # Sinch API endpoint and credentials
    #         api_url = 'https://sms.api.sinch.com/xms/v1/456369915e064a8084afe1230a57cb33/batches'
    #         api_key = 'ba911ea3bb0643b18b060eab5170ae7b' 
            
    #         # Generate a random 6-digit OTP
    #         otp = random.randint(100000, 999999)
    #         print(f"Generated OTP: {otp}")  # This is just for testing, remove it in production
    #         request.session['otp'] = otp
    #         # SMS details
    #         payload = {
    #             "from": "+1 913 270 1336",  # Sender's number
    #             "to": [Phone_Number],  # Recipient's number (replace with the actual phone number)
    #             "body": f"Your OTP code is {otp}. Please use this to verify your account."  # OTP message content
    #         }
               
    #         headers = {
    #             "Authorization": f"Bearer {api_key}",
    #             "Content-Type": "application/json"
    #         }
    
    #         # Send the OTP via the Sinch API
    #         response = requests.post(api_url, headers=headers, data=json.dumps(payload))
    
    #         if response.status_code == 201:
    #             return JsonResponse({'message': 'OTP resent successfully!'})
    #         else:
    #             return JsonResponse({'message': 'Failed to resend OTP.'}, status=500)
    except Exception as e:
        print(e)
    connection.close()
 
    return JsonResponse({'message': 'Invalid request method.'}, status=400)

# def register_view(request):
#     try:
#         if request.method == 'POST':
#             data = json.loads(request.body)
#             request.session['data'] = data
#             email = data.get('email')
#             Phone_Number = data.get('contact')
#             role = data.get('role')

#             is_valid = verify_email_hunter(email)
#             valid_email = ""
#             print("email is verified-",is_valid)
#             print("Before Email valid value",valid_email)
#             if is_valid:
#                 valid_email = "Email is Valid"
#                     # Create user profile based on role
#                 print("In IF",valid_email)


#                 if role == User.USER:
#                     address = data.get('address')
#                     city = data.get('city')
#                     state = data.get('state')
#                     pincode = data.get('pincode')
#                     Natioanality = data.get('nationality')

#                     request.session['validated'] = False

#                     address = f"{address},{city},{state},{pincode}"
#                     if UserProfile.objects.filter(Email=email).exists():
#                         return JsonResponse({"error":"SomeOne Already Login with this Email"},status=400)
#                     elif UserProfile.objects.filter(Phone_Number=Phone_Number).exists():
#                         return JsonResponse({"error":"SomeOne Already Login with this Number"},status=400)
#                     elif User.objects.filter(email=email).exists():
#                         return JsonResponse({"error":"SomeOne Already Login with this Email"},status=400)
#                     elif User.objects.filter(phone_number=Phone_Number).exists():
#                         return JsonResponse({"error":"SomeOne Already Login with this Number"},status=400)
#                     else:
#                         request.session['validated'] = True

#                 elif role == User.DEALER:
#                     data = json.loads(request.body)
#                     address = data.get('address')
#                     city = data.get('city')
#                     state = data.get('state')
#                     pincode = data.get('pincode')
#                     request.session['validated'] = False

#                     address = f"{address},{city},{state},{pincode}"
#                     if DealerProfile.objects.filter(Email=email).exists():
#                         return JsonResponse({"error":"SomeOne Already Login with this Email"},status=400)
#                     elif DealerProfile.objects.filter(Phone_Number=Phone_Number).exists():
#                         return JsonResponse({"error":"SomeOne Already Login with this Number"},status=400)
#                     elif User.objects.filter(email=email).exists():
#                         return JsonResponse({"error":"SomeOne Already Login with this Email"},status=400)
#                     elif User.objects.filter(phone_number=Phone_Number).exists():
#                         return JsonResponse({"error":"SomeOne Already Login with this Number"},status=400)
#                     else:
#                         request.session['validated'] = True

#                 elif role == User.ADMIN:
#                     AdminProfile.objects.create(
#                         user='user',
#                         role_description=data.get('role_description')
#                     )





#                         # OTP Block
#                     # Sinch API endpoint and credentials
#                 # api_url = 'https://sms.api.sinch.com/xms/v1/4d360488b7d24cfe9ebbce4d1f25d4b4/batches'
#                 # api_key = '569d28ad9d3d4c3ead55ed47e88671c7'  # Replace with your actual API key
#                 api_url = 'https://sms.api.sinch.com/xms/v1/2465fcd1de8c49ea989e138559b4ce9f/batches'
#                 api_key = 'cc31b0f9677e43c29b3c27e9eb45b0aa'  # Replace with your actual API key
                
#                 # Generate a random 6-digit OTP
#                 otp = random.randint(100000, 999999)
#                 print(f"Generated OTP: {otp}")  # This is just for testing, remove it in production
#                 request.session['otp'] = otp
#                 # SMS details
#                 payload = {
#                     # "from": "447520651333",  # Sender's number
#                     "from": "447520651020",  # Sender's number
#                     "to": ["918838983063","919003658692"],  # Recipient's number (replace with the actual phone number)
#                     "body": f"Your OTP code is {otp}. Please use this to verify your account."  # OTP message content
#                 }
                
#                 # Headers
#                 headers = {
#                     "Authorization": f"Bearer {api_key}",
#                     "Content-Type": "application/json"
#                 }
                
#                 # Send the POST request
#                 response = requests.post(api_url, headers=headers, data=json.dumps(payload))
                
#                 # request.session['otp_response'] = response
                


#                 print("Generated OTP -",otp)
#                 return JsonResponse({'message': 'User registered successfully'}, status=201)
#             else:
#                 valid_email = "Invalid Email.please enter a valid Email"
#                 print("In else",valid_email)
#                 return JsonResponse({'email_error':valid_email},status=400)
            
#     except Exception as e:
#         print("Exeption is ",e)
#     return JsonResponse({'error': 'Invalid method'}, status=405)
@csrf_exempt# OTP Block
def register_view(request):
    try:
        if request.method =='POST':
            data = json.loads(request.body)
            print(data)
            request.session['data'] = data
            email = data.get('email')
            print(email)
            Phone_Number = data.get('contact')
            role = data.get('role')
 
            # is_valid = verify_email_hunter(email)
            result = check_email_validity(email)
            is_valid = result.get('debounce', {}).get('result') == 'Safe to Send'
            # return JsonResponse({'is_valid': is_valid, 'result': result})
            valid_email = ""
            print("email is verified-",result)
            print("email is is_valid-",is_valid)
            print("Before Email valid value",valid_email)
            print("debounce result ",result.get('debounce', {}).get('result'))
            print(role)
            # if 'Invalid' in result:

            # elif 'error' in result:
            #     # Handle error, e.g., return the error message
            #     return JsonResponse({'error': result['error']}, status=500)
            if result.get('result') == 'Safe to Send':
                valid_email = "Email is Valid"
                    # Create user profile based on role
                # print("In IF",valid_email)
                print("debounce result ",result.get('debounce', {}).get('result'))
 
                if role == User.USER:
                    address = data.get('address')
                    city = data.get('city')
                    state = data.get('state')
                    pincode = data.get('pincode')
                    Natioanality = data.get('country')
 
                    request.session['validated'] = False
 
                    address = f"{address},{city},{state},{pincode}"
                    print(address)
                    if UserProfile.objects.filter(Email=email).exists():
                        return JsonResponse({"error":"SomeOne Already Login with this Email"},status=400)
                    elif UserProfile.objects.filter(Phone_Number=Phone_Number).exists():
                        return JsonResponse({"error":"SomeOne Already Login with this Number"},status=400)
                    elif User.objects.filter(email=email).exists():
                        return JsonResponse({"error":"SomeOne Already Login with this Email"},status=400)
                    elif User.objects.filter(phone_number=Phone_Number).exists():
                        return JsonResponse({"error":"SomeOne Already Login with this Number"},status=400)
                    else:
                        request.session['validated'] = True
 
                elif role == User.DEALER:
                    data = json.loads(request.body)
                    address = data.get('address')
                    city = data.get('city')
                    state = data.get('state')
                    pincode = data.get('pincode')
                    Natioanality = data.get('country')
                    request.session['validated'] = False
 
                    address = f"{address},{city},{state},{pincode}"
                    if DealerProfile.objects.filter(Email=email).exists():
                        return JsonResponse({"error":"SomeOne Already Login with this Email"},status=400)
                    elif DealerProfile.objects.filter(Phone_Number=Phone_Number).exists():
                        return JsonResponse({"error":"SomeOne Already Login with this Number"},status=400)
                    elif User.objects.filter(email=email).exists():
                        return JsonResponse({"error":"SomeOne Already Login with this Email"},status=400)
                    elif User.objects.filter(phone_number=Phone_Number).exists():
                        return JsonResponse({"error":"SomeOne Already Login with this Number"},status=400)
                    else:
                        request.session['validated'] = True
 
                elif role == User.ADMIN:
                    AdminProfile.objects.create(
                        user='user',
                        role_description=data.get('role_description')
                    )
            else:
                valid_email = "Invalid Email.please enter a valid Email"
                print("In else-",valid_email)
                return JsonResponse({'email_error':valid_email},status=400)
 
 
                                        # OTP Block
            otp_phoneNumber = "+91"+Phone_Number
            print("To phone Number-",otp_phoneNumber)
            
            # Generate a random 6-digit OTP
            otp = random.randint(100000, 999999)
            print(f"Generated OTP: {otp}")  # This is just for testing, remove it in production
            request.session['otp'] = otp
 
            account_sid = 'AC4bd461d7feabbbb3a965be18679e34a7'
            auth_token = '48ca48d86856dac29d4dab1a782a660c'
            client = Client(account_sid, auth_token)
            message = client.messages.create(
            from_='+1 913 270 1336',  # Note the underscore after from
            body = f"Your OTP code is {otp}. Please use this to verify your account.", # OTP message content
            to= otp_phoneNumber
            )

            print(message)

            return JsonResponse({'message': 'OTP sent successfully!'})


                # Sinch API endpoint and credentials
            # api_url = 'https://sms.api.sinch.com/xms/v1/f67f159d17fd478e85a72f94d36625c1/batches'
            # api_key = '21966bb551004d9d88ca76e53ebb50ee'  # Replace with your actual API key
            # api_url = 'https://sms.api.sinch.com/xms/v1/456369915e064a8084afe1230a57cb33/batches'
            # api_key = 'ba911ea3bb0643b18b060eab5170ae7b'  # Replace with your actual API key
            
            # # Generate a random 6-digit OTP
            # otp = random.randint(100000, 999999)
            # print(f"Generated OTP: {otp}")  # This is just for testing, remove it in production
            # request.session['otp'] = otp
            # otp_phoneNumber = "91"+Phone_Number
            # print("To phone Number-",otp_phoneNumber)
            # # SMS details
            # payload = {
            #     "from": "+1 913 270 1336",   # Sender's number 447520652219
            #     "to": [otp_phoneNumber],  # Recipient's number (replace with the actual phone number)
            #     "body": f"Your OTP code is {otp}. Please use this to verify your account."  # OTP message content
            # }
            
            # # Headers
            # headers = {
            #     "Authorization": f"Bearer {api_key}",
            #     "Content-Type": "application/json"
            # }
            
            # # Send the POST request
            # response = requests.post(api_url, headers=headers, data=json.dumps(payload))
            # print("Generated OTP -",otp)

                
            # if response.status_code == 201:
            #     return JsonResponse({'message': 'OTP resent successfully!'})
            # else:
            #     return JsonResponse({'message': 'Failed to resend OTP.'}, status=500)
            
            # request.session['otp_response'] = response

            # return JsonResponse({'message': 'User registered successfully'}, status=201)
            
    except Exception as e:
        print("Exeption is ",e)
    connection.close()
    return JsonResponse({'error': 'Invalid method'}, status=405)
@csrf_exempt
def login_view(request):
    print("login in function entered")
    try:
        # if request.method == 'POST':
                data = json.loads(request.body)
                # email = data.get('email')
                # phone_number = data.get('contact')
                # username = request.POST['username']
                # password = request.POST['password']
                        # Access the formData fields and activeLogin
                user_data = data.get('user', {})
                dealer_data = data.get('dealer', {})
                loginType = data.get('loginType', '')


                print("login type is-",loginType)

                # email = request.POST['email']
                # password = request.POST['password']
                print(dealer_data['password'])
                print("Request POST is-",request.POST)
                print("Request POST is-",request.body)
                print("Request is-",request)



                # print("user is -",user)
                # if loginType == User.DEALER:
                #     email = dealer_data.get('email', '')
                #     password = dealer_data.get('password', '')
                #     user = authenticate(request, email=email, password=password)
                #     if user is not None:
                #         if User.objects.filter(email=email, role=User.DEALER).exists():
                #             django_login(request, user)
                #             user = request.user.id  # Assuming the user is logged in
                #             dealer = DealerProfile.objects.get(user_id=user)
                #             dealer_id = dealer.Dealer_ID
                #             data_exists = Dealer_Details.objects.filter(Dealer_ID=dealer_id).first()
                            
                #             if data_exists:
                #                 details_sent = "True"
                #                 print("form already sent")
                #                 application_status = data_exists.application_status
                #             else:
                #                 details_sent = "False"
                #                 print("form doesn't  sent yet")
                #             return JsonResponse({'message': 'Login successfull',"form_submitted":details_sent,"application_status":application_status}, status=200)
                #         else:
                #             return JsonResponse({'error': 'Incorrect Username Or Password'}, status=401)
                if loginType == User.DEALER:
                    print("its in login dealer")
                    email = dealer_data['email']
                    password = dealer_data['password']
                    dealer_datas = DealerProfile.objects.get(Email=email)
                    dealer_data=True
                    # User = User.objects.get(Email=email, active=is_active)
                    print(dealer_data)
                    print(email,password)
                    if dealer_data:
                        print("inside dealer data")
                        user = authenticate(request, email=email, password=password)
                        print(user)
                        if user is not None:
                            print("crossed user is none")
                            if User.objects.filter(email=email, role="DEALER").exists():
                                django_login(request, user)
                                user = request.user.id  # Assuming the user is logged in
                                dealer = DealerProfile.objects.get(user_id=user)
                                dealer_id = dealer.Dealer_ID
                                if Dealer_Details.objects.filter(Dealer_ID=dealer_id).exists():
                                    details_sent = "True"
                                    print("form already sent")
                                else:
                                    details_sent = "False"
                                    print("form doesn't  sent yet")
                                return JsonResponse({'message': 'Login successfull',"form_submitted":details_sent}, status=200)
                            else:
                                return JsonResponse({'error': 'Incorrect Username Or Password'}, status=401)
                        else:
                             return JsonResponse({'error': 'its from user is none'}, status=401)
                    else:
                        return JsonResponse({'error': 'Your Account has been blocked by Admin'}, status=403)
    
                elif loginType == User.USER:
                    email = user_data.get('email', '')
                    password = user_data.get('password', '')
                    data=UserProfile.objects.get(Email=email)   
                    active=data.active
                    if active is True:
                        user = authenticate(request, email=email, password=password)
                        if user is not None:
                            if User.objects.filter(email=email, role=User.USER).exists():
                                django_login(request, user)
                                return JsonResponse({'message': 'Login successfull'}, status=200)
                            else:
                                return JsonResponse({'error': 'Incorrect Username Or Password'}, status=401)
                    else:
                        return JsonResponse({'error': 'Your Account has been blocked by Admin'}, status=403)
                else:
                    return JsonResponse({'error': 'Incorrect  UserName Or Password'}, status=401)
    except Exception as e:
        print(e)

    connection.close()

    # return JsonResponse({'error': 'Invalid method'}, status=405) 
    return JsonResponse({'error': ' laste error Incorrect  UserName Or Password'},status=405) 

# Forget Password


# Send reset password email
from django.template.loader import render_to_string

class PasswordResetRequestView(APIView):
    @csrf_exempt
    def post(self, request):
        email = request.data.get('email')
        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(email=email)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            reset_url = f"{settings.FRONTEND_URL}/reset/{uid}/{token}"

            # Render HTML email template with context
            html_message = render_to_string('password_reset/password_resetemail.html', {
                'user': user,
                'reset_url': reset_url,
            })

            subject = 'Password Reset Request'

            # Send the email with HTML content
            send_mail(
                subject,
                '',  # plain-text message can be left empty
                settings.EMAIL_HOST_USER,
                [user.email],
                html_message=html_message,  # passing the rendered HTML message here
            )

            return Response({"message": "Password reset email sent"}, status=200)
        except UserModel.DoesNotExist:
            return Response({"message": "User with this email does not exist"}, status=404)


# Confirm the new password
class PasswordResetConfirmView(APIView):
    renderer_classes = [JSONRenderer]
    @csrf_exempt
    def post(self, request, uidb64, token):
        new_password = request.data.get('password')
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
            if default_token_generator.check_token(user, token):
                user.set_password(new_password)
                user.save()
                return Response({"message": "Password reset successful"}, status=200)
            else:
                return Response({"message": "Invalid token"}, status=400)
        except User.DoesNotExist:
            return Response({"message": "User not found"}, status=404)

# from django.contrib.auth import views as auth_views

# class CustomPasswordResetView(auth_views.PasswordResetView):
#     template_name = 'password_reset/password_reset_form.html'  # Your custom template

# class CustomPasswordResetDoneView(auth_views.PasswordResetDoneView):
#     template_name = 'password_reset/password_reset_done.html'  # Your custom template

# class CustomPasswordResetConfirmView(auth_views.PasswordResetConfirmView):
#     template_name = 'password_reset/password_reset_confirm.html'  # Your custom template

# class CustomPasswordResetCompleteView(auth_views.PasswordResetCompleteView):
#     template_name = 'password_reset/password_reset_complete.html'  # Your custom template



# Create a PDF from images
# def images_to_pdf(image_files):
#     print("PDF FUNCTION CALLED")
#     print("PDF FUNCTION FILES-", image_files)
#     buffer = BytesIO()
#     c = canvas.Canvas(buffer, pagesize=landscape(letter))

#     images = []
#     for image_file in image_files:
#         try:
#             image = Image.open(image_file)
#             image.verify()  # Check if the image is valid
#             images.append(image)
#             print(f"Loaded image: {image_file}")
#         except UnidentifiedImageError:
#             print(f"Error: Unsupported image format for file {image_file}")
#             return None
#         except Exception as e:
#             print(f"Error loading image: {e}")
#             return None

#     if not images:
#         print("No valid images were loaded.")
#         return None

#     width, height = images[0].size  # Use the first image's dimensions

#     for image in images:
#         temp_image_path = f"/tmp/temp_image_{uuid.uuid4()}.png"
#         image.save(temp_image_path, format='PNG')
#         c.drawImage(temp_image_path, 0, 0, width=width, height=height)
#         os.remove(temp_image_path)

#     c.save()
#     buffer.seek(0)
#     return buffer



@csrf_exempt  # Only if you're handling CSRF in another way
def dealer_details(request):
    # Text Fields
    try:
        user = request.user.id
        # id = DealerProfile.objects.get(user_id=user)
        # dealer_id = id.Dealer_ID
        dealer_id = user
        name = request.POST.get('name')
        phone_number = request.POST.get('phoneNumber')
        mail_id = request.POST.get('mailId')
        DOB = request.POST.get('dateOfBirth')
        aadharNumber = request.POST.get('aadharNumber')
        panCardNumber = request.POST.get('panCardNumber')
        licenseNumber = request.POST.get('licenseNumber')
        vehicleNumber = request.POST.get('vehicleNumber')
        address = request.POST.get('address')
        # street = request.POST.get('street')
        city = request.POST.get('city')
        state = request.POST.get('state')
        postcode = request.POST.get('postcode')
        country = request.POST.get('country')
        Nationality = request.POST.get('nationality')
        bankAccountNumber = request.POST.get('bankAccountNumber')
        ifscCode = request.POST.get('ifscCode')
        bankAccountName = request.POST.get('bankAccountName')
        VehicleType = request.POST.get('vehicleType')
        aadhar_front = request.FILES.get('aadharfront')
        aadhar_back = request.FILES.get('aadharback')
        pan_card = request.FILES.get('panCard')
        license_file_front = request.FILES.get('licensefront')
        license_file_back = request.FILES.get('licenseback')
        print("license_file_back",license_file_back)
        RC_Book_file = request.FILES.get('vehicle')
        bank_statement = request.FILES.get('statement')
        bank_passBook = request.FILES.get('passbook')
        print("bank_passBook",bank_passBook)


        # Retrieve file1 base64 data and file name
        # aadhar_front_base64 = request.POST.get('aadharfront_base64')
        # aadhar_front_file_name = request.POST.get('adharfront_fileName')
        # print(aadhar_front_base64)
        # print(aadhar_front_file_name)
        # # Retrieve file2 base64 data and file name (if multiple files)
        # aadhar_back_base64 = request.POST.get('aadharback_base64')
        # aadhar_back_file_name = request.POST.get('aadharback_fileName')
        # print(aadhar_back_base64)
        # print(aadhar_back_file_name)

        # print(user)
    
        # print(f"aadhar- {aadhar_front.name}")
        # print(f"PanCard- {aadhar_back.name}")
        # print(f"Aadhar size from request: {aadhar_front.size} bytes")
        # print(f"PanCard size from request: {aadhar_back.size} bytes")
        # # Print the first few bytes for debugging (e.g., first 100 bytes)
        # # print(f"Aadhar file content (first 100 bytes): {aadhar_content[:100]}")
        # # print(f"PanCard file content (first 100 bytes): {pan_card_content[:100]}")
        # print("Bucket-",settings.AWS_STORAGE_BUCKET_NAME)
        # if aadhar_front.size == 0 or aadhar_back.size == 0:
        #     return HttpResponseBadRequest("Uploaded files are empty.")

        # print(DUMMY_ID)

        # dealer = Dealer_Details(
        # Dealer_ID = dealer_id, 
        # Dealer_Name = name,
        # mail_id = mail_id,
        # DOB = DOB,
        # Phone_Number = phone_number,
        # Address = address,
        # Aadhar_No = aadharNumber,
        # Aadhar_Front_Photo = aadhar_front,
        # Aadhar_Back_Photo = aadhar_back,
        # PAN_No = panCardNumber,
        # PAN_Photo = pan_card,
        # LICENSE_No = licenseNumber,
        # LICENSE_Front_Photo = license_file_front,
        # LICENSE_Back_Photo = license_file_back,
        # Vehicle_No = vehicleNumber,
        # RC_BOOK_Photo = RC_Book_file,
        # City = city,
        # State = state,
        # Post_Code = postcode,
        # Country = country,
        # Nationality = Nationality,
        # Bank_AccountName = bankAccountName,
        # Bank_Acc = bankAccountNumber,
        # IFSC_CODE = ifscCode,
        # Bank_Statement_Photo = bank_statement,
        # PassBook_Photo = bank_passBook,
        # Vehicle_Type = VehicleType
        # )
        # dealer.save()


        # # if Dealer_Details.objects.filter(Dealer_ID=dealer_id).exists():
        # #     return JsonResponse({"error":"Dealer Details Already Sent"},status=400)
        # try:
        #     # Validate that files were uploaded
        #     if not aadhar_front or not aadhar_back:
        #         raise ValueError("Aadhar or Pan Card not uploaded correctly.")

        #     # Create a session with S3
        #     s3 = boto3.client('s3')

        #     # Reset the file pointers by seeking to the beginning for future operations
        #     aadhar_front.seek(0)
        #     aadhar_back.seek(0)

        #     # Read images into memory (BytesIO) once
        #     aadhar_front_content = aadhar_front.read()  # Store content as bytes
        #     aadhar_back_content = aadhar_back.read()
        #     # Print the first few bytes for debugging (e.g., first 100 bytes)
        #     print(f"Aadhar file content (first 100 bytes): {aadhar_front_content[:100]}")
        #     print(f"PanCard file content (first 100 bytes): {aadhar_back_content[:100]}")
        #     # DEBUG: Check the size of the bytes
        #     print(f"Aadhar size after read: {len(aadhar_front_content)} bytes")
        #     print(f"Pan card size after read: {len(aadhar_back_content)} bytes")

        #     # Reset the file pointers by seeking to the beginning for future operations
        #     aadhar_front.seek(0)
        #     aadhar_back.seek(0)

        #     # Upload images to S3 using the in-memory content
        #     image1_key = f'uploads/{aadhar_front.name}'
        #     image2_key = f'uploads/{aadhar_back.name}'

        #     # Upload to S3 (need BytesIO to upload)
        #     s3.upload_fileobj(BytesIO(aadhar_front_content), settings.AWS_STORAGE_BUCKET_NAME, image1_key)
        #     s3.upload_fileobj(BytesIO(aadhar_back_content), settings.AWS_STORAGE_BUCKET_NAME, image2_key)

        #     byteAadhar = BytesIO(aadhar_front_content)
        #     bytePan = BytesIO(aadhar_back_content)
        #     print("BYTE IO-",byteAadhar)
        #     print("BYTE IO-",bytePan)

        #     # Create PDF from in-memory images
        #     pdf_buffer = images_to_pdf([BytesIO(aadhar_front_content), BytesIO(aadhar_back_content)])

        #     if pdf_buffer is None:
        #         raise Exception("Failed to create PDF due to invalid image data")

        #     # Save PDF to S3
        #     pdf_key = f'uploads/aadhar_{uuid.uuid4()}.pdf'
        #     s3.upload_fileobj(pdf_buffer, settings.AWS_STORAGE_BUCKET_NAME, pdf_key)

        #     # Save the PDF model instance with the S3 URL
        #     pdf_instance = Dealer_Details()
        #     pdf_instance.aadharPDF = f'https://{settings.AWS_S3_CUSTOM_DOMAIN}/{pdf_key}'
        #     pdf_instance.save()

        # except Exception as e:
        #     print(f"Error in handle_upload: {e}")
        #     return HttpResponseServerError(f"Internal server error: {e}")




        # print("after")


        if Dealer_Details.objects.filter(Dealer_ID=dealer_id).exists():
            return JsonResponse({"error":"Dealer Details Already Sent"},status=400)

        dealer = Dealer_Details(
        Dealer_ID = dealer_id, 
        Dealer_Name = name,
        mail_id = mail_id,
        DOB = DOB,
        Phone_Number = phone_number,
        Address = address,
        Aadhar_No = aadharNumber,
        Aadhar_Front_Photo = aadhar_front,
        Aadhar_Back_Photo = aadhar_back,
        PAN_No = panCardNumber,
        PAN_Photo = pan_card,
        LICENSE_No = licenseNumber,
        LICENSE_Front_Photo = license_file_front,
        LICENSE_Back_Photo = license_file_back,
        Vehicle_No = vehicleNumber,
        RC_BOOK_Photo = RC_Book_file,
        City = city,
        State = state,
        Post_Code = postcode,
        Country = country,
        Nationality = Nationality,
        Bank_AccountName = bankAccountName,
        Bank_Acc = bankAccountNumber,
        IFSC_CODE = ifscCode,
        Bank_Statement_Photo = bank_statement,
        PassBook_Photo = bank_passBook,
        Vehicle_Type = VehicleType
        )
        dealer.save()
        print("dealer",dealer)
        print("Dealer Deatails Sent")
        connection.close()

        return JsonResponse({"message":"Form Sended","status":"S"},status=200)
    except Exception as e:
        print(e)
        return JsonResponse({"error":"Internel Error"},status=500)


# dealer Edit details page
# {
@csrf_exempt
def fetchDealerEditDetails(request):
    # Filter Dealer_Details and DealerProfile based on the logged-in user's ID
    print("userrr",request.user)
    print("request_user",request.user.id)
    # print("dealer_id",Dealer_id)

    dealer_profile_data = DealerProfile.objects.filter(user_id=request.user.id).first()
    print("dealer_profile_data",dealer_profile_data)
    dealer_details_data = Dealer_Details.objects.filter(Dealer_ID=dealer_profile_data.Dealer_ID).first()
    print("dealer_details_data",dealer_details_data)
    # Check if dealer details exist for the current user
    if not dealer_details_data:
        return JsonResponse({'error': 'Dealer details not found for the current user.'}, status=404)

    # Format the data for the current dealer
    formatted_dealer = {
        'name': dealer_details_data.Dealer_Name,  # Replace 'Name' with actual field name in your model
        'dob': dealer_details_data.DOB,  # Adjust field names as per your model
        'aadhar': dealer_details_data.Aadhar_No,
        'pan': dealer_details_data.PAN_No,
        'license': dealer_details_data.LICENSE_No,
        'vehicleNumber': dealer_details_data.Vehicle_No,
        'vehicleType': dealer_details_data.Vehicle_Type,
        'bankBookNo': dealer_details_data.Bank_Acc,
        'ifscCode': dealer_details_data.IFSC_CODE,
        'bankusername': dealer_details_data.Bank_AccountName,
        'address': dealer_details_data.Address,
        'city': dealer_details_data.City,
        'state': dealer_details_data.State,
        'pincode': dealer_details_data.Post_Code,
        'nationality': dealer_details_data.Nationality,
        'files': {
            'bankStatement': dealer_details_data.Bank_Statement_Photo.url if dealer_details_data.Bank_Statement_Photo else None,
            'aadharFrontImage': dealer_details_data.Aadhar_Front_Photo.url if dealer_details_data.Aadhar_Front_Photo else None,
            'aadharBackImage': dealer_details_data.Aadhar_Back_Photo.url if dealer_details_data.Aadhar_Back_Photo else None,
            'panImage': dealer_details_data.PAN_Photo.url if dealer_details_data.PAN_Photo else None,
            'licenseFrontImage': dealer_details_data.LICENSE_Front_Photo.url if dealer_details_data.LICENSE_Front_Photo else None,
            'licenseBackImage': dealer_details_data.LICENSE_Back_Photo.url if dealer_details_data.LICENSE_Back_Photo else None,
            'rcBookImage': dealer_details_data.RC_BOOK_Photo.url if dealer_details_data.RC_BOOK_Photo else None,
            'passbook': dealer_details_data.PassBook_Photo.url if dealer_details_data.PassBook_Photo else None,
        }
    }

    # Include phone and email from DealerProfile, if available
    if dealer_profile_data:
        formatted_dealer['phone'] = dealer_profile_data.Phone_Number  # Replace with actual field name in your DealerProfile model

    # Return the formatted dealer data as JSON
    return JsonResponse(formatted_dealer, safe=False, status=200)


@csrf_exempt
def updateDealerDetails(request):
    print("update_data")
    data = json.loads(request.body)

    print("recieved data is:",data)

    dealer_profile_data = DealerProfile.objects.get(user_id=request.user.id)
    dealer_details_data = Dealer_Details.objects.get(Dealer_ID=dealer_profile_data.Dealer_ID)
    

    dealer_details_data.Dealer_Name = data.get('name')
    dealer_details_data.DOB = data.get('dob')
    dealer_details_data.Aadhar_No = data.get('aadhar')
    dealer_details_data.PAN_No = data.get('pan')
    dealer_details_data.LICENSE_No = data.get('license')
    dealer_details_data.Vehicle_No = data.get('vehicleNumber')
    dealer_details_data.Vehicle_Type = data.get('vehicleType')
    dealer_details_data.Bank_Acc = data.get('bankBookNo')
    dealer_details_data.IFSC_CODE = data.get('ifscCode')
    dealer_details_data.Bank_AccountName = data.get('bankusername')
    dealer_details_data.Address = data.get('address')
    dealer_details_data.City = data.get('city')
    dealer_details_data.State = data.get('state')
    dealer_details_data.Post_Code = data.get('pincode')
    dealer_details_data.Nationality = data.get('nationality')

    dealer_details_data.save()

    dealer_profile_data.Phone_Number = data.get('phone')

    dealer_profile_data.save()
    
    return JsonResponse({"message":"Details Updated successfully"},status = 200)
# }



# Admin Site--------


@csrf_exempt
def Get_DealerDetails(request):
    # Fetch the data from the Dealer_Details model

    dealer_data = list(Dealer_Details.objects.values())
    # dealer_id  = Dealer_Details.objects.all()
    # dealer_profiles = list(DealerProfile.objects.filter(Dealer_ID = dealer_id).values())

    # Fetch all dealer details
    # dealer_data = list(Dealer_Details.objects.values())

    # Initialize a list to store dealer profiles
    dealer_profiles = []

    # Loop through each dealer in dealer_data
    for dealer in dealer_data:
        dealer_id = dealer['Dealer_ID']  # Access Dealer_ID from the current dealer

        # Filter DealerProfile based on the current dealer's Dealer_ID
        profiles = list(DealerProfile.objects.filter(Dealer_ID=dealer_id).values())
        
        # Append the profiles to dealer_profiles
        dealer_profiles.extend(profiles)


    print(dealer_profiles)
    
    data = {
        'dealer_details': dealer_data,
        'dealer_profiles': dealer_profiles
    }
    # Loop through each dealer and add the URL for each image field
    for dealer in dealer_data:
        dealer_details = Dealer_Details.objects.get(Dealer_ID=dealer['Dealer_ID'])
        
        # Add the full URLs for the image fields
        dealer['Aadhar_Front_Photo'] = dealer_details.Aadhar_Front_Photo.url if dealer_details.Aadhar_Front_Photo else None
        dealer['Aadhar_Back_Photo'] = dealer_details.Aadhar_Back_Photo.url if dealer_details.Aadhar_Back_Photo else None
        dealer['PAN_Photo'] = dealer_details.PAN_Photo.url if dealer_details.PAN_Photo else None
        dealer['LICENSE_Front_Photo'] = dealer_details.LICENSE_Front_Photo.url if dealer_details.LICENSE_Front_Photo else None
        dealer['LICENSE_Back_Photo'] = dealer_details.LICENSE_Back_Photo.url if dealer_details.LICENSE_Back_Photo else None
        dealer['RC_BOOK_Photo'] = dealer_details.RC_BOOK_Photo.url if dealer_details.RC_BOOK_Photo else None
        dealer['Bank_Statement_Photo'] = dealer_details.Bank_Statement_Photo.url if dealer_details.Bank_Statement_Photo else None
        dealer['PassBook_Photo'] = dealer_details.PassBook_Photo.url if dealer_details.PassBook_Photo else None
        dealer['extradata_field1'] = dealer_details.extradata_field1.url if dealer_details.extradata_field1 else None
        dealer['extradata_field2'] = dealer_details.extradata_field2.url if dealer_details.extradata_field2 else None
        dealer['extradata_field3'] = dealer_details.extradata_field3.url if dealer_details.extradata_field3 else None
        dealer['extradata_field4'] = dealer_details.extradata_field4.url if dealer_details.extradata_field4 else None
    connection.close()
    # Return the data as JSON
    return JsonResponse(data, safe=False, status=200)


@csrf_exempt
def Get_UserProfile(request):
    print("Function Called")
    data=list(UserProfile.objects.filter().values())
    for user in data:
        user_profile=UserProfile.objects.all()
    print("Data is -",data)
    # print("The user data is -",user_profile)

    # print("The Data is ",data)
    connection.close()
    return JsonResponse(data, safe=False, status=200)

# @csrf_exempt
# def Get_ExtraData(request):
#     data = list(Dealer_Details.objects.filter().values())

#     return JsonResponse(data,safe=False,status=200)



# User & Dealer Scrap  Settings

@csrf_exempt
def dealer_insert_scrap(request):
    try:
        data = json.loads(request.body)
        print(data)
        Scrap_Name = data.get('Scrap_Name')
        Scrap_Price = data.get('Current_Price_Per_KG')
        Scrap_Image = data.get('Scrap_Image')
        # now = datetime.now()
        # print(now)
    # print(Scrap_Image,Scrap_Name,Scrap_Price,Updated_Date)
 
        data = Dealer_ScrapDetails.objects.create(Scrap_Name = Scrap_Name,Current_Price_Per_KG=Scrap_Price,Scrap_Image=Scrap_Image)
 
        data.save()
        return JsonResponse({"message":"Scarp inserted Successfully"},status=200)
    # connection.close()
    except Exception as e:
        print(e)
 
   
@csrf_exempt
def dealer_update_scrap(request):
    try:
        # Parse JSON data from the request body
        body = json.loads(request.body)
       
        # Extract fields from the JSON data
        Scrap_id = body.get('Scrap_ID')
        Scrap_Name = body.get('Scrap_Name')
        Scrap_Price = body.get('Current_Price_Per_KG')
        Scrap_Image = body.get('Scrap_Image')
       
        # Debug prints to verify values are being received correctly
        print("Scrap ID:", Scrap_id)
        print("Scrap Name:", Scrap_Name)
        print("Scrap Price:", Scrap_Price)
        # print("Scrap Image:", Scrap_Image)
       
        # Retrieve the Scrap_Type object by Scrap_ID
        data = Dealer_ScrapDetails.objects.get(Scrap_ID=Scrap_id)
       
        # Update the fields with new values
        data.Scrap_Name = Scrap_Name
        data.Current_Price_Per_KG = Scrap_Price
        data.Scrap_Image = Scrap_Image
       
        # Save changes to the database
        data.save()
       
        # Return a success response
        return JsonResponse({"message": "Updated Successfully"}, status=200)
 
    except Dealer_ScrapDetails.DoesNotExist:
        return JsonResponse({"error": "Scrap_Type with the given Scrap_ID does not exist."}, status=404)
 
    except Exception as e:
        print(e)
        # Return an error response for other exceptions
        return JsonResponse({"error": str(e)}, status=500)
 
    finally:
        # Close the database connection
        connection.close()
     
 
 
@csrf_exempt
def dealer_delete_scrap(request):
    # Parse the JSON body from the request
    try:
        body = json.loads(request.body)
        Scrap_id = body.get('Scrap_ID')  # Extract the 'id' from the JSON data
        print(Scrap_id)
 
    # Get the bike object by its ID, or return a 404 if it doesn't exist
        Scrap = get_object_or_404(Dealer_ScrapDetails, Scrap_ID=Scrap_id)
    # Delete the bike object
        Scrap.delete()
    except (json.JSONDecodeError, KeyError):
        return JsonResponse({'error': 'Invalid data'}, status=400)
    # Return a success response
    return JsonResponse({'message': ' deleted successfully'}, status=200)
 
@csrf_exempt
def dealer_get_scrap(request):
    print("Function Called")
 
    data=list(Dealer_ScrapDetails.objects.filter().values())
    print("Data is -",data)
    # print("The user data is -",user_profile)
    # print("The Data is ",data)
    connection.close()
    return JsonResponse(data, safe=False, status=200)
 
@csrf_exempt
def user_get_scrap(request):
    print("Function Called")
 
    data=list(User_ScrapDetails.objects.filter().values())
    print("Data is -",data)
    # print("The user data is -",user_profile)
    # print("The Data is ",data)
    connection.close()
    return JsonResponse(data, safe=False, status=200)
 
@csrf_exempt
def user_delete_scrap(request):
    # Parse the JSON body from the request
    try:
        body = json.loads(request.body)
        Scrap_id = body.get('Scrap_ID')  # Extract the 'id' from the JSON data
        print(Scrap_id)
 
    # Get the bike object by its ID, or return a 404 if it doesn't exist
        Scrap = get_object_or_404(User_ScrapDetails, Scrap_ID=Scrap_id)
    # Delete the bike object
        Scrap.delete()
    except Exception as e:
        print(e)
        return JsonResponse({'error': 'Invalid data'}, status=400)
    # Return a success response
    return JsonResponse({'message': ' deleted successfully'}, status=200)
 
@csrf_exempt
def user_insert_scrap(request):
    try:
        data = json.loads(request.body)
        print(data)
        Scrap_Name = data.get('Scrap_Name')
        Scrap_Price = data.get('Current_Price_Per_KG')
        Scrap_Image = data.get('image')
        # now = datetime.now()
        # print(now)
    # print(Scrap_Image,Scrap_Name,Scrap_Price,Updated_Date)
 
        data = User_ScrapDetails.objects.create(Scrap_Name = Scrap_Name,Current_Price_Per_KG=Scrap_Price,Scrap_Image=Scrap_Image)
 
        data.save()
        return JsonResponse({"message":"Scarp inserted Successfully"},status=200)
    # connection.close()
    except Exception as e:
        print(e)
 
@csrf_exempt
def user_update_scrap(request):
    try:
        # Parse JSON data from the request body
        body = json.loads(request.body)
       
        # Extract fields from the JSON data
        Scrap_id = body.get('Scrap_ID')
        Scrap_Name = body.get('Scrap_Name')
        Scrap_Price = body.get('Current_Price_Per_KG')
        Scrap_Image = body.get('Scrap_Image')
       
        # Debug prints to verify values are being received correctly
        print("Scrap ID:", Scrap_id)
        print("Scrap Name:", Scrap_Name)
        print("Scrap Price:", Scrap_Price)
        # print("Scrap Image:", Scrap_Image)
       
        # Retrieve the Scrap_Type object by Scrap_ID
        data = User_ScrapDetails.objects.get(Scrap_ID=Scrap_id)
       
        # Update the fields with new values
        data.Scrap_Name = Scrap_Name
        data.Current_Price_Per_KG = Scrap_Price
        data.Scrap_Image = Scrap_Image
       
        # Save changes to the database
        data.save()
       
        # Return a success response
        return JsonResponse({"message": "Updated Successfully"}, status=200)
 
    except User_ScrapDetails.DoesNotExist:
        return JsonResponse({"error": "Scrap_Type with the given Scrap_ID does not exist."}, status=404)
 
    except Exception as e:
        print(e)
        # Return an error response for other exceptions
        return JsonResponse({"error": str(e)}, status=500)
 
    finally:
        # Close the database connection
        connection.close()






# User Site

def GetUserDetails(request):
    user_id = request.user.id
    print(user_id)
    item = UserProfile.objects.filter(id=user_id).values().first()
    if item:  
        return JsonResponse(item, safe=False,status=200)
    connection.close()
    
    return JsonResponse({'error': 'User Details not found'}, status=404)



def Get_Notification(request):
    print("Function Called")
    id=request.user
    print(id)
    data=list(Notification.objects.filter(user_id=request.user.id).values())
   
    print("Data is -",data)
    # print("The user data is -",user_profile)

    # print("The Data is ",data)
    connection.close()
    return JsonResponse(data, safe=False, status=200)

# User Site

# @csrf_exempt
# def SelectScrap(request):
#     if request.method == 'GET':
#         print("Fetching existing scrap types...")
#         data = list(Scrap_Type.objects.all().values())
#         for scrap in data:
#             scrap_type = Scrap_Type.objects.get(Scrap_ID=scrap['Scrap_ID'])
#             if scrap_type.Scrap_Image:
#                 scrap['Scrap_Image'] = scrap_type.Scrap_Image.url

#         return JsonResponse(data, safe=False, status=200)
#     # print("postttttttt")
#     elif request.method == 'POST':
#         print("Adding a new scrap type...")

#         # Print incoming request data
#         print("POST data:", request.POST)
#         print("FILES data:", request.FILES)

#         # Extract data from form fields
#         scrap_name = request.POST.get('scrap_name')
#         scrap_image = request.FILES.get('scrap_image')

#         print(f"Scrap Name: {scrap_name}")
#         print(f"Scrap Image: {scrap_image}")

#         # Validate the inputs
#         if scrap_name and scrap_image:
#             new_scrap = Scrap_Type.objects.create(Scrap_Name=scrap_name, Scrap_Image=scrap_image)
#             return JsonResponse({'message': 'Scrap type added successfully', 'scrap_id': new_scrap.Scrap_ID}, status=201)
#         else:
#             return JsonResponse({'error': 'Both scrap name and image are required'}, status=400)

#     return JsonResponse({'error': 'Invalid request method'}, status=400)

            

@csrf_exempt
def SelectScrap(request):
    if request.method == 'GET':
        print("Fetching scrap types...")

        # Fetching all scrap types
        data = list(User_ScrapDetails.objects.all().values())
        print("data", data)

        # Adding image URLs to each scrap type
        for scrap in data:
            scrap_type_instance = User_ScrapDetails.objects.get(Scrap_ID=scrap['Scrap_ID'])
            if scrap_type_instance.Scrap_Image:
                scrap['Scrap_Image'] = scrap_type_instance.Scrap_Image.url
                print("scrap['Scrap_Image'] ", scrap['Scrap_Image'])

        # Closing the database connection explicitly
        connection.close()

        # Returning the response with the data
        return JsonResponse(data, safe=False, status=200)

    return JsonResponse({'error': 'Invalid request method'}, status=400)



@csrf_exempt  # Use this only for development; implement CSRF protection in production
def save_bank_details(request):
    if request.method == 'POST':
        try:
            user=request.user
            # Retrieve the form data from request.POST
            account_holder_name = request.POST.get('accountHolderName')
            account_number = request.POST.get('accountNumber')
            bank_name = request.POST.get('bankName')
            branch = request.POST.get('branch')
            phone_number = request.POST.get('phoneNumber')

            print(account_holder_name)
            # Create a new Bankdetails instance
            bank_detail = Bankdetails(
                account_holder_name=account_holder_name,
                account_number=account_number,
                bank_name=bank_name,
                branch=branch,
                phone_number=phone_number,
            )
            bank_detail.save()  # Save the instance to the database

            # Return a success response
            return JsonResponse({'status': 'success', 'message': 'Bank details saved successfully'}, status=201)

        except Exception as e:
            print(e)
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
            

    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)

@csrf_exempt
def ScrapSelection(request):
    if request.method == 'POST':
        try:
            # Retrieve the selectedItems (JSON string)
            selected_items = request.POST.get('selectedItems')

            # Validate and parse selectedItems
            if selected_items:
                try:
                    # Parse the JSON string to a Python list of strings
                    selected_items = json.loads(selected_items)
                    if not selected_items:
                        return JsonResponse({'error': 'No selected items provided'}, status=400)
                except json.JSONDecodeError:
                    return JsonResponse({'error': 'Invalid JSON data in selectedItems'}, status=400)
            else:
                return JsonResponse({'error': 'selectedItems is missing'}, status=400)

            titles = []
            costs = []

            # Extract titles and costs from selected items
            for item in selected_items:
                # try:
                # Each item is a JSON string, so parse it to a dictionary
                item_dict = json.loads(item)
                # print("The Item is:", item_dict)
                
                title = item_dict.get('title')
                cost = item_dict.get('cost')



                # except json.JSONDecodeError:
                #     return JsonResponse({'error': 'Invalid JSON format for item'}, status=400)
                
                if title and cost is not None:
                    titles.append(title)
                    costs.append(cost)
                else:
                    return JsonResponse({'error': 'Each selected item must have both title and cost'}, status=400)

            print("Parsed Titles:", titles)
            print("Parsed Costs:", costs)
            if request.FILES.get('selectedFile'):
                # Retrieve the uploaded file
                selected_file = request.FILES.get('selectedFile')
                print("File uploaded:", selected_file)
            else:
                selected_file=None
                print("No File uploaded")


            # if not selected_file:
            #     return JsonResponse({'error': 'No file uploaded'}, status=400)

            # Convert titles and costs to JSON format
            scrap_name_json = json.dumps(titles)
            scrap_price_json = json.dumps(costs)

            try:
                # Create new scrap selection entry
                new_scrap = scrap_selection.objects.create(
                    scrap_name=scrap_name_json,
                    scrap_price=scrap_price_json,
                    scrap_image=selected_file
                )
                
                # Verify if it was created successfully
                if not new_scrap:
                    return JsonResponse({'error': 'Failed to create scrap selection'}, status=500)
                
                # print("New Scrap Created:", new_scrap)

                # Fetch the newly created scrap data from the database
                created_scrap = scrap_selection.objects.get(id=new_scrap.id)

                request.session['scrap_id']=created_scrap.id

                # Convert scrap name and price back from JSON string to list
                scrap_name_list = json.loads(created_scrap.scrap_name)
                scrap_price_list = json.loads(created_scrap.scrap_price)

                # Prepare response data with the fetched data
                response_data = {
                    'scrap_id': created_scrap.id,
                    'scrap_name': scrap_name_list,
                    'scrap_price': scrap_price_list,
                    'scrap_image': created_scrap.scrap_image.url if created_scrap.scrap_image else None,
                }

                return JsonResponse(response_data, status=201)

            except Exception as e:
                print(f"Error creating scrap selection: {e}")
                return JsonResponse({'error': str(e)}, status=500)
        except Exception as e:
            print(f"Error is ----: {e}")

    return JsonResponse({'error': 'Invalid request method'}, status=400)




@csrf_exempt
def Bookdealer(request):
    if request.method == 'POST':
        try:    
            data = json.loads(request.body)
            
            # raw_body = request.body.decode('utf-8')
            # data = json.loads(raw_body)
            print(data)
            # titles = request.session.get('scrap_name')
            # costs = request.session.get('scrap_cost')
            # selected_file = request.session.get('uploaded_file_url')
            address = data.get('address')
            date = data.get('selectDate')
            time = data.get('selectTime')
            scrap_id = request.session.get('scrap_id')
            # scrap_id = request.session.get('scrap_id') 
            print("scrap_id-",scrap_id)

            if data:
                print("data",data)
                scrap = scrap_selection.objects.get(id=scrap_id)
                print("scrap",scrap)
                if not scrap:
                    return JsonResponse({'error':"scrap object not found"},status=405)
                # Update the fields with new values (for example, from request data)
                scrap.address = address    # Replace with actual address value
                print("address",address)
                scrap.date = date        # Replace with actual date value
                scrap.time = time        # Replace with actual time value

                # Save the updated object
                scrap.save()

                saved_scrap = scrap_selection.objects.filter(
                    id = scrap_id,
                    address=address
                ).first()
                if saved_scrap:
                    # Trigger the desktop notification immediately
                    notification.notify(
                        title="RECYCHBS",
                        message="Your order has been placed.",
                        timeout=10
                    )
                    # toaster = ToastNotifier()
                    # toaster.show_toast("RECYCHBS", "Your order has been placed.", duration=10)

                    return JsonResponse({"message":"Object saved successfully"},status=201)
                else:
                    return JsonResponse({"message": "Object not saved "},status=400)

                #     return JsonResponse({'message': 'Object saved successfully!'})

                
                    # scrap = scrap_selection.objects.filter(id=scrap_id).first()

                    # if scrap:
                    #     # Delete the object
                    #     scrap.delete()
            connection.close()

            return JsonResponse({'message':'details sent'},status = 200)
        except Exception as e:
            print("The error is ------------:",e)
            return JsonResponse({'message':'details not sent'},status = 500)


        


@csrf_exempt
def send_message(request):
    if request.method == 'POST':
        try:
            # Parse JSON data from request body
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)

        recipient_type = data.get('recipient_type')
        message = data.get('message')
        user_id = data.get('user_id')
        dealer_id = data.get('dealer_id')
        if recipient_type == 'All_User':
            user_data = UserProfile.objects.all()  
            get_users_id = [users.id for users in user_data]  
            return JsonResponse({'message': message}, status=200)

        elif recipient_type == 'All_Dealer':
            dealer_data = DealerProfile.objects.all()  
            get_dealer_id = [dealers.Dealer_ID for dealers in dealer_data]  
            return JsonResponse({'message': message}, status=200)
        elif recipient_type == 'specfic_user':
            try:
                get_user = UserProfile.objects.get(id=user_id)
                return JsonResponse({"user_id":get_user.id,'message':message})
            except UserProfile.DoesNotExist:
                return JsonResponse({'error' : 'User Not Found'},status=404)
        elif recipient_type == 'specfic_dealer':
            try:
                get_dealer = DealerProfile.objects.get(Dealer_ID=dealer_id)
                return JsonResponse({'dealer_id':get_dealer.Dealer_ID,'message':message})
            except DealerProfile.DoesNotExist:
                return JsonResponse({'error':'Dealer Not Found'},status=404)
    else:
        return JsonResponse({'error': 'invalid request method'},status=400)



# Admin

@csrf_exempt
def send_notification(request):
    if request.method == 'POST':
        try:

            data = json.loads(request.body)  # Parse the incoming JSON data
            message = data.get('message')
            selected_dealers = data.get('selectedDealers', [])
            selected_users = data.get('selectedUsers', [])
            all_dealer = data.get('allDealer')
            all_user = data.get('allUser')




            print(message)
            print(all_dealer)
            print(all_user)
            print(selected_dealers)
            print(selected_users)
            # Add logic to send the notification based on the parameters

            # For example, send to all dealers if allDealer is set
            if all_dealer=="allDealer":
                # Fetch all dealer users and send the message to them
                users = User.objects.filter(role='DEALER')
                for user in users:
                    Notification.objects.create(title="First User Title", message=message, user=user, is_global=True)
                # return JsonResponse({'message': 'Global notification sent successfully'}, status=201)
            # Send to specific dealers
            if selected_dealers:
                # Send the message to dealers in the selected_dealers list
                for id in selected_dealers:
                    dealer_details = Dealer_Details.objects.get(id=id)
                    dealer_details_id = dealer_details.Dealer_ID
                    dealers = User.objects.filter(id=dealer_details_id)
                    for dealer in dealers:
                        Notification.objects.create(title="First Dealer Title", message=message, user=dealer, is_global=False)

            # Send to all users if allUser is set
            if all_user=="allUser":
                users = User.objects.filter(role='USER')
                for user in users:
                    Notification.objects.create(title="Testing Title", message=message, user=user, is_global=True)


            # Send to specific users
            if selected_users:
                # Send the message to users in the selected_users list
                for id in selected_users:
                    profile_user = UserProfile.objects.get(id=id)
                    profile_user_id = profile_user.user_id
                    users = User.objects.filter(id=profile_user_id)
                    for user in users:
                        Notification.objects.create(title="First Title", message=message, user=user, is_global=False)


            # if is_global:
            #     # Send notification to all users
            #     pass

            # else:
            #     # Send notification to specific users
            #     if not user_ids:
            #         return JsonResponse({'error': 'User IDs are required for specific notifications'}, status=400)

            #     users = User.objects.filter(id__in=user_ids)
            #     for user in users:
            #         Notification.objects.create(title=title, message=message, user=user, is_global=False)
            #     return JsonResponse({'message': 'Notification sent to specific users successfully'}, status=201)
            return JsonResponse({'mesaage': 'Notification sent'}, status=200)
        except Exception as e:
            print(e)
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=405)




def get_dealers_status(request):
    try:
        dealers_id = Dealer_Details.objects.all().values('id','Dealer_Name') 
        print(dealers_id)
        dealer_ids = Dealer_Details.objects.values_list('Dealer_ID', flat=True)
        print(dealer_ids)
        dealer_account = DealerProfile.objects.filter(user_id__in=dealer_ids).values('account')
        print(dealer_account)
        data = []
        for dealer, account in zip(dealers_id, dealer_account):
            data.append({
                'id': dealer['id'],  
                'name': dealer['Dealer_Name'],
                'active': account['account'] 
            })

    except Exception as e:
        print(e)
    return JsonResponse(data, safe=False)




@csrf_exempt  # Use this decorator if CSRF protection is causing issues (not recommended for production)
def update_dealer_status(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        dealer_id = data.get('id')
        account_status = data.get('active')
        print(account_status)

        # Assuming you have a Dealer model
        try:
            dealer_details= Dealer_Details.objects.get(id=dealer_id)
            dealer = DealerProfile.objects.get(user_id=dealer_details.Dealer_ID)
            dealer.account = account_status
            dealer.save()

            return JsonResponse({'message': 'Status updated successfully'}, status=200)
        except Dealer_Details.DoesNotExist:
            return JsonResponse({'error': 'Dealer not found'}, status=404)

    return JsonResponse({'error': 'Invalid request'}, status=400)






User = get_user_model()  # Reference to the User model

def find_nearby_users(user_location, radius_km=500):
    nearby_users = []
    print("Find Block Executed")
    
    # Exclude the current user's location based on user_id
    all_locations = UserLocation.objects.exclude(user_id=user_location.user_id)
    print("All Locations",all_locations)
    for location in all_locations:
        distance = great_circle(
            (user_location.latitude, user_location.longitude), 
            (location.latitude, location.longitude)
        ).kilometers
        print(f"Distance to user_id {location.user_id}: {distance} km")  # Debug log for distance
        
        if distance <= radius_km:
            try:
                # Fetch the user associated with the user_id manually
                user = User.objects.get(id=location.user_id)
                nearby_users.append(user)
                print("Loop - ",nearby_users)
            except User.DoesNotExist:
                pass  # Handle the case where a user doesn't exist
    print(nearby_users)
    return nearby_users



@csrf_exempt
def update_user_location(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            latitude = data['latitude']
            longitude = data['longitude']
            user = request.user  # Get the logged-in user

            print("The user is -", user)
            # Save the location data to the database
            user_location = UserLocation.objects.create(
                user=user,  # Use the ForeignKey field
                latitude=latitude,
                longitude=longitude,
            )
            return JsonResponse({'status': 'success', 'location': {'latitude': latitude, 'longitude': longitude}})        
        except Exception as e:
            print(e)
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

# class NearbyUsersView(View):
@csrf_exempt
def nearbyUsers(request):
    try:
        print("Function Called")
        user = request.user
        user_location = UserLocation.objects.filter(user=user).first()  # Get the user's current location
        print(user_location)
        if user_location:
            nearby_users = find_nearby_users(user_location)
            usernames = [user.username for user in nearby_users]
            return JsonResponse({'nearby_users': usernames})
        return JsonResponse({'error': 'User location not found'}, status=404)
    except Exception as e:
        print(e)
        return JsonResponse({'error': 'Server Error'}, status=500)



@csrf_exempt
def upload_file(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        file_data = data.get('file')
        file_name = data.get('file_name')
        print(file_data)
        print(file_name)
        if file_data and file_name:
            # Save the base64 file data to the database
            file_instance = Base64File.objects.create(file_name=file_name, file_data=file_data)
            return JsonResponse({"message": "File saved successfully"}, status=201)
        
        return JsonResponse({"message": "No file or file name provided"}, status=400)


def get_file(request):
    try:
        file_instance = Base64File.objects.get(id=1)
        return JsonResponse({
            "file_name": file_instance.file_name,
            "file_data": file_instance.file_data,  # Base64 encoded data
        }, status=200)
    except Exception as e:
        print(e)
        return JsonResponse({"message": "File not found"}, status=404)


@csrf_exempt
def Get_Usersetting(request):
    print("Function Called")
    data=list(UserProfile.objects.filter().values())

    print("Data is -",data)
    # print("The user data is -",user_profile)
    # print("The Data is ",data)
    connection.close()
    return JsonResponse(data, safe=False, status=200)

@csrf_exempt  # Use this if you don't have CSRF tokens set up
def handle_checkbox(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)
        is_checked = data.get('isChecked', False)
        if is_checked is True:  # Compare with boolean True
            active = 1
        else:
            active = 0

        id = data.get('id')  # Retrieve the checkbox value
        data=UserProfile.objects.get(user_id=id)
        data.active=active
        data.save()
        # You can now process the value as needed
        # print(f"Checkbox value: {is_checked}")
        print(active)
        return JsonResponse({'status': 'success', 'isChecked': is_checked})
    return JsonResponse({'status': 'failed'}, status=400)

# Create your views here.
