import json


def lambda_handler(event, context):
    # Parse the incoming event
    request_body = event['body']
    
    # Perform some processing
    response_body = {
        "message": "Hello, " + request_body.get("name", "World") + "!"
    }
    
    # Return a response
    response = {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps(response_body)
    }
    
    return response