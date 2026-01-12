Auth Lambda
===========

This Lambda implements three endpoints (to be wired behind an API Gateway):

- POST /auth/register  => registers a user, stores otp_code, sends verification email
- POST /auth/verify-email => verifies code, sets email_verified and status
- POST /auth/login => validates credentials and returns a JWT

Environment variables (set in Lambda configuration):
- `DB_SECRET_ARN` (required) - Secrets Manager secret ARN storing DB connection JSON: { host, port, username, password, dbname }
- `JWT_SECRET` (required) - secret used to sign JWTs
- `SES_FROM_EMAIL` (required) - verified SES sender email (e.g. no-reply@yourdomain.com)
- `AWS_REGION` - region where SES/Secrets Manager are configured

IAM permissions required for the Lambda execution role:
- `secretsmanager:GetSecretValue` for the DB secret ARN
- `ses:SendEmail` (or broader SES send permissions)
- Permissions to run in VPC if RDS is in private subnets (AWSLambdaVPCAccessExecutionRole)

Notes:
- This example uses direct DB queries to your Postgres RDS. If your RDS instance is in a private subnet, configure the Lambda to run in the same VPC/subnets and assign a security group that allows access to the RDS security group on port 5432.
- Consider using Cognito for user management if you prefer a managed auth solution that handles verification, tokens, and MFA.

Local testing (quick):
- You can run this function locally with a local Postgres container and set the environment variables accordingly.

```bash
# Example local Postgres with docker
docker run --name kc-postgres -e POSTGRES_PASSWORD=pass -e POSTGRES_USER=admin -e POSTGRES_DB=kash_contact -p 5432:5432 -d postgres:15
# create schema
psql "postgresql://admin:pass@localhost:5432/kash_contact" -f database/schema.sql
```

Deployment:
- Add this function to Amplify Gen2 or CDK stack and expose it behind an HTTP API (API Gateway) route. Set environment variables and attach the required IAM policy for Secrets Manager and SES.

