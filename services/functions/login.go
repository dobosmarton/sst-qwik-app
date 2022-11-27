package main

import (
	"fmt"
	"strings"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/magiclabs/magic-admin-go/token"
)

const authBearer = "Bearer"

func Handler(request events.APIGatewayV2HTTPRequest) (events.APIGatewayProxyResponse, error) {

	if !strings.HasPrefix(request.Headers["authorization"], authBearer) {
		return events.APIGatewayProxyResponse{
			Body:       "Bearer token is required",
			StatusCode: 500,
		}, nil
	}

	did := request.Headers["authorization"][len(authBearer)+1:]

	tk, err := token.NewToken(did)

	if err != nil {
		return events.APIGatewayProxyResponse{
			Body:       fmt.Sprintf("Malformed DID token error: %s", err.Error()),
			StatusCode: 500,
		}, nil
	}

	if err := tk.Validate(); err != nil {
		return events.APIGatewayProxyResponse{
			Body:       fmt.Sprintf("Malformed DID token error: %s", err.Error()),
			StatusCode: 500,
		}, nil
	}

	return events.APIGatewayProxyResponse{
		Body:       string(tk.GetIssuer()),
		StatusCode: 200,
	}, nil
}

func main() {
	lambda.Start(Handler)
}
