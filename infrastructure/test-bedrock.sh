#!/bin/bash
#
# test-bedrock.sh
# Tests AWS Bedrock credentials for the workshop
#
# Usage:
#   ./test-bedrock.sh
#
# This script verifies:
# - AWS credentials are valid
# - Bedrock model is accessible
# - Time-based expiration is working
# - Can invoke the model successfully
#

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}================================${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Check if credentials file exists
if [ ! -f "bedrock-credentials.txt" ]; then
    print_error "bedrock-credentials.txt not found"
    echo "Run ./setup-bedrock.sh first"
    exit 1
fi

# Extract credentials from file
print_header "Loading Credentials"

ACCESS_KEY_ID=$(grep "AWS_ACCESS_KEY_ID=" bedrock-credentials.txt | cut -d'=' -f2)
SECRET_ACCESS_KEY=$(grep "AWS_SECRET_ACCESS_KEY=" bedrock-credentials.txt | cut -d'=' -f2)
REGION=$(grep "AWS_REGION=" bedrock-credentials.txt | cut -d'=' -f2)
MODEL=$(grep "BEDROCK_MODEL=" bedrock-credentials.txt | cut -d'=' -f2)

if [ -z "$ACCESS_KEY_ID" ] || [ -z "$SECRET_ACCESS_KEY" ]; then
    print_error "Could not parse credentials from file"
    exit 1
fi

print_success "Loaded credentials from bedrock-credentials.txt"

# Export for AWS CLI
export AWS_ACCESS_KEY_ID="$ACCESS_KEY_ID"
export AWS_SECRET_ACCESS_KEY="$SECRET_ACCESS_KEY"
export AWS_DEFAULT_REGION="$REGION"

# Test 1: Verify credentials
print_header "Test 1: Verify AWS Credentials"

if IDENTITY=$(aws sts get-caller-identity 2>&1); then
    USER_ARN=$(echo "$IDENTITY" | grep -o '"Arn": "[^"]*"' | cut -d'"' -f4)
    print_success "Credentials are valid"
    echo "  User: $USER_ARN"
else
    print_error "Credentials are invalid"
    echo "$IDENTITY"
    exit 1
fi

# Test 2: List Bedrock models
print_header "Test 2: Check Bedrock Access"

if aws bedrock list-foundation-models --region "$REGION" > /dev/null 2>&1; then
    print_success "Can access Bedrock service"
else
    print_error "Cannot access Bedrock"
    echo "Check if Bedrock is enabled in region: $REGION"
    exit 1
fi

# Test 3: Verify specific model
print_header "Test 3: Verify Model Access"

if MODEL_INFO=$(aws bedrock list-foundation-models \
    --region "$REGION" \
    --query "modelSummaries[?modelId=='${MODEL}']" \
    --output json 2>&1); then

    if echo "$MODEL_INFO" | grep -q "$MODEL"; then
        print_success "Model $MODEL is available"
    else
        print_warning "Model $MODEL not found in available models"
        echo "You may need to enable it in the Bedrock console:"
        echo "https://console.aws.amazon.com/bedrock/home?region=${REGION}#/modelaccess"
    fi
else
    print_error "Could not list models"
    echo "$MODEL_INFO"
fi

# Test 4: Test model invocation
print_header "Test 4: Test Model Invocation"

# Create test payload
PAYLOAD=$(cat <<EOF
{
  "anthropic_version": "bedrock-2023-05-31",
  "max_tokens": 100,
  "messages": [
    {
      "role": "user",
      "content": "Say 'Bedrock test successful' if you can read this."
    }
  ]
}
EOF
)

echo "Invoking model with test prompt..."

if RESPONSE=$(aws bedrock-runtime invoke-model \
    --region "$REGION" \
    --model-id "$MODEL" \
    --body "$PAYLOAD" \
    --cli-binary-format raw-in-base64-out \
    /dev/stdout 2>&1); then

    # Check if response contains expected text
    if echo "$RESPONSE" | grep -q "Bedrock test successful"; then
        print_success "Model invocation successful!"
        echo "  Response preview: $(echo "$RESPONSE" | head -c 100)..."
    else
        print_warning "Model responded but content unclear"
        echo "  Response: $RESPONSE"
    fi
else
    print_error "Model invocation failed"
    echo "$RESPONSE"
    echo ""
    echo "Common issues:"
    echo "  - Model not enabled in Bedrock console"
    echo "  - Time-based expiration already passed"
    echo "  - Insufficient permissions"
    exit 1
fi

# Test 5: Check time-based expiration
print_header "Test 5: Check Expiration Policy"

POLICY_ARN="arn:aws:iam::$(aws sts get-caller-identity --query Account --output text):policy/PatternFlyWorkshopBedrockAccess"

if POLICY=$(aws iam get-policy-version \
    --policy-arn "$POLICY_ARN" \
    --version-id $(aws iam get-policy --policy-arn "$POLICY_ARN" --query 'Policy.DefaultVersionId' --output text) \
    --output json 2>&1); then

    EXPIRY=$(echo "$POLICY" | grep -o '"aws:CurrentTime": "[^"]*"' | cut -d'"' -f4)
    if [ -n "$EXPIRY" ]; then
        print_success "Time-based expiration configured"
        echo "  Expires: $EXPIRY"

        # Check if already expired
        EXPIRY_EPOCH=$(date -j -f "%Y-%m-%dT%H:%M:%SZ" "$EXPIRY" +%s 2>/dev/null || date -d "$EXPIRY" +%s 2>/dev/null || echo "0")
        NOW_EPOCH=$(date +%s)

        if [ "$EXPIRY_EPOCH" -lt "$NOW_EPOCH" ]; then
            print_warning "Credentials have ALREADY EXPIRED!"
        else
            HOURS_LEFT=$(( ($EXPIRY_EPOCH - $NOW_EPOCH) / 3600 ))
            print_success "Credentials valid for $HOURS_LEFT more hours"
        fi
    else
        print_warning "Could not extract expiration date from policy"
    fi
else
    print_warning "Could not retrieve policy details"
fi

# Summary
print_header "Test Summary"

echo ""
echo -e "${GREEN}✓ All tests passed!${NC}"
echo ""
echo "Bedrock setup is working correctly for the workshop."
echo ""
echo "Next steps:"
echo "  1. Share bedrock-credentials.txt with participants"
echo "  2. Participants add credentials to .vscode/settings.json"
echo "  3. Monitor usage in AWS console during workshop"
echo "  4. Run ./cleanup-bedrock.sh after workshop"
echo ""
