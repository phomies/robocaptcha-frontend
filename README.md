## RoboCaptcha Web Application

### Environment Variables
| Name                                     | Description                             |
| ---------------------------------------- | --------------------------------------- |
| NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID      | Firebase measurement ID                 |
| NEXT_PUBLIC_FIREBASE_APP_ID              | Firebase application ID                 |
| NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID | Firebase messaging sender ID            |
| NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET      | Firebase storage bucket URL             |
| NEXT_PUBLIC_FIREBASE_PROJECT_ID          | Firebase project ID                     |
| NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN         | Firebase auth domain URL                |
| NEXT_PUBLIC_FIREBASE_API_KEY             | Firebase API key                        |
| NEXT_PUBLIC_GOOGLE_CLIENT_ID             | Google OAuth client ID to sync contacts |

### Local Deployment
```
git clone https://github.com/phomies/callcaptcha-frontend.git

yarn install
yarn dev
```

### Vercel Deployment
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fphomies%2Fcallcaptcha-frontend.git&env=NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,NEXT_PUBLIC_FIREBASE_APP_ID,NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,NEXT_PUBLIC_FIREBASE_PROJECT_ID,NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,NEXT_PUBLIC_FIREBASE_API_KEY,NEXT_PUBLIC_GOOGLE_CLIENT_ID&envDescription=Firebase%20and%20Google%20OAuth2.0%20Environment%20Variables&envLink=https%3A%2F%2Fgithub.com%2Fphomies%2Fcallcaptcha-frontend)