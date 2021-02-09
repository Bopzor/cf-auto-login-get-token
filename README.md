# Auto login

Auto login in cloud foundry and append `JWT=<token>` to given file.

- clone this repo
- install dependencies (only cypress) with `yarn`
- copy `.env.template` and complete it with corresponding values
- source the created `.env` file to export variable
- if exist, remove `JWT` key/value pair inside given file
- run `yarn start`
