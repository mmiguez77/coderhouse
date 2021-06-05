import admin from "firebase-admin";

export default class FirebaseConfig {

    constructor(dbName) {
        this.collection = this.connect()
        this.db = admin.firestore()
        this.query = this.db.collection(dbName)

    }

    connect = () => {
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert({
                    "type": "service_account",
                    "project_id": "apicoderhouse",
                    "private_key_id": "70e7ad4ed58f08148904c4c7e8a643b83df6b314",
                    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCXB1Qi9UMil81R\nZ0lxe1DPMRM20pyOvBZmziK5l3D5+jf/gwzwsP+IfFVBHfrlB2yQH8+QZJLvmlXb\nc31ZHLUPpaeJmN06O1JIG7daTAB3NbwPZsf66EjXHy1NB21mXAP+oZV+S7spVfUN\nYGfYkJGiFlR9MlSfBCGDEQwsYVGul+GHB8MCLMwu+vXyQLQmKd1+YA/biPWc75dl\nN6kotbpcZyRQHOH60LAUTq3WccgR6nFdllq7w91EgfAimUrkNamPAJvUlkd8hlkL\nVQxpK2COxE4qgiK/YHpYieb62Ntv18rEXWhkGAQj0PtL1qvll6em/i8B2m/QWxwA\nwnG3NshfAgMBAAECggEACyympAODmR6kOV6sB3J5UystYcQJg2IVQjwEQ7kZydUi\nqYwXvANMlNumLzA5rRJ0jOFdqTBX0tSXf6o23w4Js4OtNrgRvko/V0h9s3emHSvj\nozwWldDz+r66ylU/WfB69y8bcYHG8lMC05+Lb3Ga5OREEhNUQYO7uwfa37m/omxL\nT2dT+YVGqDs/WghAU0RQ5evOvzSSkJqTJMVW+IXzFNoL0XAg4RtVlifmGgBZYUCT\nqqFIBHJKdWg2fM75O2lSzQOlBcvcOAbO3n9L8vI7i5g6661C0zdBtXslARUx5fjZ\nd4/QAH2tycj+lzlkebVQrWwQIFx0pA+8s7c8odHqAQKBgQDJe9M96EoM21TOlgz6\ngmi3/f7sW9IiN2OTlNEvFD/9A5zAHZtRm6R4yAXvvzFbe9fWu995XUtKwSaLxiEn\n06lQiFHn4EiItuCJ+3ijtnhFe0yKntqDsq2eD1zxG1IYOzvRD+RyvT8VD/W+4PxF\nC7HJByS1qKnX3RDdb6OKxVfLAQKBgQC/5KGtwsMCMMHJh564c2nr4+mTr6/5gUGx\nmE6goIcTupyi1rMRfpL4V1horL3X8DHqVx5gP5HrK7xT/msKtMMjGu6VC9suOhxW\ndqSU7Uq0jvc8L4TbKEDGmefuu+EzR3heajqUY3Ig5BbEqw1PuM6RItiZsGAbwCpD\nc+27cHFzXwKBgGJXof+xhZNI6tf6vVL4nAxSWT8cgjBZQK0kEgYcqC7iuHu897aZ\ndWnOl7cxZvH0PKF/CdC/DKTsKdhHWJ+L3DSGlRPMkRrJyEcRCw09Xu7rA60VZCqr\n57oiXYcBgsx4/PVKAINQg53QMG5+eiNpVdl9NxnDvUKzkCvE9doiAHwBAoGAZW9i\n86oXUUoatgAlq5T+sb35U6M0H2zvIATF02zn2krzz7Q0VhQVdocdab+eXs5OZHSG\nzxPre2fUFoZPaQpieGUdJtZslwQKxL3UhBDnQ4irMjpgPUUK8LCchHr2MRgfjbET\npCrpQm+vhWhyEek78EZ+PseYFjM/ZAac7U8j+XsCgYB//WJJFxF9otFy7i+IByzy\n08G99frXo4mgMwP1G/zeOCa7LYHMFVgFRvtieaWa0V7RhFh8hrTisuZ6PcRL4/el\nK9j8d9fhUQueUGEoGB+fpJjeyXy4NXLG+80y5jN9LLAZykexAAj3ZAKu/Gfg4MIB\nuoadGfeEUnC2v0I+wqSabA==\n-----END PRIVATE KEY-----\n",
                    "client_email": "firebase-adminsdk-wmnzm@apicoderhouse.iam.gserviceaccount.com",
                    "client_id": "113224776083653495056",
                    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                    "token_uri": "https://oauth2.googleapis.com/token",
                    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-wmnzm%40apicoderhouse.iam.gserviceaccount.com"
                }),
                databaseURL: 'https://apicoderhouse.firebaseio.com'
            })
        } else {
            admin.app()
        }
    };
}
