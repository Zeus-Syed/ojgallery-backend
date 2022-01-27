## project description

   ojgallery app
     - User can register and login to the app
     - User can see all uploaded images (in Home section)
     - Can Upload image by clicking 'Upload Image' button (in Home section)
     - Can upload the image to azure blob storage (in Upload section)
     - Can tag friends while uploading (in Upload section)
     - user will see images on which he/she is tagged in (in Tagged section)
     - user can logout the session (in Settings section) 

## command to execute

    Back-end
     - clone the repo (or) unzip the file
     - npm i
     - npm start

    Front-end
     - clone the repo (or) unzip the file
     - npm i
     - npm start (to start metro bundler)
     - npm run android (to run app in android)  or  npm run ios (to run app in ios)
     - To run android app, replace 'localhost' with local machine's ip address in the api url
     - For IOS app, 'localhost' works fine

## docker commands

    Back-end

     - command to build image

         - docker build -t ojgallery_backend .

     - command to run the image

         - docker run -it -p 9000:9000 ojgallery_backend    

### REST APIs

# GET

- http://localhost:3000/users/

      Fetch all available users from DB.

        - request

         header
            Authorization : Bearer wefsadgrrmhlwqkriusdhbk.qb.elfkasjkb.fkjhalijb.bmanv,nbvjfhbasnbv,mnasbdlfjhabsdnfba,mnsdbfnasbdfbnasd

        - response format

                    {
                    "data": [
                    {
                    "_id": "61eec2e202c3aa0800335c32",
                    "name": "Second"
                    },
                    {
                    "_id": "61eff9d5ac6c691740e2b6aa",
                    "name": "King"
                    },
                    {
                    "_id": "61effb71ac6c691740e2b6ac",
                    "name": "Queen"
                    },
                    {
                    "_id": "61effd1bac6c691740e2b6ae",
                    "name": "Pink"
                    },
                    {
                    "_id": "61f1a64babf74910e3d4b847",
                    "name": "Flow"
                    }
                    ],
                    "message": "users list retrieved successfully",
                    "success": true
                    }

- http://localhost:3000/users/:userId

          Fetch a single user record from the database

         - request

           header
              Authorization : Bearer wefsadgrrmhlwqkriusdhbk.qb.elfkasjkb.fkjhalijb.bmanv,nbvjfhbasnbv,mnasbdlfjhabsdnfba,mnsdbfnasbdfbnasd

          - response

                    {
                    "data": {
                    "_id" : ObjectId("61f1a64babf74910e3d4b847"),
                    "active" : true,
                    "name" : "Flow",
                    "password" : "$2a$10$3JyTX5tPK/LZC5dy1A35c.lDLZQ/X/zqi9yEMb5o9XG8R5FvQQNYy",
                    "phone" : "444444444",
                    "createdAt" : ISODate("2022-01-26T19:51:39.091Z"),
                    "updatedAt" : ISODate("2022-01-26T19:51:39.091Z"),
                    "__v" : 0

                    },
                    "message": "user retrieved successfully",
                    "success": true
                    }

- http://localhost:3000/azure/images

      Fetch the images uploaded by a user

       - request

         header
            Authorization : Bearer wefsadgrrmhlwqkriusdhbk.qb.elfkasjkb.fkjhalijb.bmanv,nbvjfhbasnbv,mnasbdlfjhabsdnfba,mnsdbfnasbdfbnasd

      - response

                    {
                    "data":  [
                    {
                    "_id": "61f16909469cd706ca8b2a7b",
                    "getUrl": "https://azappfileshare.blob.core.windows.net/mobilereceipts/TDM-Reciepts-9d86a5ad-cd58-48da-88d9-34932a356036-0_81236000_1643211002-msm2123.jpg"
                    },
                    {
                    "_id": "61f16afe469cd706ca8b2a7f",
                    "getUrl": "https://azappfileshare.blob.core.windows.net/mobilereceipts/TDM-Reciepts-9d86a5ad-cd58-48da-88d9-34932a356036-0_87509500_1643211508-msm2123.jpg"
                    },
                    {
                    "_id": "61f19a24a96e4a0ded688178",
                    "getUrl": "https://azappfileshare.blob.core.windows.net/mobilereceipts/TDM-Reciepts-9d86a5ad-cd58-48da-88d9-34932a356036-0_44821400_1643223584-msm2123.jpg"
                    },

                    ],
                    "message": "User images fetched successfully",
                    "success": true
                    }

- http://localhost:3000/azure/tagged/images

      Fetch the images tagged by user's friends

       - request

         header
            Authorization : Bearer wefsadgrrmhlwqkriusdhbk.qb.elfkasjkb.fkjhalijb.bmanv,nbvjfhbasnbv,mnasbdlfjhabsdnfba,mnsdbfnasbdfbnasd

      - response

                    {
                    "data":   [
                    {
                    "_id": "61f1a1021bbb5d10d3eaf9d1",
                    "getUrl": "https://azappfileshare.blob.core.windows.net/mobilereceipts/TDM-Reciepts-9d86a5ad-cd58-48da-88d9-34932a356036-0_49425900_1643225344-msm2123.jpg"
                    },
                    {
                    "_id": "61f1a1431bbb5d10d3eaf9d7",
                    "getUrl": "https://azappfileshare.blob.core.windows.net/mobilereceipts/TDM-Reciepts-9d86a5ad-cd58-48da-88d9-34932a356036-0_31842400_1643225408-msm2123.jpg"
                    }

                    ],
                    "message": "User images fetched successfully",
                    "success": true
                    }

