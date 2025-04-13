*** Settings ***
Documentation     Sisäänkirjautuminen .env- tiedoston avulla
Library           Browser    auto_closing_level=KEEP
Variables         login_env.py

*** Test Cases ***
Login Test
    [Documentation]    Sisäänkirjautumistesti
    New Browser    chromium    headless=No

    New Page       http://localhost:5173 
    Get Title      ==    Projekti-kirjautuminen 
    Type Text      [name="username"]        ${MY_USERNAME}    delay=0.1 s 
    Type Secret    [name="password"]    $MY_PASSWORD      delay=0.1 s
    Click With Options    input.loginform    delay=2 s
    Get Title      ==    Projekti-etusivu