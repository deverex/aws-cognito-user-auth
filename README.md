# aws-cognito-user-auth
Assignment given by QuillHash

# Assignment

## Technologies to be used : 
1. Node js
2. Nginx
3. AWS EC2 
4. AWS Cognito SDK

## Task : 
1.) Create a node js application with following functionalities :

  User needs to be authenticated via Amazon Cognito (AWS Auth and Access Control) using JS SDK. 
  After logging in, user can see list view of Nginx logs present on the server by parsing Nginx Logs.
  
  Create api for: 
- Login in with aws cognito sdk.
- List out nginx logs
- Filter nginx logs with time, ip address etc.

2.) What problems will your application face when ELB(load balancer) is used to route requests? 
    Suggest a scalable solution when ELB (Elastic load balancer) is used.
    
    
    
## Solution :

Features:

- Registration and Login to AWS Cognito with JWT
- List out Nginx logs.
- Filter nginx logs based on ip adddress , status code.

## Running the project

- Clone this Repository

```sh
cd aws-cognito-user-auth
npm i
```

- Create a `.env` file in the root folder

```sh
touch .env
```

- Populate it with this data

```env
AWS_USER_POOL_ID="your aws user pool id"

AWS_APP_CLIENT_ID="your aws app client id"

AWS_POOL_REGION="your aws pool resion"
```


- Starting the development server

```sh
npm run dev
```


## API Routes

```rest
POST /api/auth/register
{ username, password }


POST /api/auth/login
{ username, password }


GET /api/logs
Header:  authorization=auth_token
Filters that can be applied : 
  - ip_address (optional)
  - status_code (optional)


```
