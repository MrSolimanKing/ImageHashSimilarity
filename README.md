# ImageHashSimilarity

Create a Search engine by getting similar images


![image](images/1e386572-cf9c-420d-8f8b-3c43fce322f8.png?raw=true "Title")
![image](images/d9e38ade-0faa-4cf4-9dc0-f493c49d9185.png?raw=true "Title")
![image](images/df236404-28b8-4380-9f17-4ea657e781ad.png?raw=true "Title")


Stips to run the Backend(Django)

```
##Install all Our important python packges

> pip install django-cors-headers
> pip install django-rest-authtoken
> pip install djangorestframework
> pip install django-filter
```

```sh
python manage.py runserver 'Your IP ADDRES':8000

# You Should run Django based on your Ip Address In order to Api work with the Frontend and add you ip in 
> ALLOWED_HOSTS = ["YOUR AIP ADDRESS"] in 'ecommerc/settings.py'

and

> CORS_ALLOWED_ORIGINS = [
    'YOUR AIP ADDRESS',
]

## YOU probably will not need to make (migrations and migrate) these steps since the SQLite is already uploaded with the project!I am not sure. You only need to create SuperUser

Then run migrations
> python manage.py makemigrations
> Then migrate This to the database 
> python manage.py migrate
####


## To create Super user
> python manage.py createsuperuser



once it run by using python manage.py runserver 'Your IP ADDRES':8000 
you done! 

Lets jumb to Frontend 


```
```sh
## Very Important In order To let frontEnd work you should have! 
1- Node Js installed in your computer 
2- package manager like npm or yarn
3- expo since our app work using expo 

```
> You need to install node from this site [Node js](https://nodejs.org/en/download/)

> To install expo [expo](https://docs.expo.dev/get-started/installation/)

```

Once you done, install our app moduls by write "npm install" or "yarn install"

Then Run our expo app by Typing

> expo start

## To test the app you need to install expo Go in your phone


