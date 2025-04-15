*** Settings ***                                                                                       
Library    Collections                                                                                 
Library    RequestsLibrary

Suite Setup    Create Session    url    http://localhost:3000/api/users                  
                                                                                                       
*** Test Cases ***                                                                                     
                                                                                                       
Post Register Dummy User                                                                                      
    &{body}=    Create dictionary    username=johndoe   password=superSECRETpassword    email=johndoe@example.fi       
    ${resp}=    POST      url=http://localhost:3000/api/users    json=${body}    expected_status=anything

    Log    ${resp.json()}     # Log the response json
                                                                                                       
    Status Should Be    201    ${resp}

Login As Dummy User
    ${body}    Create Dictionary    username=johndoe    password=superSECRETpassword
    ${response}    POST    url=http://127.0.0.1:3000/api/auth/login    json=${body}

    Should Contain    ${response.json()}[message]    login succesful