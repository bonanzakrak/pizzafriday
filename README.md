# Pizza friday

Allow to select food from restaurants on pizza day.

### Requirements
- mongodb
- node

### Instalation
```npm install```


### Envoirment variables

HOST - server host
PORT - server listener port
ENV_SECRET - secret for JWT
NODE_ENV - envoirment (production, TESTING)

### Start
```npm run start```

### Todo
- ~~move restaurants list to db~~
- ~~move menu to db~~
- create menu editor for admin
- levels of auth
- users list for admin
- ~~change ```monk``` to something smarter~~ (changed to mongoose)


### Badges
Testing code review tools

|                  |        **master**         |       **develop**       |
| ---------------: | :-----------------------: | :---------------------: |
|     **Travis**   |     [![Master][1]][2]     |                         |
|   **Codacy**     |    [![Codacy][3]][4]      |                         |
| **Code Climate** |  [![Code Climate][5]][6]  |                         |
| **Codefactor**   |  [![Codefactor][7]][8]    |         soon            |

[1]: https://travis-ci.org/bonanzakrak/pizzafriday.svg?branch=master
[2]: https://travis-ci.org/bonanzakrak/pizzafriday
[3]: https://api.codacy.com/project/badge/Grade/a84edd7cd6b748c3a257f5041aa9133d
[4]: https://www.codacy.com/app/bonanzakrak/pizzafriday?utm_source=github.com&utm_medium=referral&utm_content=bonanzakrak/pizzafriday&utm_campaign=badger
[5]:https://codeclimate.com/github/bonanzakrak/pizzafriday/badges/gpa.svg
[6]: https://codeclimate.com/github/bonanzakrak/pizzafriday
[7]: https://www.codefactor.io/repository/github/bonanzakrak/pizzafriday/badge
[8]: https://www.codefactor.io/repository/github/bonanzakrak/pizzafriday