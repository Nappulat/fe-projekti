*** Settings ***
Library     Browser    auto_closing_level=KEEP
Resource    login.robot  

*** Test Cases ***
Login Test
    New Browser    chromium    headless=No  
    New Page       http://localhost:5173 
    Get Title      ==    Projekti-kirjautuminen 
    Type Text      [name="username"]        ${Username}    delay=0.1 s 
    Type Secret    [name="password"]    $Password      delay=0.1 s
    Click With Options    input.loginform    delay=2 s
    Get Title      ==    Projekti-etusivu 