# POST

- http://localhost:3000/users/

        Create a new user and store in database.

        - request parameters

            body

           {
               "name": "desired name",      // type-> String
               "password": "actual address",     // type-> String
               "confirmPassword": "actual description",    // type-> String
               "phone": "586578658"     // type-> String
           }

        - response
            
                    {
                        "data": {
                            "active": true,
                            "_id": "60c319c8968f050771daddae",
                            "name": "Agent J",
                            "createdAt": "2021-06-11T08:07:36.991Z",
                            "updatedAt": "2021-06-11T08:07:36.991Z",
                            "__v": 0
                        },
                        "message": "users created successfully",
                        "success": true
                    }
                    

- http://localhost:3000/users/api/login

        User login to server
       
       - request

       body

           {
               "phone": "9879879889",      // type-> String
               "password": "actual address",     // type-> String
           }

       - response

                    {
                        "data": {
                            "active": true,
                            "_id": "60c319c8968f050771daddae",
                            "name": "Agent J",
                            "createdAt": "2021-06-11T08:07:36.991Z",
                            "updatedAt": "2021-06-11T08:07:36.991Z",
                            "__v": 0
                        },
                        "message": "users login successfully",
                        "success": true
                    }


- http://localhost:3000/users/:userId

          Hard delete single user record from the database

         - request

           header
              Authorization : Bearer wefsadgrrmhlwqkriusdhbk.qb.elfkasjkb.fkjhalijb.bmanv,nbvjfhbasnbv,mnasbdlfjhabsdnfba,mnsdbfnasbdfbnasd

          - response

                    {
                    "data": {
                    "_id" : ObjectId("61f1a64babf74910e3d4b847"),
                    "active" : true,
                    "name" : "Flow",
                    "password" : "$2a$10$3JyTX5tPK/LZC5dy1A35c.lDLZQ/X/zqi9yEMb5o9XG8R5FvQQNYy",
                    "phone" : "444444444",
                    "createdAt" : ISODate("2022-01-26T19:51:39.091Z"),
                    "updatedAt" : ISODate("2022-01-26T19:51:39.091Z"),
                    "__v" : 0

                    },
                    "message": "user deleted successfully",
                    "success": true
                    }

- http://localhost:3000/azure/image/upload

          upload azure image url and tagged friends list into database. 

         - request

           header
              Authorization : Bearer wefsadgrrmhlwqkriusdhbk.qb.elfkasjkb.fkjhalijb.bmanv,nbvjfhbasnbv,mnasbdlfjhabsdnfba,mnsdbfnasbdfbnasd

           body

                    {
                        getUrl: "azure image url",
                        friendsList: "array of friends ids"
                    }   

          - response

                    {
                    "data": {
                    "_id" : ObjectId("61f1a64babf74910e3d4b847"),
                    "active" : true,
                    "name" : "Flow",
                    "password" : "$2a$10$3JyTX5tPK/LZC5dy1A35c.lDLZQ/X/zqi9yEMb5o9XG8R5FvQQNYy",
                    "phone" : "444444444",
                    "createdAt" : ISODate("2022-01-26T19:51:39.091Z"),
                    "updatedAt" : ISODate("2022-01-26T19:51:39.091Z"),
                    "__v" : 0

                    },
                    "message": "user deleted successfully",
                    "success": true
                    }

# PUT

- http://localhost:3000/users/:userId

         Update user record in database.

           header
              Authorization : Bearer wefsadgrrmhlwqkriusdhbk.qb.elfkasjkb.fkjhalijb.bmanv,nbvjfhbasnbv,mnasbdlfjhabsdnfba,mnsdbfnasbdfbnasd        

         - request parameters

             {
                 "name": "updated name",      // type-> String
             }

         - response

                    {
                    "data": {
                    "_id" : ObjectId("61f1a64babf74910e3d4b847"),
                    "active" : true,
                    "name" : "Flow",
                    "password" : "$2a$10$3JyTX5tPK/LZC5dy1A35c.lDLZQ/X/zqi9yEMb5o9XG8R5FvQQNYy",
                    "phone" : "444444444",
                    "createdAt" : ISODate("2022-01-26T19:51:39.091Z"),
                    "updatedAt" : ISODate("2022-01-26T19:51:39.091Z"),
                    "__v" : 0

                    },
                    "message": "user deleted successfully",
                    "success": true
                    }

- http://localhost:4000/users/delete/:userId

          Soft delete(updating active status to false) a record in the database

         header
              Authorization : Bearer wefsadgrrmhlwqkriusdhbk.qb.elfkasjkb.fkjhalijb.bmanv,nbvjfhbasnbv,mnasbdlfjhabsdnfba,mnsdbfnasbdfbnasd        
 

          - response

            {
                "data": {
                    "active": false,
                    "_id": "60c27494196e4b09583bb59e",
                    "name": "updated agent K",
                    "phone" : "444444444",
                    "createdAt": "2021-06-10T20:22:44.251Z",
                    "updatedAt": "2021-06-11T10:25:56.174Z",
                    "__v": 0
                },
                "message": "users deleted successfully",
                "success": true
            }

## unit test cases

     folder  /test

        GET -   fetch users
        POST -  create user
        PUT  -  update user

    - command "npm run test"
