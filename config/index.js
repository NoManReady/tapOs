import cookie from 'cookies-js'
const isProd = process.env.NODE_ENV === 'production'

if(!isProd){
    cookie.set('access_token','eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyU3RhdHVzIjoiMSIsImxvZ2luVHlwZSI6MSwidXNlcl9uYW1lIjoi6ZyN5YWD55SyIiwidXNlclR5cGVJbmZvcyI6W3sidXNlclR5cGVJZCI6IjUiLCJjb21tb25UeXBlIjoiNSIsInN5c3RlbVR5cGUiOiIzIiwic3RhdHVzIjoiMSJ9XSwidXNlck5hbWUiOiLpnI3lhYPnlLIiLCJ1c2VySWQiOiIwMkRGQjI0NEExOTA0NjQ2QUI2NUJBRjQyRUFENTUwRCIsImNsaWVudF9pZCI6ImdwLWdhdGV3YXktY2VudGVyIiwiYXVkIjpbIkFMTCJdLCJpZGVudGl0eVR5cGUiOjEsInVzZXJBY2NvdW50IjoiMzMzMzMzIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sInN5c3RlbVR5cGUiOiIzIiwidXNlclR5cGVOb3ciOiI1IiwiZXhwIjoxNjAzNDIwOTEzLCJqdGkiOiJmMTk1ZTRhYS04ZGMwLTRlMTctYTVlMS0wNjU5MzQ3ZTgxNDEifQ.kPx14d7fjE79yRmmX6GRobdRyV9h4zXkd2HOU42xSmPHG1QV8fX91XX_PcxrX2hL7yJjTvDvbSlmPbnQDMhwxtVejHmofyt_j7QsPbu7lGWPK1DYvQe9TVJ6F8JXpjYL8GG2eJX7e8PqY-hJg6Zvf3Os0Krb8lJRhgA2CNEiNO67kVhLhmhKVWTuny-lDpFDzSKXpbTnu0saCvGiT1Qr4tSRUeKYoJwm8HeEFCdi41JM0Adtmacjw5RezDAyFH6HlwLG74EqTQOdiSwhAsiuSimyiRCViu7k8J6T2xgD0bO3aMeBjcGI1dhaVaIsw9KKAXcj1K2IRLO167xubV3PGw')
}
export const accessToken = cookie.get('access_token')