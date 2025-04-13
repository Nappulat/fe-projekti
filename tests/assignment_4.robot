*** Settings ***
Library     Browser    auto_closing_level=KEEP
Resource    entry.robot  

*** Test Cases ***
Test 4
    New Browser    chromium    headless=No  
    New Page       http://localhost:5173 
    Get Title      ==    Projekti-kirjautuminen 
    Type Text      [name="username"]        ${Username}    delay=0.1 s 
    Type Secret    [name="password"]    $Password      delay=0.1 s
    Click With Options    input.loginform    delay=2 s
    Get Title      ==    Projekti-etusivu

    #Siirry HRV- mittaukset sivulle
    ${hrv}=    Get Element    xpath=(//a[@href='hrv-mittaukset.html' and text()='HRV mittaukset'])[1]
    Click with Options    ${hrv}    delay=1 s

    #Syötä mittausdata
    Type Text    id=readiness-id    ${Readiness}      delay=0.1 s
    Type Text    id=bpm-id    ${BPM}      delay=0.1 s
    Type Text    id=rmssd-id    ${RMSSD}      delay=0.1 s
    Type Text    id=sns-id    ${SNS}     delay=0.1 s
    Type Text    id=pns-id    ${PNS}     delay=0.1 s
    Type Text    id=sleep-id    ${Hours}     delay=0.1 s
    Type Text    id=phy-age-id    ${Phy-Age}     delay=0.1 s
    Type Text    id=mood-id    ${Mood}     delay=0.1 s
    Type Text    id=notes-id    ${Notes}     delay=0.1 s

    #Syötä data
    Click With Options    //input[@class='create-m']    delay=2 s

    #Reload page to see new entry
    Reload

    #Open entry
    ${new-entry}=    Get Element    xpath=//button[@class='check' and text()='MITTAUS 1']
    Click with Options    ${new-entry}    delay=1 s

    #Close entry
    Click with Options    xpath=//button[@class='close-result' and text()='Sulje']    delay=2 s

    #Logout 
    ${exit}=    Get Element    xpath=(//a[@id='exit-program' and text()='Kirjaudu ulos'])[1]
    Click with Options    ${exit}    delay=1 s
    Get Title      ==   Projekti-Kirjauduttu ulos