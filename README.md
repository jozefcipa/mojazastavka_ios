# mojazastavka - iOS
iOS version of mojazastavka application

Go check it out main [API repository](https://github.com/JozefCipa/mojazastavka_api).

- main screen
    - input - from(not required when use user’s position)
    - input - where (road name/object name/stop name) - searching with Enter pressed 
    - some nice loading window
    - map - your current position, marked stops in nearby
- when result is found
    - mark searched point on map
    - show line from you to your nearby stop from which is going bus to destination stop
    - show line(different color) from destination stop to searched point 
    - shows buses numbers
- tech stack: react native, airbnb react maps, lumen, google maps api, mysql
- will learn: react native, work with google maps, redux
- APP MUST BE USER INTUITIVE AND NICE - UI/UX

URLS
- zastavky v ramci PO + ich GPS suradnice, pre kazdu zastavku - request na jej uri, z html naparsovat vsetky linky na zastavke