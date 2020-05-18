# aws-lambda-mp3-transcoder
AWS Lambda function to transcode S3 audio files to mp3.
## How to use

### Create function
1. `npm install`
2. `zip -r function.zip ./index.js ./node_modules`
3. `aws configure` to login
4. `aws lambda create-function --function-name <your-function-name> --zip-file fileb://function.zip --handler index.handler --runtime nodejs12.x --role arn:aws:iam::<your-arn>:role/<your-role-name>`

### Update function
1. optional `rm function.zip`
2. `zip -r function.zip ./index.js`
3. `aws configure` to login
4. `aws lambda update-function-code --function-name <your_function_name> --zip-file fileb://function.zip`
