*** Settings ***
Library     Browser     	    auto_closing_level=SUITE
Library     CryptoLibrary     variable_decryption=True   #Kryptatut muuttujat puretaan automaattisesti

*** Variables ***
${Username}    crypt:xaeXP96ZMjnEtDy7fpcKxwzFUnQ9EG+tcQaW2IqpGlWlidGR5me2ha39aVAY9YvJRk2/vF8gvffVi2Ay
${Password}    crypt:7q0fHbhjhyGdWMGqXIBawU0gn1srqLv2TWSIsadldwNPW6pxYwsJkNZKGdJ+SKOwo0coUSB05hDRQS89

*** Test Cases ***
Login Test
    [Documentation]    Sisäänkirjautumistesti
    New Browser    chromium    headless=No

    New Page       http://localhost:5173 
    Get Title      ==    Projekti-kirjautuminen 
    Type Text      [name="username"]        ${Username}    delay=0.1 s 
    Type Secret    [name="password"]    $Password      delay=0.1 s
    Click With Options    input.loginform    delay=2 s
    Get Title      ==    Projekti-etusivu