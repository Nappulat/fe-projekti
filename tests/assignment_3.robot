*** Settings ***
Library     Browser    auto_closing_level=KEEP
Resource    Keywords.robot  

*** Test Cases ***
Test Web Form
    New Browser    chromium    headless=No  
    New Page       https://www.selenium.dev/selenium/web/web-form.html
    Get Title      ==    Web form  
    Type Text      [name="my-text"]        ${Username}    delay=0.1 s 
    Type Secret    [name="my-password"]    $Password      delay=0.1 s
    Type Text      [name="my-textarea"]    ${Message}     delay=0.1 s
    
    # Choose from Number Dropdown menu
    Click With Options    ${dropdown-1}
    ${all_options}=    Get Select Options    ${dropdown-1}
    Select Options By     ${dropdown-1}     value     3

    #Write to City Dropdown menu
    Click With Options    ${dropdown-2}
    Type Text    ${dropdown-2}   New York     delay=0.1 s

    #Upload file
    Upload File By Selector    //input[@type='file']    tests/tester.txt

    #Select and un-select check-boxes
    Uncheck Checkbox    id=my-check-1
    Check Checkbox    id=my-check-2
    Check Checkbox    id=my-radio-2

    #Select Color, UNFINISHED
    #Click With Options    input[type="color"]
    #Wait For Elements State    input[type="color"]    visible
    #Mouse Move Relative To    input[type="color"]    0    10    steps=300
    #Mouse Button    click    delay=0.1 s


    #Select date, UNFINISHED
    #Click With Options    input[name="my-date"]
    #Type Text      input[name="my-date"]    04/01/2025     delay=0.1 s
    #Keyboard Key    press    Enter

    #Radius, dragged a circle
    Drag And Drop Relative to    [type="range"]    -100    0    steps=300

    # Submit form
    Click With Options    button    delay=2 s

    # Submitted succesfully
    Get Text       id=message    ==    Received!