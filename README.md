# README

This API sends a simple email through gmail SMTP  
in order that works you need to do some stuff in your gmail account.

You should enable less secure applications in your gmail configuration.  
This can be achieved in this link <https://www.google.com/settings/security/lesssecureapps>

You should also unable captcha challenge.  
This can be achieved here <https://accounts.google.com/b/0/displayunlockcaptcha>.

if you really want to test it out I would suggest you to create an fake email account you don't care about. I'm new to that stuff and I don't really know if its dangerous to use your own account  
Though since you might not want to do all this workaround because you probably don't trust me and won't use your email account either, I took some steps ahead of you and created an email so you can test it. (Just don't change its passwords, thanks).

User: justtestthisapi@gmail.com  
password:justreallytestit

You can test it in [Swagger UI](https://send-email-smtp-cas.herokuapp.com/)

## Main Technologies

- Node Js (Express)
- Unit Test (Jest)
- Swagger UI

## To run the project

- Install packages: `yarn install`
- Run API: `yarn dev`
- To run tests:

  - in one terminal start the server:  
    `yarn dev`
  - then in another terminal  
    run tests: `yarn jest`

---

## Contribution Guide

If you think you anything in this project could be better, please check
[Contribution Guide](CONTRIBUTION.md)

## Next Steps

- [ ] Convert this project to typescript
- [ ] Add smtp routes to most known e-mail services.
- [ ] Add smtp route that allows user to define its own smtp configuration.
- [ ] Add attachment options to routes
- [ ] Add possibility to use HTML in email text message.
