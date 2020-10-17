// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "Gridsome",
  siteUrl: "https://AEI-Consulting.github.io",
  pathPrefix: "/christmas-market",
  plugins: [
    {
      use: "@gridsome/source-graphql",
      options: {
        url: "https://api-eu-central-1.graphcms.com/v2/ckfmmu5vh21sb01wmbwn58p0a/master",
        fieldName: "data",
        headers: {
          Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2MDI5Mzk5NzAsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEuZ3JhcGhjbXMuY29tL3YyL2NrZm1tdTV2aDIxc2IwMXdtYnduNThwMGEvbWFzdGVyIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiN2RjNmVmOGQtNmM2MC00OTVjLTgwMjMtNzhhMjBmODM5MWJmIiwianRpIjoiY2tnZHAybDZoZmF0YjAxeHA4bTVnOHBxYSJ9.QO3iSVF5jRDuyATe6g9x5EipKYrPqhJtGX-UATUl6VuN0JHkeajwJu9tmbGSMnmsx5ZZdo5T1RbF26fZInRCFWXfoQkX69i-RXXKcwGbVYo7PNFQMFxuhK96uUwEcDGaf8_F5o_wARUGRW14cH_K0WgSBnna1ewqxrdIJVn9qPQp0RFduJMlKx0jv26SjbrXS3kCZpdrM8yo72H4ziH3udKd_2LvE2m0g1zn2jOD0rApXSv1jIntzsYsa0TCMU7lQ1LQNL7pv7YLyCQCQ3trml2jGYXGHIOq-_mlAPsHIjKSG9vFVXcQwVrl96DJ7r6y76lR4RIU7ii2p3UBna1dk0IvcM8GsF4uoZFGMkDSRnhB42XXIXkw6lHYF6zLbm1VmqtH4nsvFuYApLvFKBdA4xdyW7l69CXI1siqc7JmpKDKbeOSuUWVCh3Eb9Yzr0UU-jn4S5CdNxuTe2Z-EtBte4b6grhUQQVZbMQwNa13WXfHiXTIECUpJHjsqSeiCdHhU4N7_VIOWo5TL2P9MmNYWd6i6AlvlN4wjTdRpj-SB1EeIX_h45YiG0KTarE1ZBheaGUIxv7nvoNDeBrY_RXopQdiNELrCBo4DRcXYTUeP4qBmvAMIonLN57ywOvWCPjVubCg2u71My9sRwa84Zct6W0yZWXAajd7hhdNpD-41fI`,
        },
      },
    },
  ],
};
